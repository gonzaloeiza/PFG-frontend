import React, { Component }  from 'react';
import { AdminLayout } from '../component';
import { Modal } from 'react-bootstrap';
import { getUserData } from '../services/admin.services/users.service';
import { handlePaid, cancelBooking } from '../services/admin.services/bookings.service';
import PhoneInput from 'react-phone-input-2';
import moment from 'moment';

class AdminSpecificUserPage extends Component {
    constructor(props) {
        super(props);
        this.updateProfile = this.updateProfile.bind(this);
        this.changeDNI = this.changeDNI.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeFirstSurname = this.changeFirstSurname.bind(this);
        this.changeSecondSurname = this.changeSecondSurname.bind(this);
        this.changeBirthDate = this.changeBirthDate.bind(this);
        this.changeGender = this.changeGender.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePhoneNumber = this.changePhoneNumber.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changeDirection = this.changeDirection.bind(this);
        this.changePoblation = this.changePoblation.bind(this);
        this.changePostalCode = this.changePostalCode.bind(this);
        this.changeProvince = this.changeProvince.bind(this);
        this.handlePaid = this.handlePaid.bind(this);
        this.cancelBooking = this.cancelBooking.bind(this);
        this.showConfirmationModal = this.showConfirmationModal.bind(this);
        this.hideConfirmationModal = this.hideConfirmationModal.bind(this);

        this.state =  {
            loading: true,
            showConfirmationModal: false,
            user: null,
            bookings: [],
            selectedGenderIndex: 0,
            selectedBookingIndex: null,
        }
    }

    async componentDidMount() {
        const data = await getUserData(this.props, this.props.match.params.userId);
        var genderIndex = 0;
        if (data[0].gender === "HOMBRE") {
            genderIndex = 1;
        } else if (data[0].gender === "MUJER") {
            genderIndex = 2;
        } else {
            genderIndex = 3;
        }
        data[0].newPassword = "";
        await this.setState({
            loading: false,
            user: data[0],
            bookings: data[1],
            selectedGenderIndex: genderIndex
        });
        document.getElementById("gender").selectedIndex = this.state.selectedGenderIndex;
    }
    
    async updateProfile(e) {
        e.preventDefault();
        console.log(this.state.user);
    }

    async changeDNI(e) {
        var user = {...this.state.user};
        user.dni = e.target.value;
        await this.setState({
            user: user
        });
    }


    async changeName(e) {
        var user = {...this.state.user};
        user.name = e.target.value;
        await this.setState({
            user: user
        });
    }

    async changeFirstSurname(e) {
        var user = {...this.state.user};
        user.firstSurname = e.target.value;
        await this.setState({
            user: user
        });
    }


    async changeSecondSurname(e) {
        var user = {...this.state.user};
        user.secondSurname = e.target.value;
        await this.setState({
            user: user
        });
    }

    async changeBirthDate(e) {
        var user = {...this.state.user};
        user.dateBirth = e.target.value;
        await this.setState({
            user: user
        });
    }
    
    async changeGender(e) {
        var user = {...this.state.user};
        user.gender = e.target.value;
        await this.setState({
            user: user
        });
    }
    
    async changeEmail(e) {
        var user = {...this.state.user};
        user.email = e.target.value;
        await this.setState({
            user: user
        });
    }
    
    async changePhoneNumber(e) {
        var user = {...this.state.user};
        user.phoneNumber = e;
        await this.setState({
            user: user
        });
    }
    
    async changePassword(e) {
        var user = {...this.state.user};
        user.newPassword = e.target.value;
        await this.setState({
            user: user
        });
    }
    
    async changeDirection(e) {
        var user = {...this.state.user};
        user.direction = e.target.value;
        await this.setState({
            user: user
        });
    }
    
    async changePoblation(e) {
        var user = {...this.state.user};
        user.poblation = e.target.value;
        await this.setState({
            user: user
        });
    }
    
    async changePostalCode(e) {
        var user = {...this.state.user};
        user.postalCode = e.target.value;
        await this.setState({
            user: user
        });
    }
    
