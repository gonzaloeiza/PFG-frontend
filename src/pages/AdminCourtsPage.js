import React, { Component }  from 'react';
import { AdminLayout, BlueCard, Loading } from '../components';
import { getCourtsData, updateCourtData, deleteCourt, createNewCourt, uploadPicture } from '../services/admin.services/courts.services'
import moment from 'moment';
import { Modal } from 'react-bootstrap';
import { backendURL } from '../config';
import { knownSensors } from '../config'

class AdminCourtsPage extends Component {
    constructor(props) {
        super(props);
        this.filterByCourtName = this.filterByCourtName.bind(this);
        this.showModificationModal = this.showModificationModal.bind(this);
        this.hideModificationModal = this.hideModificationModal.bind(this);
        this.showDeleteModal = this.showDeleteModal.bind(this);
        this.hideDeleteModal = this.hideDeleteModal.bind(this);
        this.showCreateModal = this.showCreateModal.bind(this);
        this.hideCreateModal = this.hideCreateModal.bind(this);
        this.showSensorsModal = this.showSensorsModal.bind(this);
        this.hideSensorsModal = this.hideSensorsModal.bind(this);
        this.modifyCourtData = this.modifyCourtData.bind(this);
        this.deleteCourt = this.deleteCourt.bind(this);
        this.createCourt = this.createCourt.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeDescription = this.changeDescription.bind(this);
        this.changePicture = this.changePicture.bind(this);
        this.changeSmartCitizenId = this.changeSmartCitizenId.bind(this);
        this.changeBookReservationTime = this.changeBookReservationTime.bind(this);
        this.changePriceWithoutLight = this.changePriceWithoutLight.bind(this);
        this.changePriceWithLight = this.changePriceWithLight.bind(this);
        this.changeNumberOfDaysToBookBefore = this.changeNumberOfDaysToBookBefore.bind(this);
        this.changeNumberOfHoursToCancelCourt = this.changeNumberOfHoursToCancelCourt.bind(this);
        this.changeOpensAt = this.changeOpensAt.bind(this);
        this.changeClosesAt = this.changeClosesAt.bind(this);
        this.changeCreatedCourtName = this.changeCreatedCourtName.bind(this);
        this.changeCreatedCourtDescription = this.changeCreatedCourtDescription.bind(this);
        this.changeCreatedPicture = this.changeCreatedPicture.bind(this);
        this.changeCreatedSmartCitizenId = this.changeCreatedSmartCitizenId.bind(this);
        this.changeCreatedCourtBookReservationTime = this.changeCreatedCourtBookReservationTime.bind(this);
        this.changeCreatedCourtPriceWithoutLight = this.changeCreatedCourtPriceWithoutLight.bind(this);
        this.changeCreatedCourtPriceWithLight = this.changeCreatedCourtPriceWithLight.bind(this);
        this.changeCreatedCourtNumberOfDaysToBookBefore = this.changeCreatedCourtNumberOfDaysToBookBefore.bind(this);
        this.changeCreatedCourtNumberOfHoursToCancelCourt = this.changeCreatedCourtNumberOfHoursToCancelCourt.bind(this);
        this.changeCreatedCourtOpensAt = this.changeCreatedCourtOpensAt.bind(this);
        this.changeCreatedCourtClosesAt = this.changeCreatedCourtClosesAt.bind(this);
        this.redirectToSmartCitizen = this.redirectToSmartCitizen.bind(this);
        this.state =  {
            loading: true,
            showModificationModal: false,
            showDeleteModal: false,
            showCreateModal: false,
            showSensorsModal: false,
            courtFilter: "",
            courts: [],
            selectedCourtIndexToModify: null,
            selectedCourtIndexToDelete: null,
            selectedCourtIndexForSensor: null,
            courtModifiedData: null,
            createdCourt: null,
            courtsToShow: [],
            pictureChanged: false
        }
    }

    async componentDidMount() {
        const courts = await getCourtsData(this.props);

        await this.setState({
            loading: false,
            courts: courts,
            courtsToShow: courts
        });
    }


    async filterByCourtName() {
        await this.setState({
            loading: true,
            courtsToShow: this.state.courts
        });
        
        const filter = this.state.courtFilter.trim().toLowerCase();
        if (filter.length > 0) {
            const a = this.state.courtsToShow.filter(court => {
                if (court.name.trim().toLowerCase().includes(filter)) {
                    return court;
                }
                return null;
            });

            await this.setState({
                loading: false,
                courtsToShow: a
            });

        } else {
            await this.setState({
                loading: false,
                courtsToShow: this.state.courts
            })
        }

        document.getElementById("courtFilter").value = this.state.courtFilter;
    }

