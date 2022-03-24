import React, { Component }  from 'react';
import { Layout } from '../component';
import { Modal } from 'react-bootstrap';
import { getUsername } from '../services/user.service'
import { getBookings, cancelBooking } from '../services/booking.service'
import "../assets/css/pages/myBookings.css"
import moment from 'moment';

class MyBookings extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showConfirmationModal = this.showConfirmationModal.bind(this);
        this.hideConfirmationModal = this.hideConfirmationModal.bind(this);
        this.cancelReservation = this.cancelReservation.bind(this);
        this.state =  {
            loading: true,
            showConfirmationModal: false,
            username: null,
            fromDay: null,
            toDay: null,
            onlyActiveBookings: "false",
            selectedOnlyBookingId: 0,
            bookings: [],
            selectedBookIndex: null
        }
    }

    async handleSubmit (e) {
        e.preventDefault();
        const selectedActiveBooking = e.target.getElementsByTagName("select").activeBooking;
        this.setState({ 
            loading: true,
            selectedOnlyBookingId: selectedActiveBooking.selectedIndex
        });
        const bookings = await getBookings(this.props, this.state.fromDay, this.state.toDay, this.state.onlyActiveBookings);
        await this.setState({
            bookings: bookings,
            loading: false
        });
        document.getElementById("activeBooking").selectedIndex = this.state.selectedOnlyBookingId;

    }

    showConfirmationModal(e) {
        this.setState({
            showConfirmationModal: true,
            selectedBookIndex: e.target.value
        });
    }

    hideConfirmationModal() {
        this.setState({
            showConfirmationModal: false,
            selectedBookIndex: null
        });
    }

    async cancelReservation() {
        this.setState({
            loading: true
        });
        await cancelBooking(this.props, this.state.bookings[this.state.selectedBookIndex].id);
        this.hideConfirmationModal();
        const bookings = await getBookings(this.props, this.state.fromDay, this.state.toDay, this.state.onlyActiveBookings);
        await this.setState({
            bookings: bookings,
            loading: false
        });
        document.getElementById("activeBooking").selectedIndex = this.state.selectedOnlyBookingId;
    }

    async componentDidMount() {
        this.setState({
            username: getUsername(),
            loading: false
        });
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="center">
                    <div className="spinner-border" style={{width: "5rem", height: "5rem"}} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            );
        }

        var tableBody = []
        for (var i = 0; i < this.state.bookings.length; i++) {
            const numberOfHoursToCancelCourt= this.state.bookings[i]["court.numberOfHoursToCancelCourt"];
            const reservationDate = moment(this.state.bookings[i].day + " " + this.state.bookings[i].startTime, "YYYY-MM-DD HH:mm:ss");
            var startTime = moment(this.state.bookings[i].startTime, "HH:mm:ss").format("HH:mm");
            var finishTime = moment(this.state.bookings[i].finishTime, "HH:mm:ss").format("HH:mm");
            tableBody.push(
                <tr key={i}>
                    <th scope="row">{this.state.bookings[i].day}</th>
                    <td>{startTime} - {finishTime}</td>
                    {this.state.bookings[i].withLight ? (
                        <td>Si</td>
                    ) : (
                        <td>No</td>
                    )}
                    <td>{this.state.bookings[i]["court.name"]}</td>
                    <td>{this.state.bookings[i].amountToPay} €</td>
                    {moment().add(numberOfHoursToCancelCourt, "hours") < reservationDate ? (
                        <td><button value={i} className="btn btn-danger" onClick={(e) => this.showConfirmationModal(e)}>Cancelar</button></td>
                    ) : (
                        <td></td>                        
                    )}
                </tr>
            );
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
                                            <input
                                                className="form-control"
                                                type="date"
                                                name="bookingDay" 
                                                placeholder="Desde"
                                                defaultValue={this.state.fromDay}
                                                onChange={(e) => this.setState({fromDay: e.target.value})}
                                                required
                                            />
                                        </div>
                                        <div className='col-md-4 mb-1'>
                                            <input
                                                className="form-control"
                                                type="date"
                                                name="bookingDay" 
                                                placeholder="Hasta"
                                                defaultValue={this.state.toDay}
                                                onChange={(e) => this.setState({toDay: e.target.value})}
                                                required
                                            />
                                        </div>
                                        <div className='col-md-4 mb-1'>
                                            <select className="custom-select form-select" id="activeBooking" onChange={(e) => this.setState({onlyActiveBookings: e.target.value})}>
                                                <option value={false}>Todas</option>
                                                <option value={true}>Activas</option>
                                            </select>
                                        </div>
                                        <div className='col-md-3 mt-2 d-flex justify-content-center'>
                                            <button type="submit" className="btn btn-color">Buscar</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container table-responsive">
                    <table className="table table-striped">
                        <thead className="table-dark">
                            <tr>
                            <th scope="col">Fecha</th>
                            <th scope="col">Hora</th>
                            <th scope="col">Con luz</th>
                            <th scope="col">Pista</th>
                            <th scope="col">Importe</th>
                            <th scope="col">Cancelar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableBody}
                        </tbody>
                    </table>
                    {tableBody.length > 0 || (
                        <h1>No hay reservas en este periodo de tiempo</h1>
                        )}
                    {this.state.selectedBookIndex !== null && (
                        <Modal show={this.state.showConfirmationModal} onHide={this.hideConfirmationModal}>
                            <Modal.Header closeButton>
                            <Modal.Title>Confirmación de cancelación</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ul>
                                    <li>Fecha: {this.state.bookings[this.state.selectedBookIndex].day}</li>
                                    <li>De {this.state.bookings[this.state.selectedBookIndex].startTime} a {this.state.bookings[this.state.selectedBookIndex].finishTime}</li>
                                    <li>Pista: {this.state.bookings[this.state.selectedBookIndex]["court.name"]}</li>
                                    {this.state.bookings[this.state.selectedBookIndex].withLight ? (
                                        <li>Con luz</li>
                                    ) : (
                                        <li>Sin luz

                                        </li>
                                    )}
                                </ul>
                            </Modal.Body>
                            <Modal.Footer>
                            <button className="btn btn-light" onClick={this.hideConfirmationModal}>
                                Cancelar
                            </button>
                            <button className="btn btn-danger" onClick={this.cancelReservation}>
                                Cancelar reserva
                            </button>
                            </Modal.Footer>
                        </Modal>
                    )}
                </div>
            </Layout>
        );
    }
}

export default MyBookings;