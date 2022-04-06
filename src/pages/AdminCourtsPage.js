import React, { Component }  from 'react';
import { AdminLayout, BlueCard, Loading } from '../component';
import { getCourts } from '../services/admin.services/bookings.service'
import { updateCourtData, deleteCourt } from '../services/admin.services/courts.services'
import moment from 'moment';
import { Modal } from 'react-bootstrap';

class AdminCourtsPage extends Component {
    constructor(props) {
        super(props);
        this.showModificationModal = this.showModificationModal.bind(this);
        this.hideModificationModal = this.hideModificationModal.bind(this);
        this.showDeleteModal = this.showDeleteModal.bind(this);
        this.hideDeleteModal = this.hideDeleteModal.bind(this);
        this.modifyCourtData = this.modifyCourtData.bind(this);
        this.deleteCourt = this.deleteCourt.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeDescription = this.changeDescription.bind(this);
        this.changeBookReservationTime = this.changeBookReservationTime.bind(this);
        this.changePriceWithoutLight = this.changePriceWithoutLight.bind(this);
        this.changePriceWithLight = this.changePriceWithLight.bind(this);
        this.changeNumberOfDaysToBookBefore = this.changeNumberOfDaysToBookBefore.bind(this);
        this.changeNumberOfHoursToCancelCourt = this.changeNumberOfHoursToCancelCourt.bind(this);
        this.changeOpensAt = this.changeOpensAt.bind(this);
        this.changeClosesAt = this.changeClosesAt.bind(this);
        this.state =  {
            loading: true,
            showModificationModal: false,
            showDeleteModal: false,
            courts: [],
            selectedCourtIndexToModify: null,
            selectedCourtIndexToDelete: null,
            courtModifiedData: null
        }
    }

    async componentDidMount() {
        await this.setState({
            loading: false,
            courts: await getCourts(this.props)
        });
    }


    async showModificationModal(e) {
        await this.setState({
            showModificationModal: true,
            selectedCourtIndexToModify: e.target.value,
            courtModifiedData: this.state.courts[e.target.value]
        });
    }


    async hideModificationModal(e) {
        await this.setState({
            showModificationModal: false,
            selectedCourtIndexToModify: null,
            courtModifiedData: null,
        });
    }

    async showDeleteModal (e) {
        await this.setState({
            showDeleteModal: true,
            selectedCourtIndexToDelete: e.target.value,
        });
    }

    async hideDeleteModal (e) {
        await this.setState({
            showDeleteModal: false,
            selectedCourtIndexToDelete: null,
        });
    }

    async changeName(e) {
        var courtModifiedData = {...this.state.courtModifiedData};
        courtModifiedData.name = e.target.value;
        await this.setState({
            courtModifiedData: courtModifiedData
        });
    }

    async changeDescription(e) {
        var courtModifiedData = {...this.state.courtModifiedData};
        courtModifiedData.description = e.target.value;
        await this.setState({
            courtModifiedData: courtModifiedData
        });
    }

    async changeBookReservationTime(e) {
        var courtModifiedData = {...this.state.courtModifiedData};
        courtModifiedData.bookReservationTime = e.target.value;
        await this.setState({
            courtModifiedData: courtModifiedData
        });
    }

    async changePriceWithoutLight(e) {
        var courtModifiedData = {...this.state.courtModifiedData};
        courtModifiedData.priceWithoutLight = e.target.value;
        await this.setState({
            courtModifiedData: courtModifiedData
        });
    }

    async changePriceWithLight(e) {
        var courtModifiedData = {...this.state.courtModifiedData};
        courtModifiedData.priceWithLight = e.target.value;
        await this.setState({
            courtModifiedData: courtModifiedData
        });
    }

    async changeNumberOfDaysToBookBefore(e) {
        var courtModifiedData = {...this.state.courtModifiedData};
        courtModifiedData.numberOfDaysToBookBefore = e.target.value;
        await this.setState({
            courtModifiedData: courtModifiedData
        });
    }

