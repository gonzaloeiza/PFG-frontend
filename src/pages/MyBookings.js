import React, { Component }  from 'react';
import { BlueCard, Layout, Loading } from '../component';
import { Modal } from 'react-bootstrap';
import { getUsername } from '../services/user.service'
import { getBookings, cancelBooking } from '../services/booking.service'
import moment from 'moment';
import '../assets/css/main.css'

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
        await this.setState({ 
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

    async showConfirmationModal(e) {
        await this.setState({
            showConfirmationModal: true,
            selectedBookIndex: e.target.value
        });
    }

    async hideConfirmationModal() {
        await this.setState({
            showConfirmationModal: false,
            selectedBookIndex: null
        });
    }

    async cancelReservation() {
        await this.setState({
            loading: true
        });
        await cancelBooking(this.props, this.state.bookings[this.state.selectedBookIndex].id);
        this.hideConfirmationModal();
        const bookings = await getBookings(this.props, this.state.fromDay, this.state.toDay, this.state.onlyActiveBookings);
        await this.setState({
            bookings: bookings,
            loading: false,
        });
        document.getElementById("activeBooking").selectedIndex = this.state.selectedOnlyBookingId;
    }

    async componentDidMount() {
        await this.setState({
            username: getUsername(),
            loading: false
        });
    }

    render() {
        if (this.state.loading) {
            return (
                <Loading />
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
                    {this.state.bookings[i].paid ? (
                            <td>Pagado</td>                    
                    ) : (
                        <td>Sin pagar</td>                    
                    )}
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
                <BlueCard>
                    <form onSubmit={this.handleSubmit}>
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
                                <button type="submit" className="btn btn-primary">Buscar</button>
                            </div>
                        </div>
                    </form>
                </BlueCard>
                <div className="container table-responsive">
                    <table className="table table-striped">
                        <thead className="table-dark">
                            <tr>
                            <th scope="col">Fecha</th>
                            <th scope="col">Hora</th>
                            <th scope="col">Con luz</th>
                            <th scope="col">Pista</th>
                            <th scope="col">Importe</th>
                            <th scope="col">Pagado</th>
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
                </div>
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
            </Layout>
        );
    }
}

export default MyBookings;