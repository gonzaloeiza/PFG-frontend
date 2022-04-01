import React, { Component }  from 'react';
import { AdminLayout } from '../component';
import { getAllUsers } from '../services/admin.services/users.service'

class AdminUsersPage extends Component {
    constructor(props) {
        super(props);
        this.filterByFirstSurname = this.filterByFirstSurname.bind(this);
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
                    <td><button className="btn btn-success">Perfil completo</button></td>
                </tr>
            );
        }
        
        return (
            <AdminLayout isHeader={true}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xs-12 col-sm-12 col-md-10 col-lg-9">
                            <div className="card my-5">
                                <div className="card-body cardbody-color text-center">
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
                                            <button className="btn btn-primary" onClick={this.filterByFirstSurname}>Filtrar busqueda</button>
                                        </div>
                                    </div>
                                </div>
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