    async changeNumberOfHoursToCancelCourt(e) {
        var courtModifiedData = {...this.state.courtModifiedData};
        courtModifiedData.numberOfHoursToCancelCourt = e.target.value;
        await this.setState({
            courtModifiedData: courtModifiedData
        });
    }

    async changeOpensAt(e) {
        var courtModifiedData = {...this.state.courtModifiedData};
        courtModifiedData.opensAt = e.target.value;
        await this.setState({
            courtModifiedData: courtModifiedData
        });
    }

    async changeClosesAt(e) {
        var courtModifiedData = {...this.state.courtModifiedData};
        courtModifiedData.closesAt = e.target.value;
        await this.setState({
            courtModifiedData: courtModifiedData
        });
    }

    async modifyCourtData(e) {
        e.preventDefault();
        
        await this.setState({
            loading: true
        });

        await updateCourtData(this.props, this.state.courtModifiedData);
        
        this.hideModificationModal();

        this.setState({
            loading: false,
            courts: await getCourts(this.props)
        });
        
        
    }

    async deleteCourt(e) {
        await this.setState({
            loading: true
        });

        await deleteCourt(this.props, this.state.courts[this.state.selectedCourtIndexToDelete].id);
        
        this.hideDeleteModal();

        await this.setState({
            loading:false,
            courts: await getCourts(this.props)
        });
        
    }

