import React, { Component }  from 'react';
import { Layout, Loading, BlueCard } from '../components';
import { Modal } from 'react-bootstrap';
import { getUsername } from '../services/user.services';
import { getDisponibility, book } from '../services/booking.services';
import { getCourtsData } from '../services/courts.services';
import { message } from 'antd';
import moment from 'moment';
import { knownSensors } from '../config';

class Booking extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.book = this.book.bind(this);
        this.showConfirmationModal = this.showConfirmationModal.bind(this);
        this.hideConfirmationModal = this.hideConfirmationModal.bind(this);
        this.showSensorsModal = this.showSensorsModal.bind(this);
        this.hideSensorsModal = this.hideSensorsModal.bind(this);
        this.showInformationModal = this.showInformationModal.bind(this);
        this.hideInformationModal = this.hideInformationModal.bind(this);
        this.redirectToSmartCitizen = this.redirectToSmartCitizen.bind(this);
        this.state =  {
            loading: true,
            showConfirmationModal: false,
            showSensorModal: false,
            showInformationModal: false,
            username: null,
            courts: [],
            availableTimes: [],
            bookingDay: moment().format("YYYY-MM-DD"),
            selectedCourt: null,
            selectedCourtId: -1,
            selectedCourtSensorsIndex: null,
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
            selectedTime: this.state.availableTimes[e.target.value].time,
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

    async showSensorsModal(e) {
        await this.setState({
            showSensorsModal: true,
            selectedCourtSensorsIndex: document.getElementById("court").selectedIndex - 1
        });
    }

    async hideSensorsModal() {
        await this.setState({
            showSensorsModal: false,
        });
    }

    async showInformationModal() {
        await this.setState({
            showInformationModal: true
        });
    }


    async hideInformationModal() {
        await this.setState({
            showInformationModal: false
        });
    }

    async book() {
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
        const courts = await getCourtsData(this.props);
        await this.setState({
            username: getUsername(),
            courts: courts,
            loading: false
        });
    }

    async redirectToSmartCitizen() {
        window.open(this.state.courts[this.state.selectedCourtSensorsIndex].smartCitizenURL, "_blank");
    }

    render() {
        if (this.state.loading) {
            return (
                <Loading />
            );
        }

        if (this.state.selectedCourtSensorsIndex !== null) {
            var lastReadingAt = moment(this.state.courts[this.state.selectedCourtSensorsIndex].last_reading_at);
            
            var modalTimeAgo = `Día ${lastReadingAt.format("YYYY-MM-DD")} a las ${lastReadingAt.format("HH:mm")}`;
            const now = moment();
            if (lastReadingAt.clone().add(1, "hours") >= now) {
                var passedMinutes = now.minutes() - lastReadingAt.minutes(); 
                if ( passedMinutes === 1) {
                    modalTimeAgo = "Hace 1 minuto";
                } else {
                    modalTimeAgo = `Hace ${passedMinutes} minutos`;
                }
            } else if (lastReadingAt.clone().add(1, "days") >= now) {
                modalTimeAgo = `Hoy a las ${lastReadingAt.hour()}:${lastReadingAt.minutes()}`;
            }
        }

        var sensorsTable = [];
        if (this.state.selectedCourtSensorsIndex !== null && this.state.courts[this.state.selectedCourtSensorsIndex].sensors !== null) {
            this.state.courts[this.state.selectedCourtSensorsIndex].sensors.forEach((sensor, index) => {
                const sensorName = sensor.name.split("-")[1].trim();
                sensorsTable.push(
                    <div key={index} className="col-xs-12 col-sm-12 col-md-6 col-lg-3 mb-3">
                        <div className="card h-100 text-center bg-light mx-2" type="button" data-bs-toggle="tooltip" data-bs-placement="top" title={sensor.description}>
                            <p className="fs-6 fw-bold">{sensorName}</p>
                            <div className="ms-3">
                                {knownSensors.get(sensorName)}
                            </div>
                            <p className="fs-6">{sensor.value} {sensor.unit}</p>
                        </div>
                    </div>
                );
            });
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
                var bookingCardBorder = "border-dark";
                var bookingCardBackground = "bg-dark"
                if (this.state.availableTimes[i].avg !== null) {
                    if (this.state.availableTimes[i].avg < 0.25) {
                        bookingCardBorder = "border-success";
                        bookingCardBackground = "bg-success";
                    } else if (this.state.availableTimes[i].avg < 0.5) {
                        bookingCardBorder = "border-warning";
                        bookingCardBackground = "bg-warning";
                    } else {
                        bookingCardBorder = "border-danger";
                        bookingCardBackground = "bg-danger";
                    }
                }

                const startTime = moment(this.state.availableTimes[i].time, "HH:mm");
                const finishTime = startTime.clone().add(this.state.courts[this.state.selectedCourtId].bookReservationTime, "minutes");
                availableTimes.push(
                    <div key={i} className="mb-4 col-xs-12 col-sm-6 col-md-6 col-lg-4">
                        <div className={"card bg-light " + bookingCardBorder}>
                            <div className={"card-header text-center " + bookingCardBackground}>
                                <div className={"card-text row " + bookingCardBackground}>
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
                                <select className="custom-select form-select" id="court" onChange={(e) => this.setState({selectedCourt: e.target.value, selectedCourtSensorsIndex: document.getElementById("court").selectedIndex - 1})}>
                                    <option hidden>Pistas</option>
                                    {courtsOption}
                                </select>
                            </div>
                        </div>
                        <div className='row justify-content-center'>
                            <div className='col-md-3 mt-2 d-flex justify-content-around'>
                                <button type="submit" className="btn btn-primary">Buscar</button>
                            </div>
                            <div className='text-end'>
                                {this.state.selectedCourt !== null && (
                                    <>
                                    {this.state.courts[this.state.selectedCourtSensorsIndex].last_reading_at !== null && (
                                        <button type="button" className="mx-2 mt-2 btn btn-secondary bi bi-cloud-sun-fill" onClick={this.showSensorsModal}></button>
                                    )}
                                    </>
                                )}
                                <button type="button" className="mx-2 mt-2 btn btn-secondary bi bi-info-lg" onClick={this.showInformationModal}></button>
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
                {this.state.selectedCourtSensorsIndex !== null && (
                    <Modal size="xl" centered show={this.state.showSensorsModal} onHide={this.hideSensorsModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Sensores del dispositivo SmartCitizen: {this.state.courts[this.state.selectedCourtSensorsIndex].name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row justify-content-start">
                                {sensorsTable}
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <p className="col"><strong>Última recopilación de datos:&nbsp;</strong>{modalTimeAgo}</p>
                            <button className="btn btn-light" onClick={this.hideSensorsModal}>Cancelar</button>
                            <button className="btn btn-primary" onClick={this.redirectToSmartCitizen}>Ir a Smartcitizen.me</button>
                        </Modal.Footer>
                    </Modal>
                )}
                
                <Modal show={this.state.showInformationModal} onHide={this.hideInformationModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Informacíon sobre el color de las reservas</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Basandonos en los datos de temperatura y humedad de los útilmos 5 días se hace una estimación de las mejores horas para jugar que se clasifican de la siguiente manera: </p>
                        <ul>
                            <li className='text-success'>Verde: Las condiciones para jugar en la pista son perfectas</li>
                            <li className='text-warning'>Naranja: Las condiciones para jugar en la pista son casi perfectas</li>
                            <li className='text-danger'>Rojo: Las condiciones para jugar en la pista no son las adecuadas</li>
                            <li className='text-dark'>Negro: No existe información sobre las condiciones para jugar en la pista</li>
                        </ul>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-light" onClick={this.hideInformationModal}>Ocultar</button>
                    </Modal.Footer>
                </Modal>
                
            </Layout>
        );
    }
}

export default Booking;