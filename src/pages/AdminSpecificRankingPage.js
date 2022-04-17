import React, { Component }  from 'react';
import { Modal } from 'react-bootstrap';
import { AdminLayout, BlueCard, Loading } from '../component';
import { addPartnerToRanking, deleteRanking, getRankingData, startRanking } from '../services/admin.services/rankings.services';
import moment from "moment";
import { getAllUsers } from '../services/admin.services/users.services';

class AdminSpecificRankingPage extends Component {
    constructor(props) {     
        super(props);
        this.showAddPartnerModal = this.showAddPartnerModal.bind(this);
        this.hideAddPartnerModal = this.hideAddPartnerModal.bind(this);
        this.showStartRankingModal = this.showStartRankingModal.bind(this);
        this.hideStartRankingModal = this.hideStartRankingModal.bind(this);
        this.showDeleteRankingModal = this.showDeleteRankingModal.bind(this);
        this.hideDeleteRankingModal = this.hideDeleteRankingModal.bind(this);
        this.filterUsersToAdd = this.filterUsersToAdd.bind(this);
        this.addUserToPartner = this.addUserToPartner.bind(this);
        this.addPartnerToRanking = this.addPartnerToRanking.bind(this);
        this.startRanking = this.startRanking.bind(this);
        this.deleteRanking = this.deleteRanking.bind(this);
        this.state = {
            loading: true,
            showAddPartnerModal: false,
            showStartRankingModal: false,
            showDeleteRankingModal: false,
            filterUsersToAdd: "",
            partnerOne: null,
            partnerTwo: null,
            usersFilter: [],
            ranking: [],
            allUsers: [],
        }
    }

    async componentDidMount() {
        await this.setState({
            loading: false,
            ranking: await getRankingData(this.props, this.props.match.params.rankingId),
            allUsers: await getAllUsers(this.props)
        });
    }

    async showAddPartnerModal() {
        await this.setState({
            showAddPartnerModal: true
        });
    }

    async hideAddPartnerModal() {
        await this.setState({
            showAddPartnerModal: false,
            filterUsersToAdd: "",
            usersFilter: [],
            partnerOne: null,
            partnerTwo: null,
        });
    }

    async showStartRankingModal() {
        await this.setState({
            showStartRankingModal: true
        });
    }

    async hideStartRankingModal() {
        await this.setState({
            showStartRankingModal: false
        });
    }

    async showDeleteRankingModal() {
        await this.setState({
            showDeleteRankingModal: true
        });
    }
    async hideDeleteRankingModal() {
        await this.setState({
            showDeleteRankingModal: false
        });    
    }


    async filterUsersToAdd() {
        const filter = this.state.filterUsersToAdd.trim().toLowerCase();
        if (filter.length > 0) {
            const a = this.state.allUsers.filter(user => {
                if (user.name.trim().toLowerCase().includes(filter) || 
                user.firstSurname.trim().toLowerCase().includes(filter) || 
                user.secondSurname.trim().toLowerCase().includes(filter) || 
                user.email.trim().toLowerCase().includes(filter) ||
                user.phoneNumber.trim().toLowerCase().includes(filter)
                ) {
                    return user;
                }
                return null;
            });
            await this.setState({
                usersFilter: a
            });
        } else {
            await this.setState({
                filterUsersToAdd: "",
                usersFilter: [],
            });
        }
    }

    async addUserToPartner(e) {
        const user = this.state.usersFilter[e.target.value];

        if (this.state.partnerOne === null) {
            await this.setState({
                partnerOne: user
            });
        } else if (this.state.partnerTwo === null) {
            await this.setState({
                partnerTwo: user
            });
        }
    }

    async addPartnerToRanking() {
        await this.setState({
            loading: true
        });

        await addPartnerToRanking(this.props, this.state.ranking.id, this.state.partnerOne.id, this.state.partnerTwo.id);
        
        this.hideAddPartnerModal();

        await this.setState({
            loading: false,
            ranking: await getRankingData(this.props, this.state.ranking.id),
            allUsers: await getAllUsers(this.props)
        });
    }

    async startRanking() {
        await this.setState({
            loading: true
        });

        await startRanking(this.props, this.state.ranking.id);
        
        this.hideStartRankingModal();
        
        await this.setState({
            loading: false,
            ranking: await getRankingData(this.props, this.state.ranking.id),
            allUsers: await getAllUsers(this.props)
        });
    }

    async deleteRanking() {
        this.hideDeleteRankingModal();
        const response = await deleteRanking(this.props, this.state.ranking.id);
        if (response) {
            this.props.history.push("/admin/rankings");
        }
    }


