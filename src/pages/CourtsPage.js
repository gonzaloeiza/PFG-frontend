import React, { Component }  from 'react';
import { Layout, BlueCard, Loading } from '../component';
import { getCourtsData } from '../services/courts.services'
import { getUsername } from '../services/user.services'
import moment from 'moment';
import { Modal } from 'react-bootstrap';
import { backendURL } from '../config';
import { knownSensors } from '../config'

class CourtsPage extends Component {
    constructor(props) {
        super(props);
        this.filterByCourtName = this.filterByCourtName.bind(this);
        this.showSensorsModal = this.showSensorsModal.bind(this);
        this.hideSensorsModal = this.hideSensorsModal.bind(this);
        this.redirectToSmartCitizen = this.redirectToSmartCitizen.bind(this);
        this.state =  {
            loading: true,
            showSensorsModal: false,
            username: null,
            courtFilter: "",
            courts: [],
            selectedCourtIndexForSensor: null,
            courtsToShow: [],
        }
    }

    async componentDidMount() {
        const courts = await getCourtsData(this.props);

        await this.setState({
            loading: false,
            username: getUsername(),
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
                            {this.state.courtsToShow[i].sensors !== null && (
                                <div className="card-footer w-100">
                                    <div className="row justify-content-around">
                                        <div className="col text-center">
                                            <button value={i} className="btn btn-secondary bi bi-cloud-sun-fill" onClick={this.showSensorsModal}></button>
                                        </div>
                                    </div>
                                </div>
                            )}
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
            <Layout isHeader={true} username={this.state.username}>
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
                </BlueCard>
                <div className="container">
                    <div className="row justify-content-start">
                        {courtsTable}
                    </div>
                </div>

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
            </Layout>
        );
    }
}

export default CourtsPage;