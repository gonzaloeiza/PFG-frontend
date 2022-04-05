import React, { Component }  from 'react';
import { BlueCard, Layout } from '../component';
import { message } from 'antd';
import { signUp } from '../services/auth.service'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

class Signup extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state =  {
            dni: null,
            name: null,
            firstSurname: null,
            secondSurname: null,
            dateBirth: null,
            gender: null,
            email: null,
            phoneNumber: null,
            password: null,
            direction:  null,
            poblation: null,
            postalCode: null,
            province: null
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const inputs = e.target.getElementsByTagName("input");
        const selects = e.target.getElementsByTagName("select");

        if (inputs.email.value !== inputs.emailConfirmation.value) {
            message.error("Los correos electrónicos no coinciden");
            return;
        }
        if (inputs.password.value !== inputs.passwordConfirmation.value) {
            message.error("Las contraseñas no coinciden");
            return;
        }

        this.setState({
            dni: inputs.dni.value,
            name: inputs.name.value,
            firstSurname: inputs.firstSurname.value,
            secondSurname: inputs.secondSurname.value,
            dateBirth: `${selects.year.value}-${selects.month.value}-${selects.day.value}`,
            gender: selects.gender.value,
            email: inputs.email.value,
            password: inputs.password.value,
            direction:  inputs.direction.value,
            poblation: inputs.poblation.value,
            postalCode: inputs.postalCode.value,
            province: inputs.province.value
        }, () => {
            console.log(this.state);
            signUp(this.props, this.state);
        })
    };

    render() {

        var dayOptions = [];
        for (var i = 1; i <= 31; i++) {
            if (i < 10) {
                dayOptions.push(
                    <option value={"0" + i} key={i}>{"0" + i}</option>
                );
            } else {
                dayOptions.push(
                    <option value={i} key={i}>{i}</option>
                );
            }
        }

        var monthOptions = [];
        for (i = 1; i <= 12; i++) {
            if (i < 10) {
                monthOptions.push(
                    <option value={"0" + i} key={i}>{"0" + i}</option>
                );
            } else {
                monthOptions.push(
                    <option value={i} key={i}>{i}</option>
                );
            }
        }

        var yearOptions = [];
        const currentYear = new Date().getFullYear();
        for (i = currentYear; i > currentYear - 100; i--) {
            yearOptions.push(
                <option value={i} key={i}>{i}</option>
            );
        }

        return (
            <Layout className="app-login" isHeader={true}>
                <BlueCard className="col-xs-12 col-sm-10 col-md-8 col-lg-7">
                    <form onSubmit={this.handleSubmit}>
                        <div className="text-center">
                            <h2 className="text-center mb-4 text-dark">Formulario de inscripción</h2>
                        </div>
                            <div className="mb-1">
                                <input type="text" className="form-control" id="dni" placeholder="DNI *" />
                            </div>
                            <div className="mb-1">
                                <input type="text" className="form-control" id="name" placeholder="Nombre *" />
                            </div>
                            <div className="mb-1">
                                <input type="text" className="form-control" id="firstSurname" placeholder="Primer apellido *" />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" id="secondSurname" placeholder="Segundo apellido" />
                            </div>
                            <div className='row mb-3'>
                                <p className='mx-1 my-1'>Fecha de nacimiento</p>
                                <div className='col-md-4 mb-1'>
                                    <div className="input-group">
                                        <select  className="custom-select form-select" id="day">
                                            <option key="0" hidden>Dia</option>
                                            {dayOptions}
                                        </select>
                                    </div>
                                </div>
                                <div className='col-md-4 mb-1'>
                                    <div className="input-group">
                                        <select  className="custom-select form-select" id="month">
                                            <option key="0" hidden>Mes</option>
                                            {monthOptions}
                                        </select>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className="input-group">
                                        <select  className="custom-select form-select" id="year">
                                            <option id="0" hidden>Año</option>
                                            {yearOptions}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className='col-md-4'>
                                    <div className="input-group">
                                        <select  className="custom-select form-select" id="gender">
                                            <option hidden>Sexo</option>
                                            <option value="HOMBRE">Hombre</option>
                                            <option value="MUJER">Mujer</option>
                                            <option value="OTRO">Otro</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-1">
                                <input type="text" className="form-control" id="email" placeholder="Correo electrónico *" />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" id="emailConfirmation" placeholder="Confirma correo ectrónico *" />
                            </div>
                            <div className="mb-3">
                                <PhoneInput
                                placeholder="Numero de teléfono"
                                country={"es"}
                                value={this.state.phoneNumber}
                                onChange={phoneNumber => this.setState({ phoneNumber })}
                                />
                            </div>
                            <div className="mb-1">
                                <input type="password" className="form-control" id="password" placeholder="Contraseña *" />
                            </div>
                            <div className="mb-3">
                                <input type="password" className="form-control" id="passwordConfirmation" placeholder="Confirma contraseña *" />
                            </div>
                            <div className="mb-1">
                                <input type="text" className="form-control" id="direction" placeholder="Dirección" />
                            </div>
                            <div className="mb-1">
                                <input type="text" className="form-control" id="poblation" placeholder="Población" />
                            </div>
                            <div className="mb-1">
                                <input type="text" className="form-control" id="postalCode" placeholder="Código postal" />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" id="province" placeholder="Provincia" />
                            </div>
                            <div className="text-center">
                            <button type="submit" className="btn btn-primary px-5 w-100">Enviar solicitud</button>
                        </div>
                    </form>
                </BlueCard>          
            </Layout>     
        );
    }
}


export default Signup;