    render() {
        if (this.state.loading) {
            return (
                <Loading />
            );
        }

        var tableBody = [];
        for (var i = 0; i < this.state.ranking.partners.length; i++) {
            tableBody.push(
                <tr key={i}>
                    <td>{this.state.ranking.partners[i]["playerOne.email"]}</td>
                    <td>{this.state.ranking.partners[i]["playerOne.name"]} {this.state.ranking.partners[i]["playerOne.firstSurname"]}</td>
                    <td>{this.state.ranking.partners[i]["playerTwo.email"]}</td>
                    <td>{this.state.ranking.partners[i]["playerTwo.name"]} {this.state.ranking.partners[i]["playerTwo.firstSurname"]}</td>
                </tr>
            );
        }

        var usersSearch = [];
        for (i = 0; i < this.state.usersFilter.length; i++) {
            usersSearch.push(
                <tr key={i}>
                    <td>{this.state.usersFilter[i].firstSurname} {this.state.usersFilter[i].secondSurname}</td>
                    <td>{this.state.usersFilter[i].name}</td>
                    <td>{this.state.usersFilter[i].email}</td>
                    <td>+{this.state.usersFilter[i].phoneNumber}</td>
                    <td><button className='btn btn-success' value={i} onClick={this.addUserToPartner}>Añadir</button></td>
                </tr>
            );
        }


        var classificationTable = [];
        var counter = 0;
        for (i = 0; i < this.state.ranking.matches.length / 3; i++) {
            var groupBody = [];
            for (var j = 0; j < 3; j++) {
                groupBody.push(
                    <tr key={counter}>
                        <td>
                            {this.state.ranking.matches[counter]["partnerOne.playerOne.name"]}&#160;
                            {this.state.ranking.matches[counter]["partnerOne.playerOne.firstSurname"]}&#160;y&#160;
                            {this.state.ranking.matches[counter]["partnerOne.playerTwo.name"]}&#160;
                            {this.state.ranking.matches[counter]["partnerOne.playerTwo.firstSurname"]}&#160;
                        </td>
                        <td className='fw-bold'>vs</td>
                        <td>
                            {this.state.ranking.matches[counter]["partnerTwo.playerOne.name"]}&#160;
                            {this.state.ranking.matches[counter]["partnerTwo.playerOne.firstSurname"]}&#160;y&#160;
                            {this.state.ranking.matches[counter]["partnerTwo.playerTwo.name"]}&#160;
                            {this.state.ranking.matches[counter]["partnerTwo.playerTwo.firstSurname"]}&#160;
                        </td>
                        {this.state.ranking.matches[i].partnerOneWins === null && (
                            <td className="text-danger">Sin jugar</td>
                        )}
                        {this.state.ranking.matches[i].partnerOneWins === 1 && (
                            <td className="text-success">Ha ganado la pareja 1</td>
                        )}
                        {this.state.ranking.matches[i].partnerOneWins === 1 && (
                            <td className="text-success">Ha ganado la pareja 2</td>
                        )}
                    </tr>
                );
                counter++;
            }
            classificationTable.push(
                <div key={i} className="mt-2">
                    <h3>Grupo {i + 1}</h3>
                    <div className="container table-responsive">
                        <table className="table table-striped">
                            <thead className="table-dark">
                                <tr>
                                    <th scope="col">Pareja 1</th>
                                    <th scope="col"></th>
                                    <th scope="col">Pareja 2</th>
                                    <th scope="col">Estado del partido</th>
                                </tr>
                            </thead>
                            <tbody>
                                {groupBody}
                            </tbody>
                        </table>
                    </div> 
                </div>
            );
        }

        return (     
            <AdminLayout isHeader={true}>
                <BlueCard>
                    <h1>{this.state.ranking.name}</h1>
                    <p className='mt-3'>Descripción: {this.state.ranking.description}</p>
                    <p>Creado: {moment(this.state.ranking.createdAt).format("YYYY-MM-DD HH:mm")}</p>
                </BlueCard>
                {this.state.ranking.registrationOpen ? (
                    <>
                        <div className='row justify-content-around'>
                            <div className='col-xs-12 col-sm-12 col-md-12 col-lg-8'>
                                <BlueCard className="" withoutContainer={true}>
                                    <h1 className='mb-4'>Parejas Apuntadas</h1>
                                    <div className='text-end'>
                                        <button className='btn btn-success mb-4' onClick={this.showAddPartnerModal}>Añadir pareja</button>
                                    </div>
                                    <div className="container table-responsive">
                                        <table className="table table-striped">
                                            <thead className="table-dark">
                                                <tr>
                                                    <th scope="col">Email pareja 1</th>
                                                    <th scope="col">Nombre pareja 1</th>
                                                    <th scope="col">Email pareja 2</th>
                                                    <th scope="col">Nombre pareja 2</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tableBody}
                                            </tbody>
                                        </table>
                                    </div>
                                </BlueCard>
                            </div>
                            <div className='col-xs-12 col-sm-12 col-md-12 col-lg-3'>
                                <BlueCard className="" withoutContainer={true}>
                                    <h1>Opciones</h1>
                                    <div className='my-2'>
                                       <button className='btn btn-primary' onClick={this.showStartRankingModal}>Comenzar ranking</button>
                                    </div>
                                    <div>
                                        <button className='btn btn-danger' onClick={this.showDeleteRankingModal}>Eliminar ranking</button>
                                    </div>
                                </BlueCard>
                            </div>
                        </div>
                        <Modal centered size="xl" show={this.state.showAddPartnerModal} onHide={this.hideAddPartnerModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>Añadir nueva pareja</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className='row'>
                                    <div className='col-md-8'>
                                        <input 
                                            className='col form-control mb-2'
                                            value={this.state.filterUsersToAdd} 
                                            onChange={(e) => this.setState({filterUsersToAdd: e.target.value})} 
                                            type="text" 
                                            placeholder='Filtrar por nombre, apellidos, email o numero de telefono'
                                        />
                                        <div className='col text-center'>
                                            <button className='btn btn-primary mb-2' onClick={this.filterUsersToAdd}>Buscar</button>
                                        </div>
                                        <div className="container table-responsive">
                                        <table className="table table-striped">
                                        <thead className="table-dark">
                                            <tr>
                                                <th scope="col">Apellidos</th>
                                                <th scope="col">Nombre</th>
                                                <th scope="col">email</th>
                                                <th scope="col">Teléfono</th>
                                                <th scope="col">Añadir</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {usersSearch}
                                        </tbody>
                                    </table>
                                        </div>
                                    </div>
                                    <div className='col-md-4'>
                                        <ul>
                                            {this.state.partnerOne !== null ? (
                                                <li>Pareja 1: {this.state.partnerOne.name} {this.state.partnerOne.firstSurname} {this.state.partnerOne.secondSurname}</li>
                                            ) : (
                                                <li>Pareja 1: Sin seleccionar</li>
                                            )}
                                            {this.state.partnerTwo !== null ? (
                                                <li>Pareja 2: {this.state.partnerTwo.name} {this.state.partnerTwo.firstSurname} {this.state.partnerTwo.secondSurname}</li>
                                            ) : (
                                                <li>Pareja 2: Sin seleccionar</li>
                                            )}
                                        </ul>
                                    </div>
                                </div>

                            </Modal.Body>
                            <Modal.Footer>
                                <button className="btn btn-secondary me-2" onClick={this.hideAddPartnerModal}>
                                    Cancelar
                                </button>
                                <button className='btn btn-success' onClick={this.addPartnerToRanking}>
                                    Añadir pareja
                                </button>
                            </Modal.Footer>
                        </Modal>
                    </>
                ) : (
                    <div className='row justify-content-around'>
                        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-8'>
                            <BlueCard className="" withoutContainer={true}>
                                <h1>Partidos a jugar</h1>
                                {classificationTable}
                            </BlueCard>
                        </div>
                        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-3'>
                            <BlueCard className="" withoutContainer={true}>
                                <h1 className='mb-2'>Opciones</h1>
                                <div className='mb-2'>
                                    <button className='btn btn-primary' onClick={this.showDeleteRankingModal}>Generar nueva jornada</button>
                                </div>
                                <div>
                                    <button className='btn btn-danger' onClick={this.showDeleteRankingModal}>Eliminar ranking</button>
                                </div>
                            </BlueCard>
                        </div>
                    </div>
                )}
                <Modal show={this.state.showStartRankingModal} onHide={this.hideStartRankingModal}>
                    <Modal.Header>
                        <Modal.Title>Comenzar ranking</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        ¿Quieres comenzar el ranking?, no podrás deshacer esta opción.
                    </Modal.Body>
                    <Modal.Footer>
                        <button className='btn btn-secondary' onClick={this.hideStartRankingModal}>
                            Canelar
                        </button>
                        <button className='btn btn-primary' onClick={this.startRanking}>
                            Comenzar
                        </button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.showDeleteRankingModal} onHide={this.hideDeleteRankingModal}>
                    <Modal.Header>
                        <Modal.Title>Eliminar ranking</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        ¿Quieres eliminar el ranking?, no podrás deshacer esta opción.
                    </Modal.Body>
                    <Modal.Footer>
                        <button className='btn btn-secondary' onClick={this.hideDeleteRankingModal}>
                            Canelar
                        </button>
                        <button className='btn btn-danger' onClick={this.deleteRanking}>
                            Eliminar
                        </button>
                    </Modal.Footer>
                </Modal>
            </AdminLayout>
        ); 
    }
}

export default AdminSpecificRankingPage;