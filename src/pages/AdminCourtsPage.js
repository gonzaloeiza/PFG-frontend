import React, { Component }  from 'react';
import { AdminLayout, BlueCard, Loading } from '../component';
import { getCourts } from '../services/admin.services/bookings.service'
import moment from 'moment';

class AdminCourtsPage extends Component {
    constructor(props) {
        super(props);
        this.state =  {
            loading: true,
            courts: []
        }
    }

    async componentDidMount() {
        await this.setState({
            loading: false,
            courts: await getCourts()
        });
        console.log(this.state.courts);
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
                        <div className="card-body">
                            <ul>
                                <li>
                                    <div className="row">
                                        <p className="col-8 mb-1 fw-bold">Hora de apertura:</p>
                                        <p className="col-4 mb-1 text-end fw-bold">{opensAt.format("HH:mm")}</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <p className="col-8 mb-1 fw-bold">Hora de cierre:</p>
                                        <p className="col-4 mb-1 text-end fw-bold">{closesAt.format("HH:mm")}</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <p className="col-8 mb-1 fw-bold">Precio con luz:</p>
                                        <p className="col-4 mb-1 text-end fw-bold">{this.state.courts[i].priceWithLight} €</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <p className="col-8 mb-1 fw-bold">Precio sin luz:</p>
                                        <p className="col-4 mb-1 text-end fw-bold">{this.state.courts[i].priceWithoutLight} €</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <p className="col-8 mb-1 fw-bold">Duración de reserva:</p>
                                        <p className="col-4 mb-1 text-end fw-bold">{this.state.courts[i].bookReservationTime} mins</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <p className="col-8 mb-1 fw-bold">Hasta cuantas horas antes se puede cancelar:</p>
                                        <p className="col-4 mb-1 text-end fw-bold">{this.state.courts[i].numberOfHoursToCancelCourt} horas</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="card-footer">
                            <div className="row">
                                <div className="col-xs-12 col-sm-6 my-2 text-center">
                                    <button value={i} className="btn btn-danger" onClick={(e) => this.showConfirmationModal(e, true)}>Eliminar</button>
                                </div>
                                <div className="col-xs-12 col-sm-6 my-2 text-center">
                                    <button value={i} className="btn btn-color" onClick={(e) => this.showConfirmationModal(e, false)}>Modificar</button>
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
                </BlueCard>
                <div className="container">
                    <div className="row justify-content-start">
                        {courtsTable}
                    </div>
                </div>
            </AdminLayout>
        );
    }
}

export default AdminCourtsPage;