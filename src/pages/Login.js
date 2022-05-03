import React, { Component }  from 'react';
import { login } from '../middlewares/auth';
import { BlueCard, Layout } from '../components';

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
                <BlueCard className="col-xs-12 col-sm-10 col-md-8 col-lg-7">
                    <form onSubmit={this.handleSubmit}>
                        <div className="text-center">
                            <h1 className="text-center mb-4 text-dark">Inicio de sesión</h1>
                        </div>
                        <div className="mb-3">
                            <input type="email" className="form-control" name="email" id="email" placeholder="Correo electrónico" required/>
                        </div>
                        <div className="mb-3">
                            <input type="password" className="form-control" name="password" id="password" placeholder="Contraseña" required/>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary px-5 mb-5 w-100">Iniciar Sesión</button>
                        </div>
                        <div id="passwordForgot" className="form-text text-center mb-3 text-dark">¿Has olvidado tu contraseña?&nbsp;
                            <a href="/restorePassword" className="text-dark fw-bold">Restablecer</a>
                        </div>
                        <div id="emailHelp" className="form-text text-center mb-3 text-dark">¿No tienes cuenta todavía?&nbsp;
                            <a href="/signup" className="text-dark fw-bold">Registrate</a>
                        </div>
                    </form>
                </BlueCard>      
            </Layout>   
        ); 
    }
}

export default Login;