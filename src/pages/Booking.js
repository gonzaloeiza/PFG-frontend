import React, { Component }  from 'react';
import { Layout } from '../component';
import { Form } from 'react-bootstrap';
import { getUsername } from '../services/user.service'
import { getCourts, getDisponibility } from '../services/booking.service'
import { message } from 'antd';

class Booking extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.book = this.book.bind(this);
        this.state =  {
            loading: true,
            username: null,
            courts: [],
            bookingDay: new Date().toJSON().slice(0,10),
            selectedCourt: null,
            selectedCourtId: -1,
            availableTimes: []
        }
    }

    async handleSubmit (e) {
        e.preventDefault();
        const selectedCourt = e.target.getElementsByTagName("select").court;
        if (selectedCourt.value === "Pistas") {
            return message.error("Debes seleccionar una pista");
        }
        await this.setState({
            selectedCourt: selectedCourt.value,
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

    async book (e, withLight = true) {
        console.log(this.state.courts[this.state.selectedCourtId].name + " " + this.state.availableTimes[e.target.value] + " " + withLight);
    }

    async componentDidMount() {
        const courts = await getCourts(this.props);
        this.setState({
            username: getUsername(),
            courts: courts,
            loading: false
        });
    }

    render() {
        if (this.state.loading) {
            return (
                <h1>Loading</h1>
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
                var date = new Date(this.state.availableTimes[i]);
                date.setTime(date.getTime() + new Date().getTimezoneOffset()*60*1000);
                var hours = date.getHours();
                var minutes = date.getMinutes();
                hours = ("0" + hours).slice(-2); //adds a 0 if hour < 10
                minutes = ("0" + minutes).slice(-2); //adds a 0 if minutes < 10
                availableTimes.push(
                    <div key={i} className="mb-4 col-xs-12 col-sm-6 col-md-6 col-lg-4">
                        <div className="card bg-light border-dark">
                            <div className="card-header bg-dark">
                                <div className="card-text d-flex row">
                                    <h4 className="col fw-bold text-white">{`${hours}:${minutes}`}</h4>
                                    <h4 className="col text-end fw-bold text-white">{this.state.courts[this.state.selectedCourtId].bookReservationTime}'</h4>
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
                                        <button value={i} className="btn btn-success" onClick={(e) => this.book(e)}>reservar con luz</button>
                                    </div>
                                    <div className="col-xs-12 col-sm-6 my-2 text-center">
                                        <button value={i} className="btn btn-success" onClick={(e) => this.book(e, false)}>reservar sin luz</button>
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
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xs-12 col-sm-12 col-md-10 col-lg-9">
                            <div className="card my-5">
                                <form className="card-body cardbody-color" onSubmit={this.handleSubmit}>
                                    <div className='row justify-content-center'>
                                        <div className='col-md-4 mb-1'>
                                            <Form.Control
                                                type="date"
                                                name="bookingDay" 
                                                placeholder="Día de reserva"
                                                defaultValue={this.state.bookingDay}
                                                onChange={(e) => this.setState({bookingDay: e.target.value})}
                                            />
                                        </div>
                                        <div className='col-md-4 mb-1'>
                                            <select className="custom-select form-select" id="court" onChange={(e) => this.setState({selectedCourt: e})}>
                                                <option hidden>Pistas</option>
                                                {courtsOption}
                                            </select>
                                        </div>
                                        <div className='col-md-3 mb-1 d-flex justify-content-center'>
                                            <button type="submit" className="btn btn-color">Buscar</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            {
                this.state.availableTimes.length > 0 ? (
                    <div className="container">
                        <div className="row justify-content-start">
                            {availableTimes}
                        </div>
                    </div>
                ) : (
                    <h1>No se han encontrado resultados</h1>
                )
            }
            </Layout>
        );
    }
}

export default Booking;