    async changeProvince(e) {
        var user = {...this.state.user};
        user.province = e.target.value;
        await this.setState({
            user: user
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

        const data = await getUserData(this.props, this.props.match.params.userId);

        await this.setState({
            loading: false,
            user: data[0],
            bookings: data[1]
        });
    }

    async cancelBooking(e) {
        const bookingIndex = e.target.value;
        await this.setState({
            loading: true,
        });

        await cancelBooking(this.props, this.state.bookings[bookingIndex].id);
        
        const data = await getUserData(this.props, this.props.match.params.userId);

        await this.setState({
            loading: false,
            user: data[0],
            bookings: data[1]
        });
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
                <div className="center">
                    <div className="spinner-border" style={{width: "5rem", height: "5rem"}} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            );
        }
        
        var tableBody = [];
        for (var i = 0; i < this.state.bookings.length; i++) {
            const startTime = moment(this.state.bookings[i].startTime, "HH:mm:ss").format("HH:mm");
            const finishTime = moment(this.state.bookings[i].finishTime, "HH:mm:ss").format("HH:mm");
            tableBody.push(
                <tr key={i}>
                    <th scope="row">{this.state.bookings[i].day}</th>
                    <td>{startTime}-{finishTime}</td>
                    <td>{this.state.bookings[i].amountToPay} €</td>
                    <td><input className="form-check-input" type="checkbox" value={i} checked={this.state.bookings[i].paid} onChange={this.handlePaid}/></td>
                    <td><button className='btn btn-success' value={i} onClick={this.showConfirmationModal}>Más detalles</button></td>
                    <td><button className='btn btn-danger' value={i} onClick={this.cancelBooking}>Eliminar</button></td>
                </tr>
            );
        }

        return (
            <AdminLayout isHeader={true}>
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
                            <div className="card my-5">
                                <div className="card-body cardbody-color text-center">
                                    <div className='row justify-content-center'>
                                        <form className="card-body cardbody-color p-lg-5" onSubmit={this.updateProfile}>
                                            <div className="text-center">
                                                <h1 className="text-center mb-4 text-dark">{this.state.user.name} {this.state.user.firstSurname} {this.state.user.secondSurname}</h1>
                                            </div>
                                            <div className="mb-1">
                                                <input type="text" className="form-control" id="dni" value={this.state.user.dni} onChange={this.changeDNI} placeholder="DNI *" />
                                            </div>
                                            <div className="mb-1">
                                                <input type="text" className="form-control" id="name" value={this.state.user.name} onChange={this.changeName} placeholder="Nombre *" />
                                            </div>
                                            <div className="mb-1">
                                                <input type="text" className="form-control" id="firstSurname" value={this.state.user.firstSurname} onChange={this.changeFirstSurname} placeholder="Primer apellido *" />
                                            </div>
                                            <div className="mb-3">
                                                <input type="text" className="form-control" id="secondSurname" value={this.state.user.secondSurname} onChange={this.changeSecondSurname} placeholder="Segundo apellido" />
                                            </div>
                                            <div className="mb-3">
                                                <p className='mx-1 my-1'>Fecha de nacimiento</p>
                                                <input type="date" className="form-control" id="dateBirth" value={this.state.user.dateBirth} onChange={this.changeBirthDate} />
                                            </div>
                                            <div className='col-md-6'>
                                                <div className="input-group">
                                                    <select  className="custom-select form-select" id="gender" value={this.state.gender} onChange={this.changeGender}>
                                                        <option hidden>Sexo</option>
                                                        <option value="HOMBRE">Hombre</option>
                                                        <option value="MUJER">Mujer</option>
                                                        <option value="OTRO">Otro</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="mb-1">
                                                <input type="text" className="form-control" id="email" value={this.state.user.email} onChange={this.changeEmail} placeholder="Correo electrónico *" />
                                            </div>
                                            <div className="mb-3">
                                                <PhoneInput
                                                placeholder="Numero de teléfono"
                                                country={"es"}
                                                value={this.state.user.phoneNumber}
                                                onChange={this.changePhoneNumber}
                                                />
                                            </div>
                                            <div className="mb-1">
                                                <input type="password" className="form-control" id="password" value={this.state.user.newPassword} onChange={this.changePassword} placeholder="***********" />
                                            </div>
                                            <div className="mb-1">
                                                <input type="text" className="form-control" id="direction" value={this.state.user.direction} onChange={this.changeDirection} placeholder="Dirección" />
                                            </div>
                                            <div className="mb-1">
                                                <input type="text" className="form-control" id="poblation" value={this.state.user.poblation} onChange={this.changePoblation} placeholder="Población" />
                                            </div>
                                            <div className="mb-1">
                                                <input type="text" className="form-control" id="postalCode" value={this.state.user.postalCode} onChange={this.changePostalCode} placeholder="Código postal" />
                                            </div>
                                            <div className="mb-3">
                                                <input type="text" className="form-control" id="province" value={this.state.user.province} onChange={this.changeProvince} placeholder="Provincia" />
                                            </div>
                                            <div className="text-center">
                                                <button type="submit" className="btn btn-primary px-5 w-100">Actualizar datos</button>
                                                <button type="submit" className="btn btn-danger mt-2 px-5 w-100">Eliminar cuenta</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8">
                                <div className="card my-5">
                                    <div className="card-body cardbody-color text-center">
                                        <h1>Reservas de {this.state.user.name}</h1>
                                    </div>
                                </div>
                                <table className="table table-striped">
                                    <thead className="table-dark">
                                        <tr>
                                        <th scope="col">Fecha</th>
                                        <th scope="col">Hora</th>
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
                            </div>
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

export default AdminSpecificUserPage;