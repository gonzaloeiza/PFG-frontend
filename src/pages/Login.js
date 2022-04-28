import React, { Component }  from 'react';
import { login } from '../middleware/auth';
import { BlueCard, Layout } from '../component';

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
                            {/* <img src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png" className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3" width="50px" alt="profile" /> */}
                        </div>
                        <div className="mb-3">
                            <input type="email" className="form-control" name="email" id="email" placeholder="Correo electrónico" required/>
                        </div>
                        <div className="mb-3">
                            <input type="password" className="form-control" name="email" id="password" placeholder="Contraseña" required/>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary px-5 mb-5 w-100">Iniciar Sesión</button>
                        </div>
                        <div id="passwordForgot" className="form-text text-center mb-3 text-dark">¿Has olvidado tu contraseña?
                            <a href="/signup" className="text-dark fw-bold"> Restablecer</a>
                        </div>
                        <div id="emailHelp" className="form-text text-center mb-3 text-dark">¿No tienes cuenta todavía?
                            <a href="/signup" className="text-dark fw-bold"> Registrate</a>
                        </div>
                    </form>
                </BlueCard>      
            </Layout>   
        ); 
    }
}

export default Login;