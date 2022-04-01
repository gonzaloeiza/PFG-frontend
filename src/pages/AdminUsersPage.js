import React, { Component }  from 'react';
import { AdminLayout } from '../component';
import { getAllUsers } from '../services/admin.services/users.service'

class AdminUsersPage extends Component {
    constructor(props) {
        super(props);
        this.filterByFirstSurname = this.filterByFirstSurname.bind(this);
        this.viewUserProfile = this.viewUserProfile.bind(this);
        this.state =  {
            loading: true,
            nameFiler: "",
            users: [],
            tableUsers: []
        }
    }

    async componentDidMount() {
        const users = await getAllUsers(this.props);
        await this.setState({
            loading: false,
            users: users,
            tableUsers: users
        });
    }

    async filterByFirstSurname(e) {
         e.preventDefault();
        await this.setState({
            loading: true,
            tableUsers: this.state.users
        });

        const filter = this.state.nameFiler.trim().toLowerCase();
        if (filter.length > 0) {
            const a = this.state.tableUsers.filter(user => {
                if (user.name.trim().toLowerCase().includes(filter) || user.firstSurname.trim().toLowerCase().includes(filter) || user.secondSurname.trim().toLowerCase().includes(filter)) {
                    return user;
                }
                return null;
            });

            await this.setState({
                loading: false,
                tableUsers: a
            });

        } else {
            await this.setState({
                loading: false,
                tableUsers: this.state.users
            })
        }
        document.getElementById("nameFilter").value = this.state.nameFiler;
    }

    viewUserProfile(e) {
        const userId = e.target.value;
        const path = `/admin/users/${userId}`; 
        this.props.history.push(path);
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="center">
                    <div className="spinner-border" style={{width: "5rem", height: "5rem"}} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            );
        }

        var tableBody = [];
        for (var i = 0; i < this.state.tableUsers.length; i++) {
            tableBody.push(
                <tr key={i}>
                    <th scope="row">{this.state.tableUsers[i].firstSurname}</th>
                    <td>{this.state.tableUsers[i].secondSurname}</td>
                    <td>{this.state.tableUsers[i].name}</td>
                    <td>+{this.state.tableUsers[i].phoneNumber}</td>
                    <td><button className="btn btn-success" value={this.state.tableUsers[i].id} onClick={this.viewUserProfile}>Perfil completo</button></td>
                </tr>
            );
        }
        
        return (
            <AdminLayout isHeader={true}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xs-12 col-sm-12 col-md-10 col-lg-9">
                            <div className="card my-5">
                                <form className="card-body cardbody-color text-center" onSubmit={this.filterByFirstSurname}>
                                    <div className='row justify-content-center'>
                                        <h1>Usuarios</h1>
                                    </div>
                                    <div className='row justify-content-center'>
                                        <div className='col-md-8 mb-1'>
                                            <input
                                                className="form-control"
                                                type="text"
                                                id="nameFilter" 
                                                placeholder="Filtrar por nombre o apellidos"
                                                onChange={(e) => this.setState({nameFiler: e.target.value})}
                                            />
                                        </div>
                                        <div className='col-md-4 mb-1'>
                                            <button type="submit" className="btn btn-primary" >Filtrar busqueda</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container table-responsive">
                    <table className="table table-striped">
                        <thead className="table-dark">
                            <tr>
                            <th scope="col">Primer Apellido</th>
                            <th scope="col">Segundo apellido</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">número de teléfono</th>
                            <th scope="col">ficha completa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableBody}
                        </tbody>
                    </table>
                    {tableBody.length > 0 || (
                        <h1>No hay usuarios registrados</h1>
                    )}
                </div>
            </AdminLayout>   
        );
    }
}

export default AdminUsersPage;