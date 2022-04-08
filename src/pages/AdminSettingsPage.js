import React, { Component }  from 'react';
import { AdminLayout, BlueCard, Loading } from '../component';
import { updateAdminPassword } from '../services/admin.services/auth.service'


class AdminSettingsPage extends Component {
    constructor(props) {     
        super(props);
        this.changePassword = this.changePassword.bind(this);
        this.state = {
            loading: true
        }
    }
    async componentDidMount() {
        await this.setState({
            loading: false,
        });
    }

    async changePassword(e) {
        e.preventDefault();
        const password = document.getElementById("password").value;
        const repeatPassword = document.getElementById("repeatPassword").value;
        
        await this.setState({
            loading: true
        });

        if (password === repeatPassword) {
            await updateAdminPassword(this.props, password);
        }
        await this.setState({
            loading: false
        });
    }

    render() {
        if (this.state.loading) {
            return (
                <Loading />
            );
        }

        return (
            <AdminLayout isHeader={true}>
                <BlueCard>
                    <div>
                        <h1>Ajustes</h1>
                    </div>
                </BlueCard>
                    <div className="row justify-content-around">
                        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-5'>
                            <BlueCard className="" withoutContainer={true}>
                                <h3>Cambiar contraseña</h3>
                                <form onSubmit={this.changePassword}>
                                    <div className="mt-2 mb-2">
                                        <input type="password" className="form-control" disabled={this.state.disableEdit} id="password" placeholder="Nueva contraseña" required/>
                                    </div>
                                    <div className="mb-3">
                                        <input type="password" className="form-control" disabled={this.state.disableEdit} id="repeatPassword" placeholder="Repetir nueva contraseña" required/>
                                    </div>
                                    <div className="mb-1">
                                        <button type="submit" className="btn btn-primary">Cambiar contraseña</button>
                                    </div>
                                </form>
                            </BlueCard>
                        </div>
                    </div>
            </AdminLayout> 
        ); 
    }
}

export default AdminSettingsPage;