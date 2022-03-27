import React, { Component }  from 'react';
import { AdminLayout } from '../component';
import { Modal } from 'react-bootstrap';
import { getCourts, getBookings } from '../services/admin.services/bookings.service'
import "../assets/css/pages/adminBookingsPage.css"
import moment from 'moment';

class AdminBookingsPage extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showConfirmationModal = this.showConfirmationModal.bind(this);
        this.hideConfirmationModal = this.hideConfirmationModal.bind(this);
        this.state =  {
            loading: true,
            showConfirmationModal: false,
            fromDay: null,
            toDay: null,
            onlyActiveBookings: "false",
            courts: [],
            bookings: [],
            selectedOnlyBookingId: 0,
            selectedBookIndex: null,
            selectedCourtName: "Todas",
            paidBookings: null
        }
    }

    async handleSubmit (e) {
        e.preventDefault();
        // console.log(this.state);
        await getBookings(this.props, this.state.fromDay, this.state.toDay, this.state.selectedCourtName, this.state.onlyActiveBookings, this.state.paidBookings);
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


    async componentDidMount() {
        await this.setState({
            loading: false,
            courts: await getCourts()
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

        var courts = []
        for (var i = 0; i < this.state.courts.length; i++) {
            courts.push(
                <option key={i} value={this.state.courts[i].name}>{this.state.courts[i].name}</option>
            );
        }

        var tableBody = []
        // for (var i = 0; i < this.state.bookings.length; i++) {

        // }

        return (
            <AdminLayout isHeader={true} username={this.state.username}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xs-12 col-sm-12 col-md-10 col-lg-9">
                            <div className="card my-5">
                                <form className="card-body cardbody-color" onSubmit={this.handleSubmit}>
                                    <div className='row justify-content-center'>
                                        <div className='col-md-6 mb-1'>
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
                                        <div className='col-md-6 mb-1'>
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
                                    </div>

                                    <div className="row justify-content-center">
                                        <div className='col-md-6 mb-1'>
                                            <select className="custom-select form-select" id="courts" onChange={(e) => this.setState({selectedCourtName: e.target.value})}>
                                                <option key={-1} value={"Todas"}>Todas las pistas</option>
                                                {courts}
                                            </select>
                                        </div>                                        
                                        <div className='col-md-6 mb-1'>
                                            <select className="custom-select form-select" id="activeBookings" onChange={(e) => this.setState({onlyActiveBookings: e.target.value})}>
                                                <option value={false}>Todas las reservas</option>
                                                <option value={true}>Reservas activas (no se han jugado todavía)</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
                                    <div className='col-md-6 mb-1'>
                                            <select className="custom-select form-select" id="paidBookings" onChange={(e) => this.setState({paidBookings: e.target.value})}>
                                                <option>Reservas pagadas y sin pagar</option>
                                                <option value={true}>Reservas pagadas</option>                              
                                                <option value={false}>Reservas sin pagar</option>                      
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
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
                </div>
                {/* {this.state.selectedBookIndex !== null && (
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
                )} */}
            </AdminLayout>
        );
    }
}

export default AdminBookingsPage;