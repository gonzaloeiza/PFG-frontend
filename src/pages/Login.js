import React, { Component }  from 'react';
import { login } from '../middleware/auth';
import { Layout } from '../component';
import "../assets/css/pages/login.css";

class Login extends Component {
    constructor(props) {     
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            email: null,
            password: null
        }
    }
       handleSubmit = (e) => {
            e.preventDefault();
            const inputs = e.target.getElementsByTagName("input");

            this.setState({
                email: inputs.email.value,
                password: inputs.password.value
            }, () => {
                login(this.props, this.state.email, this.state.password);
            })
        };

    render() {
        return (
            <Layout className="app-login" isHeader={true}>           
                <div className="container">
                    <div className="row justify-content-center pt-5">
                        <div className="col-xs-12 col-sm-10 col-md-8 col-lg-7">
                            <div className="card my-5"> 
                                <form className="card-body cardbody-color p-lg-5" onSubmit={this.handleSubmit}>
                                    <div className="text-center">
                                        <h1 className="text-center mb-4 text-dark">Inicio de sesión</h1>
                                     {/* <img src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png" className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3" width="50px" alt="profile" /> */}
                                    </div>
                                    <div className="mb-3">
                                        <input type="text" className="form-control" name="email" id="email" placeholder="Correo electrónico" />
                                    </div>
                                    <div className="mb-3">
                                        <input type="password" className="form-control" name="email" id="password" placeholder="Contraseña" />
                                    </div>
                                    <div className="text-center">
                                        <button type="submit" className="btn btn-color px-5 mb-5 w-100">Iniciar Sesión</button>
                                    </div>    
                                    <div id="emailHelp" className="form-text text-center mb-3 text-dark">¿No tienes cuenta todavía?
                                        <a href="/signup" className="text-dark fw-bold"> Registrate</a>
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

export default Login;