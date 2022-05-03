import React, { Component }  from 'react';
import { BlueCard, Layout } from '../components';
import { requestRestorePassword } from '../services/user.services';

class RequestRestorePasswordPage extends Component {
    constructor(props) {     
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            email: "",
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        await requestRestorePassword(this.props, this.state.email);
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
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary px-5 mb-5 w-100">Enviar correo</button>
                        </div>
                    </form>
                </BlueCard>
            </Layout>   
        ); 
    }
}

export default RequestRestorePasswordPage;