import React, { Component } from "react";
import { Modal } from 'react-bootstrap';
import { Layout, BlueCard } from "../component";
import PhoneInput from 'react-phone-input-2';
import { getUsername, getUserData, updateUserProfile, deleteAccount } from "../services/user.services";
import { message } from "antd";

class SettingsPage extends Component {
    constructor(props) {
        super(props);
        this.updateProfile = this.updateProfile.bind(this);
        this.showDeleteAccountModal = this.showDeleteAccountModal.bind(this);
        this.hideDeleteAccountModal = this.hideDeleteAccountModal.bind(this);
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
        this.deleteProfile = this.deleteProfile.bind(this);
        this.state = {
            loading: true,
            disableEdit: true,
            showDeleteAccountModal: false,
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


    async showDeleteAccountModal() {
        await this.setState({
            showDeleteAccountModal: true
        });
    }

    async hideDeleteAccountModal() {
        await this.setState({
            showDeleteAccountModal: false
        });
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

    async updateProfile(e) {
        e.preventDefault();
        
        await this.setState({
            loading: true
        });

        if (this.state.user.newPassword !== document.getElementById("repeatPassword").value) {
            message.error("Las contraseñas no coinciden");
        } else {
            const successUpdate = await updateUserProfile(this.props, this.state.user);
            if (successUpdate) {

                const userData = await getUserData(this.props);
                userData.newPassword = "";                
                localStorage.setItem("name", userData.name);
                
                await this.setState({
                    loading: false,
                    disableEdit: true,
                    user: userData,
                    username: await getUsername()
                });

                document.getElementById("repeatPassword").value = "";
                document.getElementById("gender").selectedIndex = this.state.selectedGenderIndex;        
            } else {
                await this.setState({
                    loading: false
                });
            }
        }
    }
    
    async deleteProfile() {
        await deleteAccount(this.props);
    }

    render() {
        return (
            <Layout isHeader={true} username={this.state.username}>
                <BlueCard>
                    <h1>Ajustes</h1>
                </BlueCard>
                {this.state.user && (
                    <>
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
                                    <input type="password" className="form-control" disabled={this.state.disableEdit} value={this.state.user.newPassword} onChange={this.changePassword} id="password" placeholder="Nueva contraseña" />
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

                    <Modal show={this.state.showDeleteAccountModal} onHide={this.hideDeleteAccountModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Eliminar cuenta</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>¿Estas seguro de que deseas eliminar permanentemente tu cuenta? Una vez borrada no podrá ser recuperada</p>
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
                </>
            )}
            </Layout>
        );
    }
}

export default SettingsPage;