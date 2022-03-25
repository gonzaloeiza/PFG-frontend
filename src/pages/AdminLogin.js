import React, { Component }  from 'react';
// import { login } from '../middleware/auth';
import { AdminLayout } from '../component';
import "../assets/css/pages/login.css";

class AdminLogin extends Component {
    constructor(props) {     
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            email: null,
            password: null,
        }
    }
       handleSubmit = (e) => {
            e.preventDefault();
            console.log(this.state);
            
        };

    render() {
        return (
            
            <AdminLayout className="app-login" isHeader={true}>
                <div className="container">
                    <div className="row justify-content-center pt-5">
                        <div className="col-xs-12 col-sm-10 col-md-8 col-lg-7">
                            <div className="card my-5"> 
                                <form className="card-body cardbody-color p-lg-5" onSubmit={this.handleSubmit}>
                                    <div className="text-center">
                                        <h1 className="text-center mb-4 text-dark">Panel de administración</h1>
                                    </div>
                                    <div className="mb-3">
                                        <input type="text" className="form-control" name="email" id="email" placeholder="Correo electrónico de administrador" onChange={(e) => this.setState({email: e.target.value})}/>
                                    </div>
                                    <div className="mb-3">
                                        <input type="password" className="form-control" name="email" id="password" placeholder="Contraseña" onChange={(e) => this.setState({password: e.target.value})}/>
                                    </div>
                                    <div className="text-center">
                                        <button type="submit" className="btn btn-color px-5 mb-5 w-100">Iniciar Sesión como administrador</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>   
        ); 
    }
}

export default AdminLogin;