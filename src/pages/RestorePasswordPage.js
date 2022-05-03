import { message } from 'antd';
import React, { Component }  from 'react';
import { BlueCard, Layout } from '../components';
import { restorePassword } from '../services/user.services';

class RestorePasswordPage extends Component {
    constructor(props) {     
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            loading: true,
            tokenId: "",
            password: "",
            confirmPassword: "",
        }
    }

    async componentDidMount() {
        await this.setState({
            loading: false,
            tokenId: this.props.match.params.tokenId
        });
    }

    async handleSubmit(e) {
        e.preventDefault();
        if (this.state.password === this.state.confirmPassword) {
            await restorePassword(this.props, this.state.tokenId, this.state.password);
        } else {
            message.error("Las contraseñas no coinciden");
        }

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
                            <input type="password" className="form-control" value={this.state.password} onChange={(e) => {this.setState({password: e.target.value})}} placeholder="Contraseña" required/>
                        </div>
                        <div className="mb-3">
                            <input type="password" className="form-control" value={this.state.confirmPassword} onChange={(e) => {this.setState({confirmPassword: e.target.value})}} placeholder="Repetir contraseña" required/>
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