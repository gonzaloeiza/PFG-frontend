import React, { Component }  from 'react';
import { AdminLayout, Loading, BlueCard } from '../component';
import { Modal } from 'react-bootstrap';
import { getUserData, updateUserData, deleteProfile } from '../services/admin.services/users.service';
import { handlePaid, cancelBooking } from '../services/admin.services/bookings.service';
import PhoneInput from 'react-phone-input-2';
import moment from 'moment';

class AdminSpecificUserPage extends Component {
    constructor(props) {
        super(props);
        this.updateProfile = this.updateProfile.bind(this);
        this.deleteProfile = this.deleteProfile.bind(this);
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
        this.changePendingSignUp = this.changePendingSignUp.bind(this);
        this.handlePaid = this.handlePaid.bind(this);
        this.cancelBooking = this.cancelBooking.bind(this);
        this.showConfirmationModal = this.showConfirmationModal.bind(this);
        this.hideConfirmationModal = this.hideConfirmationModal.bind(this);
        this.showDeleteAccountModal = this.showDeleteAccountModal.bind(this);
        this.hideDeleteAccountModal = this.hideDeleteAccountModal.bind(this);
        this.showCancelModal = this.showCancelModal.bind(this);
        this.hideCancelModal = this.hideCancelModal.bind(this);
        this.state =  {
            loading: true,
            showConfirmationModal: false,
            showDeleteAccountModal: false,
            showCancelModal: false,
            disableEdit: true,
            user: null,
            bookings: [],
            selectedGenderIndex: 0,
            selectedBookingIndex: null,
            selectedCancelBookingIndex: null
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
            user: user,
            selectedGenderIndex: e.target.selectedIndex
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

    async changePendingSignUp(e) {
        var user = {...this.state.user};
        user.pendingSignUp = !e.target.checked;
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
        data[0].newPassword = "";
        await this.setState({
            loading: false,
            user: data[0],
            bookings: data[1]
        });
    }

    async cancelBooking(e) {
        await this.setState({
            loading: true,
        });

        await cancelBooking(this.props, this.state.bookings[this.state.selectedCancelBookingIndex].id);
        this.hideCancelModal();
        const data = await getUserData(this.props, this.props.match.params.userId);
        data[0].newPassword = "";

        await this.setState({
            loading: false,
            user: data[0],
            bookings: data[1]
        });

        document.getElementById("gender").selectedIndex = this.state.selectedGenderIndex;
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

    async showDeleteAccountModal(e) {
        await this.setState({
            showDeleteAccountModal: true
        });
    }

    async hideDeleteAccountModal() {
        await this.setState({
            showDeleteAccountModal: false,
            disableEdit: true
        });
    }

    async updateProfile(e) {
        e.preventDefault();
        await this.setState({
            loading: true
        })

        await updateUserData(this.props, this.state.user);

        const data = await getUserData(this.props, this.props.match.params.userId);
        data[0].newPassword = "";
        await this.setState({
            loading: false,
            disableEdit: true,
            user: data[0],
            bookings: data[1]
        });

        document.getElementById("gender").selectedIndex = this.state.selectedGenderIndex;        
    }

    async deleteProfile() {   
        await deleteProfile(this.props, this.state.user.id);
    }


    async showCancelModal(e) {
        await this.setState({
            showCancelModal: true,
            selectedCancelBookingIndex: e.target.value
        });
    }

    async hideCancelModal(e) {
        await this.setState({
            showCancelModal: false,
            selectedCancelBookingIndex: null
        });
    }


    render() {
        if (this.state.loading) {
            return (
                <Loading />
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
                    <td>{this.state.bookings[i]["court.name"]}</td>
                    <td><input className="form-check-input" type="checkbox" value={i} checked={this.state.bookings[i].paid} onChange={this.handlePaid}/></td>
                    <td><button className='btn btn-success' value={i} onClick={this.showConfirmationModal}>Más detalles</button></td>
                    <td><button className='btn btn-danger' value={i} onClick={this.showCancelModal}>Eliminar</button></td>
                </tr>
            );
        }

        return (
            <AdminLayout isHeader={true}>
                <div className="row justify-content-around">
                    <div className='col-xs-12 col-sm-12 col-md-12 col-lg-4'>
                        <BlueCard className="" withoutContainer={true}>
                            <div className="text-center">
                                <h1 className="text-center mb-4 text-dark">{this.state.user.name} {this.state.user.firstSurname}</h1>
                            </div>
                            <div className="row justify-content-end mb-3 mx-0">
                                <button className="col-5 btn btn-secondary" onClick={(e) => this.setState({disableEdit: !this.state.disableEdit})}>
                                    <i className="bi bi-pencil"> Editar perfil</i>
                                </button>
                            </div>
                            <form onSubmit={this.updateProfile}>
                                <div className="mb-1">
                                    <input type="text" className="form-control" disabled={this.state.disableEdit} id="dni" value={this.state.user.dni} onChange={this.changeDNI} placeholder="DNI *" required/>
                                </div>
                                <div className="mb-1">
                                    <input type="text" className="form-control" disabled={this.state.disableEdit} id="name" value={this.state.user.name} onChange={this.changeName} placeholder="Nombre *" required/>
                                </div>
                                <div className="mb-1">
                                    <input type="text" className="form-control" disabled={this.state.disableEdit} id="firstSurname" value={this.state.user.firstSurname} onChange={this.changeFirstSurname} placeholder="Primer apellido *" required/>
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" disabled={this.state.disableEdit} id="secondSurname" value={this.state.user.secondSurname} onChange={this.changeSecondSurname} placeholder="Segundo apellido" />
                                </div>
                                <div className="mb-1">
                                    <p className='mx-1 my-1'>Fecha de nacimiento</p>
                                    <input type="date" className="form-control" disabled={this.state.disableEdit} id="dateBirth" value={this.state.user.dateBirth} onChange={this.changeBirthDate} required/>
                                </div>
                                <div className='col-md-6 mb-1'>
                                    <div className="input-group">
                                        <select  className="custom-select form-select" disabled={this.state.disableEdit} id="gender" value={this.state.gender} onChange={this.changeGender} required>
                                            <option hidden>Sexo</option>
                                            <option value="HOMBRE">Hombre</option>
                                            <option value="MUJER">Mujer</option>
                                            <option value="OTRO">Otro</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="mb-1">
                                    <input type="text" className="form-control" disabled={this.state.disableEdit} id="email" value={this.state.user.email} onChange={this.changeEmail} placeholder="Correo electrónico *" required/>
                                </div>
                                <div className="mb-3">
                                    <PhoneInput
                                    placeholder="Numero de teléfono"
                                    country={"es"}
                                    disabled={this.state.disableEdit}
                                    value={this.state.user.phoneNumber}
                                    onChange={this.changePhoneNumber}
                                    />
                                </div>
                                <div className="mb-1">
                                    <input type="password" className="form-control" disabled={this.state.disableEdit} id="password" value={this.state.user.newPassword} onChange={this.changePassword} placeholder="***********" />
                                </div>
                                <div className="mb-1">
                                    <input type="text" className="form-control" disabled={this.state.disableEdit} id="direction" value={this.state.user.direction} onChange={this.changeDirection} placeholder="Dirección" />
                                </div>
                                <div className="mb-1">
                                    <input type="text" className="form-control" disabled={this.state.disableEdit} id="poblation" value={this.state.user.poblation} onChange={this.changePoblation} placeholder="Población" />
                                </div>
                                <div className="mb-1">
                                    <input type="text" className="form-control" disabled={this.state.disableEdit} id="postalCode" value={this.state.user.postalCode} onChange={this.changePostalCode} placeholder="Código postal" />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" disabled={this.state.disableEdit} id="province" value={this.state.user.province} onChange={this.changeProvince} placeholder="Provincia" />
                                </div>
                                <div className="row justify-content-around mx-0 mb-3">
                                    <p className="col-12 mb-1">Solicitud de registro aprobada</p>
                                    <input  disabled={this.state.disableEdit} className="col-2 form-check-input" type="checkbox" checked={!this.state.user.pendingSignUp} onChange={this.changePendingSignUp} />
                                </div>
                                <div className="text-center">
                                    <button type="submit" disabled={this.state.disableEdit} className="btn btn-primary px-5 w-100">Actualizar datos</button>
                                </div>
                            </form>
                            <div className="text-center">
                                <button disabled={this.state.disableEdit} onClick={this.showDeleteAccountModal} className="btn btn-danger mt-2 px-5 w-100">Eliminar cuenta</button>
                            </div>
                        </BlueCard>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-7">
                        <BlueCard className="" withoutContainer={true}>
                            <h1>Reservas de {this.state.user.name}</h1>
                        </BlueCard>
                        <table className="table table-striped">
                            <thead className="table-dark">
                                <tr>
                                <th scope="col">Fecha</th>
                                <th scope="col">Hora</th>
                                <th scope="col">Pista</th>
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
                            <Modal.Title>Detalles de la reserva</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ul>
                                    <li>Pista: {this.state.bookings[this.state.selectedBookingIndex]["court.name"]}</li>
                                    <li>
                                        Usuario:
                                        &nbsp;{/* white space */}                                        
                                        {this.state.user.name}
                                        &nbsp;{/* white space */}
                                        {this.state.user.firstSurname}
                                        &nbsp;{/* white space */}
                                        {this.state.user.secondSurname}                                    
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
                
                <Modal show={this.state.showDeleteAccountModal} onHide={this.hideDeleteAccountModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Eliminar cuenta</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>¿Estas seguro de que deseas eliminar permanentemente la cuenta de: {this.state.user.name} {this.state.user.firstSurname} {this.state.user.secondSurname}?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary" onClick={this.hideDeleteAccountModal}>
                            Cancelar
                        </button>
                        <button className="btn btn-danger" onClick={this.deleteProfile}>
                            Eliminar
                        </button>
                    </Modal.Footer>
                </Modal>
                {this.state.selectedCancelBookingIndex !== null && (
                    <Modal show={this.state.showCancelModal} onHide={this.hideCancelModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Eliminar cuenta</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>¿Estas seguro de que deseas anular la reserva?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary" onClick={this.hideCancelModal}>
                            Cancelar
                        </button>
                        <button className="btn btn-danger" onClick={this.cancelBooking}>
                            Eliminar
                        </button>
                    </Modal.Footer>
                </Modal>
                )}
            </AdminLayout>   
        );
    }
}

export default AdminSpecificUserPage;