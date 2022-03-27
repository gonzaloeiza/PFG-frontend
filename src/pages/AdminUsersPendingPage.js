import React, { Component }  from 'react';
import { AdminLayout } from '../component';
import { Modal } from 'react-bootstrap';
import { getPendingUsers, acceptRequest, rejectRequest } from '../services/admin.services/users.service'
import moment from 'moment';

class AdminUsersPendingPage extends Component {
    constructor(props) {
        super(props);
        this.showConfirmationModal = this.showConfirmationModal.bind(this);
        this.hideConfirmationModal = this.hideConfirmationModal.bind(this);
        this.rejectRequest = this.rejectRequest.bind(this);
        this.acceptRequest = this.acceptRequest.bind(this);
        this.state =  {
            loading: true,
            showConfirmationModal: false,
            pendingUsers: [],
            selectedUserIndex: null,
            isCancel: null //if isCancel===false accept request
        }
    }

    async componentDidMount() {
        const pendingUsers = await getPendingUsers(this.props);
        await this.setState({
            loading: false,
            pendingUsers: pendingUsers
        });
    }

    async showConfirmationModal(e, isCancel) {
        await this.setState({
            showConfirmationModal: true,
            isCancel: isCancel,
            selectedUserIndex: e.target.value
        });
    }
    
    async hideConfirmationModal() {
        await this.setState({
            showConfirmationModal: false,
            isCancel: null,
            selectedUserIndex: null
        });
    }

    async rejectRequest() {
        await this.setState({
            loading: true
        });

        await rejectRequest(this.props, this.state.pendingUsers[this.state.selectedUserIndex].id);
        this.hideConfirmationModal();
        const pendingUsers = await getPendingUsers(this.props);
        await this.setState({
            loading: false,
            pendingUsers: pendingUsers,
        });
    }

    async acceptRequest() {
        await this.setState({
            loading: true
        });

        await acceptRequest(this.props, this.state.pendingUsers[this.state.selectedUserIndex].id);
        this.hideConfirmationModal();
        const pendingUsers = await getPendingUsers(this.props);
        await this.setState({
            loading: false,
            pendingUsers: pendingUsers,
        });
    }

    render() {

        var tableBody = []
        for (var i = 0; i < this.state.pendingUsers.length; i++) {
            const time = moment(this.state.pendingUsers[i].updatedAt);
            tableBody.push(
                <tr key={i}>
                    <th scope="row">{time.format("YYYY-MM-DD")}</th>
                    <td>{this.state.pendingUsers[i].name}</td>
                    <td>{this.state.pendingUsers[i].firstSurname}</td>
                    <td>{this.state.pendingUsers[i].email}</td>
                    <td>{this.state.pendingUsers[i].dni}</td>
                    <td>+{this.state.pendingUsers[i].phoneNumber}</td>
                    <td><button value={i} className="btn btn-success" onClick={(e) => this.showConfirmationModal(e, true)}>Aceptar</button></td>
                    <td><button value={i} className="btn btn-danger" onClick={(e) => this.showConfirmationModal(e, false)}>Rechazar</button></td>
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
                                    <h1>Solicitudes de registro</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container table-responsive">
                    <table className="table table-striped">
                        <thead className="table-dark">
                            <tr>
                            <th scope="col">Fecha de solicitud</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Primer apellido</th>
                            <th scope="col">email</th>
                            <th scope="col">DNI</th>
                            <th scope="col">número de teléfono</th>
                            <th scope="col">Aceptar solicitud</th>
                            <th scope="col">Rechazar solicitud</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableBody}
                        </tbody>
                    </table>
                    {tableBody.length > 0 || (
                        <h1>No hay solicitudes de registro pendientes</h1>
                    )}
                </div>
                {this.state.selectedUserIndex !== null && (
                    <Modal show={this.state.showConfirmationModal} onHide={this.hideConfirmationModal}>
                        {this.state.isCancel ? (
                        <>
                        <Modal.Header closeButton>
                            <Modal.Title>Aceptar solicitud de registro</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ul>
                                <li>
                                    Nombre: 
                                    {this.state.pendingUsers[this.state.selectedUserIndex].name}
                                    &nbsp;{/* white space */}
                                    {this.state.pendingUsers[this.state.selectedUserIndex].firstSurname}
                                </li>
                                <li>{this.state.pendingUsers[this.state.selectedUserIndex].email}</li>
                                <li>
                                    DNI: {this.state.pendingUsers[this.state.selectedUserIndex].dni}
                                </li>
                                <li>Teléfono: +{this.state.pendingUsers[this.state.selectedUserIndex].phoneNumber}</li>
                            </ul>
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="btn btn-light" onClick={this.hideConfirmationModal}>
                                Cancelar
                            </button>
                            <button className="btn btn-success" onClick={this.acceptRequest}>
                                Aceptar solicitud
                            </button>
                        </Modal.Footer>
                        </>
                        ) : (
                        <>
                        <Modal.Header closeButton>
                            <Modal.Title>Rechazar solicitud de registro</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ul>
                                <li>
                                    Nombre: 
                                    {this.state.pendingUsers[this.state.selectedUserIndex].name}
                                    &nbsp;{/* white space */}
                                    {this.state.pendingUsers[this.state.selectedUserIndex].firstSurname}
                                </li>
                                <li>{this.state.pendingUsers[this.state.selectedUserIndex].email}</li>
                                <li>
                                    DNI: {this.state.pendingUsers[this.state.selectedUserIndex].dni}
                                </li>
                                <li>Teléfono: {this.state.pendingUsers[this.state.selectedUserIndex].phoneNumber}</li>
                            </ul>
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="btn btn-light" onClick={this.hideConfirmationModal}>
                                Cancelar
                            </button>
                            <button className="btn btn-danger" onClick={this.rejectRequest}>
                                Rechazar solicitud
                            </button>
                        </Modal.Footer>
                        </>
                        )}
                    </Modal>
                )}
            </AdminLayout>   
        );
    }
}

export default AdminUsersPendingPage;