import React, { Component }  from 'react';
import { adminLogin } from '../middleware/adminAuth';
import { AdminLayout, BlueCard } from '../component';

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
            adminLogin(this.props, this.state.email, this.state.password);
        };

    render() {
        return (     
            <AdminLayout className="app-login" isHeader={true}>
                <BlueCard className="col-xs-12 col-sm-10 col-md-8 col-lg-7">
                    <form onSubmit={this.handleSubmit}>
                        <div className="text-center">
                            <h1 className="text-center mb-4 text-dark">Panel de administración</h1>
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" name="email" id="email" placeholder="Correo electrónico de administrador" onChange={(e) => this.setState({email: e.target.value})} required/>
                        </div>
                        <div className="mb-3">
                            <input type="password" className="form-control" name="email" id="password" placeholder="Contraseña" onChange={(e) => this.setState({password: e.target.value})} required/>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary px-5 mb-5 w-100">Iniciar Sesión como administrador</button>
                        </div>
                    </form>
                </BlueCard>
            </AdminLayout>   
        ); 
    }
}

export default AdminLogin;