    render() {
        if (this.state.loading) {
            return (
               <Loading />
            );
        }


        var courtsTable = []
        for (var i = 0; i < this.state.courts.length; i++) {
            const opensAt = moment(this.state.courts[i].opensAt, "HH:mm:SS");
            const closesAt = moment(this.state.courts[i].closesAt, "HH:mm:SS");
            courtsTable.push(
                <div key={i} className="mb-4 col-xs-12 col-sm-6 col-md-6 col-lg-4">
                    <div className="card bg-light border-dark">
                        <div className="card-header bg-dark text-center">
                            <div className="card-text row">
                                <h4 className="col fw-bold text-white">{this.state.courts[i].name}</h4>
                            </div>
                        </div>
                        <div className="card-body cardbody">
                            <ul>
                                <li>
                                    <div className="row align-items-end">
                                        <p className="col-8 mb-1 fw-bold">Hora de apertura:</p>
                                        <p className="col-4 mb-1 text-end fw-bold">{opensAt.format("HH:mm")}</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="row align-items-end">
                                        <p className="col-8 mb-1 fw-bold">Hora de cierre:</p>
                                        <p className="col-4 mb-1 text-end fw-bold">{closesAt.format("HH:mm")}</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="row align-items-end">
                                        <p className="col-8 mb-1 fw-bold">Precio con luz:</p>
                                        <p className="col-4 mb-1 text-end fw-bold">{this.state.courts[i].priceWithLight} €</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="row align-items-end">
                                        <p className="col-8 mb-1 fw-bold">Precio sin luz:</p>
                                        <p className="col-4 mb-1 text-end fw-bold">{this.state.courts[i].priceWithoutLight} €</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="row align-items-end">
                                        <p className="col-8 mb-1 fw-bold">Duración de reserva:</p>
                                        <p className="col-4 mb-1 text-end fw-bold">{this.state.courts[i].bookReservationTime} mins</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="row align-items-end">
                                        <p className="col-8 mb-1 fw-bold">Hasta cuantas horas antes se puede cancelar:</p>
                                        <p className="col-4 mb-1 text-end fw-bold">{this.state.courts[i].numberOfHoursToCancelCourt} horas</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="card-footer card-courts">
                            <div className="row">
                                <div className="col-xs-12 col-sm-6 my-2 text-center">
                                    <button value={i} className="btn btn-danger" onClick={(e) => this.showDeleteModal(e)}>Eliminar</button>
                                </div>
                                <div className="col-xs-12 col-sm-6 my-2 text-center">
                                    <button value={i} className="btn btn-primary" onClick={(e) => this.showModificationModal(e)}>Modificar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }


        return (
            <AdminLayout isHeader={true} username={this.state.username}>
                <BlueCard>
                    <h1>Pistas</h1>
                    <div className="row justify-content-center">
                        <button className="col-sm-4 col-md-5 col-lg-4 col-xl-4 btn btn-primary">Crear pista</button>
                    </div>
                </BlueCard>
                <div className="container">
                    <div className="row justify-content-start">
                        {courtsTable}
                    </div>
                </div>

                {this.state.selectedCourtIndexToModify !== null && (
                        <Modal size="lg" centered show={this.state.showModificationModal} onHide={this.hideModificationModal}>
                            <form onSubmit={this.modifyCourtData}> 
                                <Modal.Header closeButton>
                                    <Modal.Title>Modificar pista</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                        <div className="mx-1 mb-1">
                                            <label className='my-1'>Nombre de la pista *</label>
                                            <input type="text" className="form-control" value={this.state.courtModifiedData.name} onChange={this.changeName} placeholder="Pista DAM" />
                                        </div>
                                        <div className="mx-1 mb-1">
                                            <label className='my-1'>Descripción</label>
                                            <textarea  type="text" className="form-control" value={this.state.courtModifiedData.description} onChange={this.changeDescription} placeholder="La pista es descubierta y tiene paredes de cristal..." />
                                        </div>
                                        <div className="mx-1 mb-1">
                                            <label className='my-1'>Duración en minutos de la reserva</label>
                                            <input type="number" step="1" className="form-control" value={this.state.courtModifiedData.bookReservationTime} onChange={this.changeBookReservationTime} placeholder="90" />
                                        </div>
                                        <div className="mx-1 mb-1">
                                            <label className='my-1'>Precio con luz</label>
                                            <input type="number" step="1" className="form-control" value={this.state.courtModifiedData.priceWithLight} onChange={this.changePriceWithLight} placeholder="40" />
                                        </div>
                                        <div className="mx-1 mb-1">
                                            <label className='my-1'>Precio sin luz</label>
                                            <input type="number" step="1" className="form-control" value={this.state.courtModifiedData.priceWithoutLight} onChange={this.changePriceWithoutLight} placeholder="35" />
                                        </div>
                                        <div className="mx-1 mb-1">
                                            <label className='my-1'>Con cuantos días de antelacion se puede reservar</label>
                                            <input type="number" step="1" className="form-control" value={this.state.courtModifiedData.numberOfDaysToBookBefore} onChange={this.changeNumberOfDaysToBookBefore} placeholder="2" />
                                        </div>
                                        <div className="mx-1 mb-1">
                                            <label className='my-1'>Hasta cuantas horas antes se puede cancelar (anular) la pista</label>
                                            <input type="number" step="1" className="form-control" value={this.state.courtModifiedData.numberOfHoursToCancelCourt} onChange={this.changeNumberOfHoursToCancelCourt} placeholder="6" />
                                        </div>
                                        <div className="mx-1 mb-1">
                                            <label className='my-1'>Hora de apertura de la pista</label>  
                                            <input type="time" className="form-control" value={this.state.courtModifiedData.opensAt} onChange={this.changeOpensAt} />
                                        </div>
                                        <div className="mx-1 mb-1">
                                            <label className='my-1'>Última hora a la que se puede empezar a jugar</label>  
                                            <input type="time" className="form-control" value={this.state.courtModifiedData.closesAt} onChange={this.changeClosesAt}/>
                                        </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <button className="btn btn-light" onClick={this.hideModificationModal}>
                                        Cancelar
                                    </button>
                                    <button className="btn btn-primary" type="submit">
                                        Modificar
                                    </button>
                                </Modal.Footer>
                            </form>
                        </Modal>
                )}
                {this.state.selectedCourtIndexToDelete !== null && (

                    <Modal show={this.state.showDeleteModal} onHide={this.hideDeleteModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Eliminar pista</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>¿Seguro que deseas eliminar la pista: {this.state.courts[this.state.selectedCourtIndexToDelete].name}?</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="btn btn-light" onClick={this.hideDeleteModal}>
                                Cancelar
                            </button>
                            <button className="btn btn-danger" onClick={this.deleteCourt}>
                                Eliminar
                            </button>
                        </Modal.Footer>
                    </Modal>
                )}
            </AdminLayout>
        );
    }
}

export default AdminCourtsPage;