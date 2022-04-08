import React, { Component }  from 'react';
import { AdminLayout, BlueCard, Loading } from '../component';
import { Modal } from 'react-bootstrap';
import { getCourts, getBookings, handlePaid, cancelBooking } from '../services/admin.services/bookings.service'
import moment from 'moment';

class AdminBookingsPage extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePaid = this.handlePaid.bind(this);
        this.cancelBooking = this.cancelBooking.bind(this);
        this.showConfirmationModal = this.showConfirmationModal.bind(this);
        this.hideConfirmationModal = this.hideConfirmationModal.bind(this);
        this.state =  {
            loading: true,
            showConfirmationModal: false,
            fromDay: null,
            toDay: null,
            courts: [],
            bookings: [],
            selectedCourtName: "Todas",
            onlyActiveBookings: "false",
            paidBookings: null,
            selectedCourtIndex: 0,
            selectedOnlyActiveIndex: 0,
            selectedPaidBookingsIndex: 0,
            selectedBookingIndex: null,
        }
    }

    async handleSubmit (e) {
        e.preventDefault();
        const selectedCourtIndex = e.target.getElementsByTagName("select").courts;
        const selectedOnlyActiveIndex = e.target.getElementsByTagName("select").activeBookings;
        const selectedPaidBookingsIndex = e.target.getElementsByTagName("select").paidBookings;

        await this.setState({
            loading: true,
            selectedCourtIndex: selectedCourtIndex.selectedIndex,
            selectedOnlyActiveIndex: selectedOnlyActiveIndex.selectedIndex,
            selectedPaidBookingsIndex: selectedPaidBookingsIndex.selectedIndex,
        });

        const bookings = await getBookings(this.props, this.state.fromDay, this.state.toDay, this.state.selectedCourtName, this.state.onlyActiveBookings, this.state.paidBookings);
        
        await this.setState({
            loading: false,
            bookings: bookings
        });

        document.getElementById("courts").selectedIndex = this.state.selectedCourtIndex;
        document.getElementById("activeBookings").selectedIndex = this.state.selectedOnlyActiveIndex;
        document.getElementById("paidBookings").selectedIndex = this.state.selectedPaidBookingsIndex;

    }

    async componentDidMount() {
        await this.setState({
            loading: false,
            courts: await getCourts()
        });
    }

    async handlePaid(e) {
        const bookingIndex = e.target.value;
        var bookings = [...this.state.bookings];
        bookings[bookingIndex].paid = !bookings[bookingIndex].paid;
        await this.setState({
            loading: true,
            bookings: bookings
        });

        if (this.state.bookings[bookingIndex].paid) {
            await handlePaid(this.props, this.state.bookings[bookingIndex].id, true);
        } else {
            await handlePaid(this.props, this.state.bookings[bookingIndex].id, false);
        }

        const updatedBookings = await getBookings(this.props, this.state.fromDay, this.state.toDay, this.state.selectedCourtName, this.state.onlyActiveBookings, this.state.paidBookings);
        
        await this.setState({
            loading: false,
            bookings: updatedBookings
        });
       
        document.getElementById("courts").selectedIndex = this.state.selectedCourtIndex;
        document.getElementById("activeBookings").selectedIndex = this.state.selectedOnlyActiveIndex;
        document.getElementById("paidBookings").selectedIndex = this.state.selectedPaidBookingsIndex;
    }

    async cancelBooking(e) {
        const bookingIndex = e.target.value;
        await this.setState({
            loading: true,
        });

        await cancelBooking(this.props, this.state.bookings[bookingIndex].id);
        
        const updatedBookings = await getBookings(this.props, this.state.fromDay, this.state.toDay, this.state.selectedCourtName, this.state.onlyActiveBookings, this.state.paidBookings);
        
        await this.setState({
            loading: false,
            bookings: updatedBookings
        });
       
        document.getElementById("courts").selectedIndex = this.state.selectedCourtIndex;
        document.getElementById("activeBookings").selectedIndex = this.state.selectedOnlyActiveIndex;
        document.getElementById("paidBookings").selectedIndex = this.state.selectedPaidBookingsIndex;
    }

    async showConfirmationModal(e) {
        await this.setState({
            selectedBookingIndex: e.target.value,
            showConfirmationModal: true,
        });
    }

    async hideConfirmationModal() {
        await this.setState({
            selectedBookingIndex: null,
            showConfirmationModal: false
        });
    }


    render() {
        if (this.state.loading) {
            return (
                <Loading />
            );
        }

        var courts = []
        for (var i = 0; i < this.state.courts.length; i++) {
            courts.push(
                <option key={i} value={this.state.courts[i].name}>{this.state.courts[i].name}</option>
            );
        }

        var tableBody = []
        for (i = 0; i < this.state.bookings.length; i++) {
            const startTime = moment(this.state.bookings[i].startTime, "HH:mm:ss").format("HH:mm");
            const finishTime = moment(this.state.bookings[i].finishTime, "HH:mm:ss").format("HH:mm");

            
            tableBody.push(
                <tr key={i}>
                    <th scope="row">{this.state.bookings[i].day}</th>
                    <td>{startTime}-{finishTime}</td>
                    <td>{this.state.bookings[i]["user.name"]} {this.state.bookings[i]["user.firstSurname"]}</td>
                    <td>{this.state.bookings[i].amountToPay} €</td>
                    <td><input className="form-check-input" type="checkbox" value={i} checked={this.state.bookings[i].paid} onChange={this.handlePaid}/></td>
                    <td><button className='btn btn-success' value={i} onClick={this.showConfirmationModal}>Más detalles</button></td>
                    <td><button className='btn btn-danger' value={i} onClick={this.cancelBooking}>Eliminar</button></td>
                </tr>
            );
        }

        return (
            <AdminLayout isHeader={true} username={this.state.username}>
                <BlueCard>
                    <form onSubmit={this.handleSubmit}>
                        <div className='row justify-content-around'>
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
                        <div className="row justify-content-around">
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
                        <div className="row justify-content-around">
                            <div className='col-md-6 mb-1'>
                                <select className="custom-select form-select" id="paidBookings" onChange={(e) => this.setState({paidBookings: e.target.value})}>
                                    <option>Reservas pagadas y sin pagar</option>
                                    <option value={true}>Reservas pagadas</option>                              
                                    <option value={false}>Reservas sin pagar</option>                      
                                </select>
                            </div>
                        </div>
                        <div className="row justify-content-around">
                            <div className='col-md-3 mt-2 d-flex justify-content-around'>
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
                            <th scope="col">Nombre</th>
                            <th scope="col">Importe</th>
                            <th scope="col">Pagado</th>
                            <th scope="col">Ver más detalles</th>
                            <th scope="col">Eliminar reserva</th>
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
                {(this.state.selectedBookingIndex !== null && this.state.selectedBookingIndex !== undefined) && (
                    <Modal centered show={this.state.showConfirmationModal} onHide={this.hideConfirmationModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Detalles de reserva</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ul>
                                <li>Pista: {this.state.bookings[this.state.selectedBookingIndex]["court.name"]}</li>
                                <li>
                                    Usuario:
                                    &nbsp;{/* white space */}                                        
                                    {this.state.bookings[this.state.selectedBookingIndex]["user.name"]}
                                    &nbsp;{/* white space */}
                                    {this.state.bookings[this.state.selectedBookingIndex]["user.firstSurname"]}
                                    &nbsp;{/* white space */}
                                    {this.state.bookings[this.state.selectedBookingIndex]["user.secondSurname"]}                                    
                                </li>
                                <li>Correo electrónico: {this.state.bookings[this.state.selectedBookingIndex]["user.email"]}</li>
                                <li>Día: {this.state.bookings[this.state.selectedBookingIndex].day}</li>
                                <li>
                                    Hora: {this.state.bookings[this.state.selectedBookingIndex].startTime}
                                    -
                                    {this.state.bookings[this.state.selectedBookingIndex].finishTime}
                                </li>
                                {this.state.bookings[this.state.selectedBookingIndex].withLight ? (
                                    <li>Con luz</li>
                                ) : (
                                    <li>Sin luz</li>
                                )}
                                <li>Importe: {this.state.bookings[this.state.selectedBookingIndex].amountToPay} €</li>
                                {this.state.bookings[this.state.selectedBookingIndex].paid ? (
                                    <li>Pagado:
                                        &nbsp;{/* white space */}
                                        <input className="form-check-input" type="checkbox" value={this.state.selectedBookingIndex} checked={this.state.bookings[this.state.selectedBookingIndex].paid} onChange={this.handlePaid}/>
                                        &nbsp;{/* white space */}
                                        (Actualmente pagado)
                                    </li>
                                    
                                ) : (
                                    <li>Pagado:
                                        &nbsp;{/* white space */}
                                        <input className="form-check-input" type="checkbox" value={this.state.selectedBookingIndex} checked={this.state.bookings[this.state.selectedBookingIndex].paid} onChange={this.handlePaid}/>
                                        &nbsp;{/* white space */}
                                        (Actualmente no pagado)
                                    </li>
                                )}
                            </ul>
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="btn btn-secondary" onClick={this.hideConfirmationModal}>
                                Menos detalles
                            </button>
                        </Modal.Footer>
                    </Modal>
                )}
            </AdminLayout>
        );
    }
}

export default AdminBookingsPage;