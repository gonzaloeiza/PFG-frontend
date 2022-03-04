import React, { Component }  from 'react';
import { Layout } from '../component';
import "../assets/css/pages/login.css"

class Signup extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state =  {
            
        }
    }

    
    handleSubmit = (e) => {
        e.preventDefault();
        // const inputs = e.target.getElementsByTagName("input");
        this.setState({
            
        }, () => {

        })
    };

    render() {
        return (
            <Layout className="app-login" isHeader={true}>           
            <div className="container">
                <div className="row pt-5">
                    <div className="col-md-6 offset-md-3 p-5">
                        <div className="card my-5"> 
                            <form className="card-body cardbody-color p-lg-5" onSubmit={this.handleSubmit}>
                                <div className="text-center">
                                    <h2 className="text-center mb-4 text-dark">Formulario de inscripción</h2>
                                </div>
                                    <div className="mb-1">
                                        <input type="text" className="form-control" id="username" placeholder="Nombre de usuario *" />
                                    </div>
                                    <div className="mb-1">
                                        <input type="text" className="form-control" id="username" placeholder="Nombre *" />
                                    </div>
                                    <div className="mb-1">
                                        <input type="text" className="form-control" id="firstSurname" placeholder="Primer apellido *" />
                                    </div>
                                    <div className="mb-3">
                                        <input type="text" className="form-control" id="secondSurname" placeholder="Segundo apellido" />
                                    </div>
                                    <div className='row mb-4'>
                                        <p className='mx-1 my-1'>Fecha de nacimiento</p>
                                        <div className='col'>
                                            <div className="input-group">
                                                <select  className="custom-select form-select" id="inputGroupSelect01">
                                                    <option hidden>Dia</option>
                                                    <option value="1">One</option>
                                                    <option value="2">Two</option>
                                                    <option value="3">Three</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className='col mx-2'>
                                            <div className="input-group">
                                                <select  className="custom-select form-select" id="inputGroupSelect01">
                                                    <option hidden>Mes</option>
                                                    <option value="1">One</option>
                                                    <option value="2">Two</option>
                                                    <option value="3">Three</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className='col mx-2'>
                                            <div className="input-group">
                                                <select  className="custom-select form-select" id="inputGroupSelect01">
                                                    <option hidden>Año</option>
                                                    <option value="1">One</option>
                                                    <option value="2">Two</option>
                                                    <option value="3">Three</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-3 ">
                                        <div className='col-4'>
                                            <div className="input-group">
                                                <select  className="custom-select form-select" id="inputGroupSelect01">
                                                    <option hidden>Sexo</option>
                                                    <option value="1">One</option>
                                                    <option value="2">Two</option>
                                                    <option value="3">Three</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-1">
                                        <input type="text" className="form-control" id="secondSurname" placeholder="Correo electrónico *" />
                                    </div>
                                    <div className="mb-3">
                                        <input type="text" className="form-control" id="secondSurname" placeholder="Confirma correo ectrónico *" />
                                    </div>
                                    <div className="mb-3">
                                        <input type="text" className="form-control" id="secondSurname" placeholder="Móvil *" />
                                    </div>
                                    <div className="mb-1">
                                        <input type="text" className="form-control" id="secondSurname" placeholder="Contraseña *" />
                                    </div>
                                    <div className="mb-3">
                                        <input type="text" className="form-control" id="secondSurname" placeholder="Confirma contraseña *" />
                                    </div>
                                    <div className="mb-1">
                                        <input type="text" className="form-control" id="secondSurname" placeholder="Dirección" />
                                    </div>
                                    <div className="mb-1">
                                        <input type="text" className="form-control" id="secondSurname" placeholder="Población" />
                                    </div>
                                    <div className="mb-1">
                                        <input type="text" className="form-control" id="secondSurname" placeholder="Código postal" />
                                    </div>
                                    <div className="mb-3">
                                        <input type="text" className="form-control" id="secondSurname" placeholder="Provincia" />
                                    </div>
                                    <div className="row mb-3 ">
                                        <div className='col-4 mb-4'>
                                            <div className="input-group">
                                                <select  className="custom-select form-select" id="inputGroupSelect01">
                                                    <option hidden>Posición</option>
                                                    <option value="1">One</option>
                                                    <option value="2">Two</option>
                                                    <option value="3">Three</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                    <button type="submit" className="btn btn-color px-5 w-100">Enviar solicitud</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>     
        );
    }
}


export default Signup;