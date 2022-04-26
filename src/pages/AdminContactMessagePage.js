import React, { Component }  from 'react';
import { getContactForm, deleteContactFormMessage } from '../services/admin.services/contact.services';
import { AdminLayout, BlueCard } from '../component';
import moment from 'moment';
import { Modal } from 'react-bootstrap';

class AdminPage extends Component {
    constructor(props) {     
        super(props);
        this.showDeleteModal = this.showDeleteModal.bind(this);
        this.hideDeleteModal = this.hideDeleteModal.bind(this);
        this.deleteContactForm = this.deleteContactForm.bind(this);
        this.state = {
            loading: false,
            showDeleteModal: false,
            contactForms: [],
            selectedIndexContactForm: null
        }
    }

    async componentDidMount() {
        await this.setState({
            loading: false,
            contactForms: await getContactForm(this.props)
        });
    }


    async showDeleteModal(e) {
        await this.setState({
            showDeleteModal: true,
            selectedIndexContactForm: e.target.value
        });
    }

    async hideDeleteModal() {
        await this.setState({
            showDeleteModal: false,
            selectedIndexContactForm: null
        });
    }

    async deleteContactForm() {
        await this.setState({
            loading: true
        });


        await deleteContactFormMessage(this.props, this.state.contactForms[this.state.selectedIndexContactForm].id);

        this.hideDeleteModal();
        
        await this.setState({
            loading: false,
            contactForms: await getContactForm(this.props)
        });

    }


    render() {

        var tableBody = []
        for (var i = 0; i < this.state.contactForms.length; i++) {
            tableBody.push(
                <tr key={i}>
                    <th scope="row">{moment(this.state.contactForms[i].updatedAt).format("YYYY-MM-DD HH:mm")}</th>
                    <td>{this.state.contactForms[i].surname}</td>
                    <td>{this.state.contactForms[i].name}</td>
                    <td>{this.state.contactForms[i].email}</td>
                    <td>{this.state.contactForms[i].message}</td>
                    <td><button value={i} className='btn btn-danger' onClick={this.showDeleteModal}>Eliminar</button></td>
                </tr>
            );
        }

        return (
            <AdminLayout isHeader={true}>
                <BlueCard>
                    <div>
                        <h1>Mensajes del formulario de la página inicio</h1>
                    </div>
                </BlueCard>
                <div className="container table-responsive">
                    <table className="table table-striped">
                        <thead className="table-dark">
                            <tr>
                            <th scope="col">Fecha</th>
                            <th scope="col">Apellidos</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Email</th>
                            <th scope="col">Mensaje</th>
                            <th scope="col">Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableBody}
                        </tbody>
                    </table>
                    {tableBody.length > 0 || (
                        <h1>No hay ningún formulario de registro</h1>
                    )}
                </div>
                {this.state.selectedIndexContactForm && (
                    <Modal show={this.state.showDeleteModal} onHide={this.hideDeleteModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Eliminar mensaje</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>¿Estas seguro que deseas eliminar el mensaje de {this.state.contactForms[this.state.selectedIndexContactForm].name} {this.state.contactForms[this.state.selectedIndexContactForm].surname}?</p>
                        <p className="fw-bold mb-0">Mensaje:</p>
                        <p>{this.state.contactForms[this.state.selectedIndexContactForm].message}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary" onClick={this.hideDeleteModal}>
                            Cancelar
                        </button>
                        <button className="btn btn-danger" onClick={this.deleteContactForm}>
                            Eliminar
                        </button>
                    </Modal.Footer>
                </Modal>
                )}
            </AdminLayout>
        ); 
    }
}

export default AdminPage;