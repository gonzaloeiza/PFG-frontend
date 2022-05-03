import React, { Component }  from 'react';
import { BlueCard, Layout } from '../components';

class RestorePasswordPage extends Component {
    constructor(props) {     
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            email: "",
            dni: "",
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        console.log(this.state);

        
    }

    render() {
        return (
            <Layout className="app-login" isHeader={true}>     
                   <BlueCard className="col-xs-12 col-sm-10 col-md-8 col-lg-7">
                    <form onSubmit={this.handleSubmit}>
                        <div className="text-center">
                            <h1 className="text-center mb-4 text-dark">Restablecer contraseña</h1>
                        </div>
                        <div className="mb-3">
                            <input type="email" className="form-control"value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} placeholder="Correo electrónico" required/>
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" value={this.state.dni} onChange={(e) => this.setState({dni: e.target.value})} placeholder="DNI" required/>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary px-5 mb-5 w-100">Restablecer contraseña</button>
                        </div>
                    </form>
                </BlueCard>
            </Layout>   
        ); 
    }
}

export default RestorePasswordPage;