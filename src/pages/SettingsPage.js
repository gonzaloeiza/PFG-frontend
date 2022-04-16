import React, { Component } from "react";
import { Layout, BlueCard } from "../component";
import PhoneInput from 'react-phone-input-2';
import { getUsername, getUserData } from "../services/user.services";

class SettingsPage extends Component {
    constructor(props) {
        super(props);
        this.changeDNI = this.changeDNI.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeFirstSurname = this.changeFirstSurname.bind(this);
        this.changeSecondSurname = this.changeSecondSurname.bind(this);
        this.changeBirthDate = this.changeBirthDate.bind(this);
        this.changeGender = this.changeGender.bind(this);
        this.changePhoneNumber = this.changePhoneNumber.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changeDirection = this.changeDirection.bind(this);
        this.changePoblation = this.changePoblation.bind(this);
        this.changePostalCode = this.changePostalCode.bind(this);
        this.changeProvince = this.changeProvince.bind(this);
        this.state = {
            loading: true,
            disableEdit: true,
            username: null,
            user: null,
            selectedGenderIndex: 0,
        }
    }

    async componentDidMount() {
        const userData = await getUserData(this.props);
        var genderIndex = 0;
        if (userData.gender === "HOMBRE") {
            genderIndex = 1;
        } else if (userData.gender === "MUJER") {
            genderIndex = 2;
        } else {
            genderIndex = 3;
        }
        userData.newPassword = "";

       await this.setState({
           loading: false,
           username: await getUsername(),
           user: userData,
           selectedGenderIndex: genderIndex
       });
       document.getElementById("gender").selectedIndex = this.state.selectedGenderIndex;
    }

    async changeDNI(e) {

    }

    async changeName(e) {

    }

    async changeFirstSurname(e) {

    }

    async changeSecondSurname(e) {

    }

    async changeBirthDate(e) {

    }

    async changeGender(e) {

    }

    async changePhoneNumber(e) {

    }

    async changePassword(e) {

    }

    async changeDirection(e) {

    }

    async changePoblation(e) {

    }

    async changePostalCode(e) {

    }

    async changeProvince(e) {

    }

    

    render() {
        return (
            <Layout isHeader={true} username={this.state.username}>
                <BlueCard>
                    <h1>Ajustes</h1>
                </BlueCard>
                {this.state.user && (
                    <BlueCard className="col-xs-12 col-sm-12 col-md-10 col-lg-8">
                        <div className="text-center">
                            <h1 className="text-center mb-4 text-dark">{this.state.user.name} {this.state.user.firstSurname}</h1>
                        </div>
                        <div className="row justify-content-end mb-3 mx-0">
                            <button className="col-xs-12 col-sm-12 col-md-3 btn btn-secondary" onClick={(e) => this.setState({disableEdit: !this.state.disableEdit})}>
                                <i className="bi bi-pencil"> Editar perfil</i>
                            </button>
                        </div>
                        <form onSubmit={this.updateProfile}>
                            <div className="mb-1">
                                <input type="text" className="form-control" disabled={this.state.disableEdit} value={this.state.user.dni} onChange={this.changeDNI} id="dni" placeholder="DNI *" required/>
                            </div>
                            <div className="mb-1">
                                <input type="text" className="form-control" disabled={this.state.disableEdit} value={this.state.user.name} onChange={this.changeName} id="name" placeholder="Nombre *" required/>
                            </div>
                            <div className="mb-1">
                                <input type="text" className="form-control" disabled={this.state.disableEdit} value={this.state.user.firstSurname} onChange={this.changeFirstSurname} id="firstSurname" placeholder="Primer apellido *" required/>
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" disabled={this.state.disableEdit} value={this.state.user.secondSurname} onChange={this.changeSecondSurname} id="secondSurname" placeholder="Segundo apellido" />
                            </div>
                            <div className="mb-1">
                                <p className='mx-1 my-1'>Fecha de nacimiento</p>
                                <input type="date" className="form-control" disabled={this.state.disableEdit} value={this.state.user.dateBirth}  onChange={this.changeBirthDate} id="dateBirth" required/>
                            </div>
                            <div className='col-md-6 mb-1'>
                                <div className="input-group">
                                    <select  className="custom-select form-select" disabled={this.state.disableEdit} onChange={this.changeGender} id="gender" required>
                                        <option hidden>Sexo</option>
                                        <option value="HOMBRE">Hombre</option>
                                        <option value="MUJER">Mujer</option>
                                        <option value="OTRO">Otro</option>
                                    </select>
                                </div>
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
                                <input type="password" className="form-control" disabled={this.state.disableEdit}  onChange={this.changePassword} id="password" placeholder="Nueva contraseña" />
                            </div>
                            <div className="mb-3">
                                <input type="password" className="form-control" disabled={this.state.disableEdit} id="repeatPassword" placeholder="Repetir nueva contraseña" />
                            </div>
                            <div className="mb-1">
                                <input type="text" className="form-control" disabled={this.state.disableEdit} value={this.state.user.direction} onChange={this.changeDirection} id="direction" placeholder="Dirección" />
                            </div>
                            <div className="mb-1">
                                <input type="text" className="form-control" disabled={this.state.disableEdit} value={this.state.user.poblation} onChange={this.changePoblation} id="poblation" placeholder="Población" />
                            </div>
                            <div className="mb-1">
                                <input type="text" className="form-control" disabled={this.state.disableEdit} id="postalCode" value={this.state.user.postalCode} onChange={this.changePostalCode} placeholder="Código postal" />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" disabled={this.state.disableEdit} id="province" value={this.state.user.province} onChange={this.changeProvince} placeholder="Provincia" />
                            </div>
                            <div className="text-center">
                                <button type="submit" disabled={this.state.disableEdit} className="btn btn-primary px-5 w-100">Actualizar datos</button>
                            </div>
                        </form>
                        <div className="text-center">
                            <button disabled={this.state.disableEdit} onClick={this.showDeleteAccountModal} className="btn btn-danger mt-2 px-5 w-100">Eliminar cuenta</button>
                        </div>
                    </BlueCard>
                )}
            </Layout>
        );
    }
}

export default SettingsPage;