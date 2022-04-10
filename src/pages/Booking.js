import React, { Component }  from 'react';
import { Layout, Loading, BlueCard } from '../component';
import { Modal } from 'react-bootstrap';
import { getUsername } from '../services/user.service'
import { getCourts, getDisponibility, book } from '../services/booking.service'
import { message } from 'antd';
import moment from 'moment';

class Booking extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.book = this.book.bind(this);
        this.showConfirmationModal = this.showConfirmationModal.bind(this);
        this.hideConfirmationModal = this.hideConfirmationModal.bind(this);
        this.state =  {
            loading: true,
            showConfirmationModal: false,
            username: null,
            courts: [],
            availableTimes: [],
            bookingDay: moment().format("YYYY-MM-DD"),
            selectedCourt: null,
            selectedCourtId: -1,
            selectedTime: null,
            selectedCourtWithLight: false,
        }
    }

    async handleSubmit (e) {
        e.preventDefault();
        const selectedCourt = e.target.getElementsByTagName("select").court;
        if (selectedCourt.value === "Pistas") {
            return message.error("Debes seleccionar una pista");
        }
        await this.setState({
            selectedCourtId: selectedCourt.selectedIndex - 1,
            loading: true
        });
        const availableTimes = await getDisponibility(this.props, this.state.bookingDay, this.state.selectedCourt);
        await this.setState({
            availableTimes: availableTimes,
            loading: false
        });
        document.getElementById("court").selectedIndex = selectedCourt.selectedIndex;
    }

    async showConfirmationModal(e, withLight = true) {
        await this.setState({
            selectedCourtWithLight: withLight,
            selectedTime: this.state.availableTimes[e.target.value],
            showConfirmationModal: true
        });
    }

    async hideConfirmationModal() {
        await this.setState({
            selectedCourtWithLight: null,
            selectedTime: null,
            showConfirmationModal: false
        });
    }

    async book () {
        const date = moment(this.state.bookingDay + " " + this.state.selectedTime, "YYYY-MM-DD HH:mm");
        await book(this.props, this.state.courts[this.state.selectedCourtId].name, date.format("YYYY-MM-DD HH:mm"), this.state.selectedCourtWithLight);
        this.hideConfirmationModal();
        const availableTimes = await getDisponibility(this.props, this.state.bookingDay, this.state.selectedCourt);
        await this.setState({
            availableTimes: availableTimes,
            loading: false
        });
        document.getElementById("court").selectedIndex = this.state.selectedCourtId + 1;
    }

    async componentDidMount() {
        const courts = await getCourts(this.props);
        await this.setState({
            username: getUsername(),
            courts: courts,
            loading: false
        });
    }

    render() {
        if (this.state.loading) {
            return (
                <Loading />
            );
        }
        
        var courtsOption = [];
        var i = 0;
        for (i = 0; i < this.state.courts.length; i++) {
            courtsOption.push(
                <option value={this.state.courts[i].name} key={i}>{this.state.courts[i].name}</option>
            );
        }

        var availableTimes = [];
        if (this.state.availableTimes.length > 0) {
            for (i = 0; i < this.state.availableTimes.length; i++) {
                const startTime = moment(this.state.availableTimes[i], "HH:mm");
                const finishTime = startTime.clone().add(this.state.courts[this.state.selectedCourtId].bookReservationTime, "minutes");
                availableTimes.push(
                    <div key={i} className="mb-4 col-xs-12 col-sm-6 col-md-6 col-lg-4">
                        <div className="card bg-light border-dark">
                            <div className="card-header bg-dark text-center">
                                <div className="card-text row">
                                    <h4 className="col fw-bold text-white">{startTime.format("HH:mm")}-{finishTime.format("HH:mm")}</h4>
                               </div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <p className="col fw-bold">Precio con luz</p>
                                    <p className="col text-end fw-bold">{this.state.courts[this.state.selectedCourtId].priceWithLight}€</p>
                                </div>
                                <div className="row">
                                    <p className="col fw-bold">Precio sin luz</p>
                                    <p className="col text-end fw-bold">{this.state.courts[this.state.selectedCourtId].priceWithoutLight}€</p>
                                </div>
                                <div className="row">
                                    <div className="col-xs-12 col-sm-6 my-2 text-center">
                                        <button value={i} className="btn btn-success" onClick={(e) => this.showConfirmationModal(e, true)}>reservar con luz</button>
                                    </div>
                                    <div className="col-xs-12 col-sm-6 my-2 text-center">
                                        <button value={i} className="btn btn-success" onClick={(e) => this.showConfirmationModal(e, false)}>reservar sin luz</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
        }

        return (
            <Layout isHeader={true} username={this.state.username}>
                <BlueCard>
                    <form onSubmit={this.handleSubmit}>
                        <div className='row justify-content-center'>
                            <div className='col-md-4 mb-1'>
                                <input
                                    className="form-control"
                                    type="date"
                                    name="bookingDay" 
                                    placeholder="Día de reserva"
                                    defaultValue={this.state.bookingDay}
                                    onChange={(e) => this.setState({bookingDay: e.target.value})}
                                />
                            </div>
                            <div className='col-md-4 mb-1'>
                                <select className="custom-select form-select" id="court" onChange={(e) => this.setState({selectedCourt: e.target.value})}>
                                    <option hidden>Pistas</option>
                                    {courtsOption}
                                </select>
                            </div>
                        </div>
                        <div className='row justify-content-center'>
                            <div className='col-md-3 mt-2 d-flex justify-content-around'>
                                <button type="submit" className="btn btn-primary">Buscar</button>
                            </div>
                        </div>   
                    </form>
                </BlueCard>
                {
                    this.state.availableTimes.length > 0 ? (
                        <div className="container">
                            <div className="row justify-content-start">
                                {availableTimes}
                            </div>
                            <Modal show={this.state.showConfirmationModal} onHide={this.hideConfirmationModal}>
                                <Modal.Header closeButton>
                                <Modal.Title>Confirmación de reserva</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <ul>
                                        <li>{this.state.selectedCourt}</li>
                                        <li>Fecha: {this.state.bookingDay} a las {this.state.selectedTime}</li>
                                        <li>{this.state.courts[this.state.selectedCourtId].bookReservationTime} minutos</li>
                                    {this.state.selectedCourtWithLight ? (
                                        <>
                                            <li>Con luz</li>
                                            <li>Precio final: {this.state.courts[this.state.selectedCourtId].priceWithLight} €</li>
                                        </>
                                    ) : (
                                        <>
                                            <li>Sin luz</li>
                                            <li>Precio final: {this.state.courts[this.state.selectedCourtId].priceWithoutLight} €</li>
                                        </>
                                    )}                          
                                    </ul>
                                </Modal.Body>
                                <Modal.Footer>
                                <button className="btn btn-light" onClick={this.hideConfirmationModal}>
                                    Cancelar
                                </button>
                                <button className="btn btn-success" onClick={this.book}>
                                    Reservar
                                </button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    ) : (
                        <div className="container">
                            {this.state.selectedCourtId === -1 ? (
                                <h1>Debes seleccionar una pista</h1>                           
                            ) : (
                                <h1>No se han encontrado resultados</h1>
                            )}
                        </div>
                    )
                }
            </Layout>
        );
    }
}

export default Booking;