    async showModificationModal(e) {
        await this.setState({
            showModificationModal: true,
            selectedCourtIndexToModify: e.target.value,
            courtModifiedData: this.state.courtsToShow[e.target.value]
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

    async showCreateModal(e) {
        await this.setState({
            showCreateModal: true,
            createdCourt: {},
        });
    }

    async hideCreateModal(e) {
        await this.setState({
            showCreateModal: false,
            createdCourt: null,
        });
    }

    async showSensorsModal(e) {
        await this.setState({
            showSensorsModal: true,
            selectedCourtIndexForSensor: e.target.value
        });
    }

    async hideSensorsModal(e) {
        await this.setState({
            showSensorsModal: true,
            selectedCourtIndexForSensor: null
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

    async changePicture(e) {
        var courtModifiedData = {...this.state.courtModifiedData};
        courtModifiedData.picture = e.target.files[0];
        await this.setState({
            courtModifiedData: courtModifiedData,
            pictureChanged: true
        });

    }

    async changeSmartCitizenId(e) {
        var courtModifiedData = {...this.state.courtModifiedData};
        courtModifiedData.smartCitizenId = e.target.value;
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


    async changeCreatedCourtName(e) {
        var createdCourt = {...this.state.createdCourt};
        createdCourt.name = e.target.value;
        await this.setState({
            createdCourt: createdCourt
        });
    }

    async changeCreatedCourtDescription(e) {
        var createdCourt = {...this.state.createdCourt};
        createdCourt.description = e.target.value;
        await this.setState({
            createdCourt: createdCourt
        });
    }

    async changeCreatedPicture(e) {
        var createdCourt = {...this.state.createdCourt};
        createdCourt.picture =e.target.files[0];
        await this.setState({
            createdCourt: createdCourt,
            pictureChanged: true
        });
    }

    async changeCreatedSmartCitizenId(e) {
        var createdCourt = {...this.state.createdCourt};
        createdCourt.smartCitizenId = e.target.value;
        await this.setState({
            createdCourt: createdCourt
        });
    }

    async changeCreatedCourtBookReservationTime(e) {
        var createdCourt = {...this.state.createdCourt};
        createdCourt.bookReservationTime = e.target.value;
        await this.setState({
            createdCourt: createdCourt
        });
    }

    async changeCreatedCourtPriceWithoutLight(e) {
        var createdCourt = {...this.state.createdCourt};
        createdCourt.priceWithoutLight = e.target.value;
        await this.setState({
            createdCourt: createdCourt
        });
    }

    async changeCreatedCourtPriceWithLight(e) {
        var createdCourt = {...this.state.createdCourt};
        createdCourt.priceWithLight = e.target.value;
        await this.setState({
            createdCourt: createdCourt
        });
    }

    async changeCreatedCourtNumberOfDaysToBookBefore(e) {
        var createdCourt = {...this.state.createdCourt};
        createdCourt.numberOfDaysToBookBefore = e.target.value;
        await this.setState({
            createdCourt: createdCourt
        });
    }

    async changeCreatedCourtNumberOfHoursToCancelCourt(e) {
        var createdCourt = {...this.state.createdCourt};
        createdCourt.numberOfHoursToCancelCourt = e.target.value;
        await this.setState({
            createdCourt: createdCourt
        });
    }

    async changeCreatedCourtOpensAt(e) {
        var createdCourt = {...this.state.createdCourt};
        createdCourt.opensAt = e.target.value;
        await this.setState({
            createdCourt: createdCourt
        });
    }

    async changeCreatedCourtClosesAt(e) {
        var createdCourt = {...this.state.createdCourt};
        createdCourt.closesAt = e.target.value;
        await this.setState({
            createdCourt: createdCourt
        });
    }

    async modifyCourtData(e) {
        e.preventDefault();
        
        await this.setState({
            loading: true
        });

        var courtModifiedData = {...this.state.courtModifiedData};
        delete courtModifiedData["picture"];
              
        await updateCourtData(this.props, courtModifiedData);
        const renamedPicture = new File([this.state.courtModifiedData.picture], courtModifiedData.name + ".png");
        
        if (this.state.pictureChanged) {
            await uploadPicture(this.props, this.state.courtModifiedData.name, renamedPicture);
            window.location.reload(false);
        }
        
        this.hideModificationModal();

        this.setState({
            loading: false,
            courts: await getCourtsData(this.props),
            pictureChanged: false
        });

        document.getElementById("courtFilter").value = this.state.courtFilter;
        this.filterByCourtName();
    }

    async deleteCourt(e) {
        await this.setState({
            loading: true
        });

        await deleteCourt(this.props, this.state.courtsToShow[this.state.selectedCourtIndexToDelete].id);
        
        this.hideDeleteModal();

        await this.setState({
            loading:false,
            courts: await getCourtsData(this.props)
        });
        
        document.getElementById("courtFilter").value = this.state.courtFilter;
        this.filterByCourtName();
    }

    async createCourt(e) {
        e.preventDefault();
        await this.setState({
            loading: true
        });

        var createdCourtData = {...this.state.createdCourt};
        delete createdCourtData["picture"];
        const renamedPicture = new File([this.state.createdCourt.picture], createdCourtData.name + ".png");

        await createNewCourt(this.props, createdCourtData);
        if (this.state.pictureChanged) {           
            await uploadPicture(this.props, this.state.createdCourt.name, renamedPicture);
        }

        this.hideCreateModal();

        await this.setState({
            loading: false,
            courts: await getCourtsData(this.props),
            pictureChanged: false
        });

        document.getElementById("courtFilter").value = this.state.courtFilter;
        this.filterByCourtName();
    }

        async redirectToSmartCitizen() {
            window.open(this.state.courts[this.state.selectedCourtIndexForSensor].smartCitizenURL, "_blank");
        }

    render() {
        if (this.state.loading) {
            return (
               <Loading />
            );
        }


        var courtsTable = []
        for (var i = 0; i < this.state.courtsToShow.length; i++) {
            const opensAt = moment(this.state.courtsToShow[i].opensAt, "HH:mm:SS");
            const closesAt = moment(this.state.courtsToShow[i].closesAt, "HH:mm:SS");
            courtsTable.push(
                <div  key={i} className="card mb-3 px-0">
                    <div className="row g-0">
                        <div className="col-md-4 px-2 d-flex flex-wrap align-items-center">
                            {this.state.courtsToShow[i].picture !== null && (
                                <img src={`${backendURL}/images/courts/${this.state.courtsToShow[i].picture}`} className="img-fluid rounded-start" alt="Imagen de la pista" />
                            )}
                        </div>
                        <div className="col-md-8 d-flex align-items-start flex-column">
                            <div className="card-body w-100 mb-1">
                                <h5 className="card-title">{this.state.courtsToShow[i].name}</h5>
                                <div className="mb-1 d-flex">
                                    <p className="card-text fw-bold">Descripción:&nbsp;</p>
                                    <p className="card-text">{this.state.courtsToShow[i].description}</p>
                                </div>
                                <p className="card-text fw-bold">Caracteristicas: </p>
                                <ul>
                                    <li>
                                        <div className="row align-items-end">
                                            <p className="col-8 mb-1">Hora de apertura:</p>
                                            <p className="col-4 mb-1 text-end">{opensAt.format("HH:mm")}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row align-items-end">
                                            <p className="col-8 mb-1">Hora de cierre:</p>
                                            <p className="col-4 mb-1 text-end">{closesAt.format("HH:mm")}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row align-items-end">
                                            <p className="col-8 mb-1">Precio con luz:</p>
                                            <p className="col-4 mb-1 text-end">{this.state.courtsToShow[i].priceWithLight} €</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row align-items-end">
                                            <p className="col-8 mb-1">Precio sin luz:</p>
                                            <p className="col-4 mb-1 text-end">{this.state.courtsToShow[i].priceWithoutLight} €</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row align-items-end">
                                            <p className="col-8 mb-1">Duración de reserva:</p>
                                            <p className="col-4 mb-1 text-end">{this.state.courtsToShow[i].bookReservationTime} minutos</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row align-items-end">
                                            <p className="col-8 mb-1">Con cuantos días de antelacion se puede reservar:</p>
                                            <p className="col-4 mb-1 text-end">{this.state.courtsToShow[i].numberOfDaysToBookBefore} horas</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row align-items-end">
                                            <p className="col-8 mb-1">Hasta cuantas horas antes se puede cancelar:</p>
                                            <p className="col-4 mb-1 text-end">{this.state.courtsToShow[i].numberOfHoursToCancelCourt} horas</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="card-footer w-100">
                                <div className="row justify-content-around">
                                    <div className="col text-start">
                                        <button value={i} className="btn btn-danger" onClick={this.showDeleteModal}>Eliminar</button>
                                    </div>
                                    <div className="col text-center">
                                        <button value={i} className="btn btn-primary" onClick={this.showModificationModal}>Modificar</button>
                                    </div>
                                    <div className="col text-end">
                                    {this.state.courtsToShow[i].sensors !== null && (
                                        <button value={i} className="btn btn-secondary bi bi-cloud-sun-fill" onClick={this.showSensorsModal}></button>
                                    )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

    
        var sensorsTable = [];
        if (this.state.selectedCourtIndexForSensor !== null && this.state.courtsToShow[this.state.selectedCourtIndexForSensor].sensors !== null) {
            this.state.courtsToShow[this.state.selectedCourtIndexForSensor].sensors.forEach((sensor, index) => {
                const sensorName = sensor.name.split("-")[1].trim();
                sensorsTable.push(
                    <div key={index} className="col-xs-12 col-sm-12 col-md-6 col-lg-3 mb-3">
                        <div className="card h-100 text-center bg-light mx-2" type="button" data-bs-toggle="tooltip" data-bs-placement="top" title={sensor.description}>
                            <p className="fs-6 fw-bold">{sensorName}</p>
                            <div className="ms-3">
                                {knownSensors.get(sensorName)}
                            </div>
                            <p className="fs-6">{sensor.value} {sensor.unit}</p>
                        </div>
                    </div>
                );
            });
        }

        return (
            <AdminLayout isHeader={true}>
                <BlueCard>
                    <h1>Pistas</h1>
                    <div className="text-center">
                        <div className='row justify-content-around'>
                            <div className='col-md-8 mb-1'>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="courtFilter" 
                                    placeholder="Filtrar por nombre de pista"
                                    onChange={(e) => this.setState({courtFilter: e.target.value})}
                                />
                            </div>
                            <div className='col-md-4 mb-1'>
                                <button onClick={this.filterByCourtName} className="btn btn-primary" >Filtrar busqueda</button>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-end">
                        <div className="col-md-4 mt-2">
                            <button className="col btn btn-warning" onClick={this.showCreateModal}>Crear pista</button>
                        </div>
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
                                            <input type="text" className="form-control" value={this.state.courtModifiedData.name} onChange={this.changeName} placeholder="Pista DAM" required/>
                                        </div>
                                        <div className="mx-1 mb-1">
                                            <label className='my-1'>Descripción</label>
                                            <textarea  type="text" className="form-control" value={this.state.courtModifiedData.description} onChange={this.changeDescription} placeholder="La pista es descubierta y tiene paredes de cristal..." />
                                        </div>
                                        <div className="mx-1 mb-1">
                                            <label className='my-1'>Foto</label>
                                            <input type="file" accept="image/*" onChange={this.changePicture} className="form-control" />
                                        </div>
                                        <div className="mx-1 mb-1">
                                            <label className='my-1'>Id de smartCitizen</label>
                                            <input  type="text" className="form-control" value={this.state.courtModifiedData.smartCitizenId} onChange={this.changeSmartCitizenId} placeholder="15261" />
                                        </div>
                                        <div className="mx-1 mb-1">
                                            <label className='my-1'>Duración en minutos de la reserva</label>
                                            <input type="number" step="1" className="form-control" value={this.state.courtModifiedData.bookReservationTime} onChange={this.changeBookReservationTime} placeholder="90" required/>
                                        </div>
                                        <div className="mx-1 mb-1">
                                            <label className='my-1'>Precio con luz</label>
                                            <input type="number" step="1" className="form-control" value={this.state.courtModifiedData.priceWithLight} onChange={this.changePriceWithLight} placeholder="40" required/>
                                        </div>
                                        <div className="mx-1 mb-1">
                                            <label className='my-1'>Precio sin luz</label>
                                            <input type="number" step="1" className="form-control" value={this.state.courtModifiedData.priceWithoutLight} onChange={this.changePriceWithoutLight} placeholder="35" required/>
                                        </div>
                                        <div className="mx-1 mb-1">
                                            <label className='my-1'>Con cuantos días de antelacion se puede reservar</label>
                                            <input type="number" step="1" className="form-control" value={this.state.courtModifiedData.numberOfDaysToBookBefore} onChange={this.changeNumberOfDaysToBookBefore} placeholder="2" required/>
                                        </div>
                                        <div className="mx-1 mb-1">
                                            <label className='my-1'>Hasta cuantas horas antes se puede cancelar (anular) la pista</label>
                                            <input type="number" step="1" className="form-control" value={this.state.courtModifiedData.numberOfHoursToCancelCourt} onChange={this.changeNumberOfHoursToCancelCourt} placeholder="6" required/>
                                        </div>
                                        <div className="mx-1 mb-1">
                                            <label className='my-1'>Hora de apertura de la pista</label>  
                                            <input type="time" className="form-control" value={this.state.courtModifiedData.opensAt} onChange={this.changeOpensAt} required/>
                                        </div>
                                        <div className="mx-1 mb-1">
                                            <label className='my-1'>Última hora a la que se puede empezar a jugar</label>  
                                            <input type="time" className="form-control" value={this.state.courtModifiedData.closesAt} onChange={this.changeClosesAt} required/>
                                        </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <button type="button" className="btn btn-light" onClick={this.hideModificationModal}>
                                        Cancelar
                                    </button>
                                    <button type="submit" className="btn btn-primary">
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
                            <p>¿Seguro que deseas eliminar la pista: {this.state.courtsToShow[this.state.selectedCourtIndexToDelete].name}?</p>
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

                {this.state.createdCourt !== null && (
                    <Modal size="lg" centered show={this.state.showCreateModal} onHide={this.hideCreateModal}>
                        <form onSubmit={this.createCourt}> 
                            <Modal.Header closeButton>
                                <Modal.Title>Crear pista</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="mx-1 mb-1">
                                    <label className='my-1'>Nombre de la pista *</label>
                                    <input type="text" className="form-control" onChange={this.changeCreatedCourtName} placeholder="Pista con nombre" required/>
                                </div>
                                <div className="mx-1 mb-1">
                                    <label className='my-1'>Descripción</label>
                                    <textarea  type="text" className="form-control" onChange={this.changeCreatedCourtDescription} placeholder="La pista es descubierta y tiene paredes de cristal..." />
                                </div>
                                <div className="mx-1 mb-1">
                                    <label className='my-1'>Foto</label>
                                    <input type="file" accept="image/*" onChange={this.changeCreatedPicture} className="form-control" />
                                </div>
                                <div className="mx-1 mb-1">
                                    <label className='my-1'>Id de smartCitizen</label>
                                    <input  type="text" className="form-control" onChange={this.changeCreatedSmartCitizenId} placeholder="15261" />
                                </div>
                                <div className="mx-1 mb-1">
                                    <label className='my-1'>Duración en minutos de la reserva</label>
                                    <input type="number" step="1" className="form-control" onChange={this.changeCreatedCourtBookReservationTime} placeholder="90" required/>
                                </div>
                                <div className="mx-1 mb-1">
                                    <label className='my-1'>Precio con luz</label>
                                    <input type="number" step="1" className="form-control" onChange={this.changeCreatedCourtPriceWithLight} placeholder="40" required/>
                                </div>
                                <div className="mx-1 mb-1">
                                    <label className='my-1'>Precio sin luz</label>
                                    <input type="number" step="1" className="form-control" onChange={this.changeCreatedCourtPriceWithoutLight} placeholder="35" required/>
                                </div>
                                <div className="mx-1 mb-1">
                                    <label className='my-1'>Con cuantos días de antelacion se puede reservar</label>
                                    <input type="number" step="1" className="form-control" onChange={this.changeCreatedCourtNumberOfDaysToBookBefore} placeholder="2" required/>
                                </div>
                                <div className="mx-1 mb-1">
                                    <label className='my-1'>Hasta cuantas horas antes se puede cancelar (anular) la pista</label>
                                    <input type="number" step="1" className="form-control" onChange={this.changeCreatedCourtNumberOfHoursToCancelCourt} placeholder="6" required/>
                                </div>
                                <div className="mx-1 mb-1">
                                    <label className='my-1'>Hora de apertura de la pista</label>  
                                    <input type="time" className="form-control" onChange={this.changeCreatedCourtOpensAt} required/>
                                </div>
                                <div className="mx-1 mb-1">
                                    <label className='my-1'>Última hora a la que se puede empezar a jugar</label>  
                                    <input type="time" className="form-control" onChange={this.changeCreatedCourtClosesAt} required/>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <button type="button" className="btn btn-light" onClick={this.hideCreateModal}>
                                    Cancelar
                                </button>
                                <button className="btn btn-primary" type="submit">
                                    Crear Pista
                                </button>
                            </Modal.Footer>
                        </form>
                    </Modal>
                )}
                {this.state.selectedCourtIndexForSensor !== null && (
                    <Modal size="xl" centered show={this.state.showSensorsModal} onHide={this.hideSensorsModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Sensores del dispositivo SmartCitizen: {this.state.courtsToShow[this.state.selectedCourtIndexForSensor].name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row justify-content-start">
                                {sensorsTable}
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="btn btn-light" onClick={this.hideSensorsModal}>Cancelar</button>
                            <button className="btn btn-primary" onClick={this.redirectToSmartCitizen}>Ir a Smartcitizen.me</button>
                        </Modal.Footer>
                    </Modal>
                )}
            </AdminLayout>
        );
    }
}

export default AdminCourtsPage;