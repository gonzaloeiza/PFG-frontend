import React, { Component }  from 'react';
import { Layout } from '../component';
import { getUsername } from '../services/user.service'
import "../assets/css/pages/myBookings.css"

class MyBookings extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state =  {
            loading: true,
            showConfirmationModal: false,
            username: null,
        }
    }

    async handleSubmit (e) {
        e.preventDefault();
    }

    async componentDidMount() {
        this.setState({
            username: getUsername(),
            loading: false
        });
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

        var tableBody = []
        for (var i=0; i < 100; i++) {
            tableBody.push( 
                <tr key={i}>
                    <th scope="row">19/03/2022</th>
                    <td>16:30 - 18:00</td>
                    <td>Si</td>
                    <td>Pista DAM</td>
                    <td>12.5 €</td>
                    <td></td>
                </tr>
            );
            tableBody.push( 
                <tr key={i + 100}>
                    <th scope="row">15/06/2022</th>
                    <td>09:30 - 10:30</td>
                    <td>No</td>
                    <td>Pista Cupra</td>
                    <td>33.50 €</td>
                    <td><button className="btn btn-danger">cancelar</button></td>
                </tr>
            );
        }

        return (
            <Layout isHeader={true} username={this.state.username}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xs-12 col-sm-12 col-md-10 col-lg-9">
                            <div className="card my-5">
                                <form className="card-body cardbody-color" onSubmit={this.handleSubmit}>
                                    <div className='row justify-content-center'>
                                        <div className='col-md-4 mb-1'>
                                            <input
                                                className="form-control"
                                                type="date"
                                                name="bookingDay" 
                                                placeholder="Desde"
                                                required
                                            />
                                        </div>
                                        <div className='col-md-4 mb-1'>
                                            <input
                                                className="form-control"
                                                type="date"
                                                name="bookingDay" 
                                                placeholder="Hasta"
                                                required
                                            />
                                        </div>
                                        <div className='col-md-4 mb-1'>
                                            <select className="custom-select form-select" id="activeBooking">
                                                <option hidden>Todas</option>
                                                <option>Activas</option>
                                                <option>Pasadas</option>                                                
                                            </select>
                                        </div>
                                        <div className='col-md-3 mt-2 d-flex justify-content-center'>
                                            <button type="submit" className="btn btn-color">Buscar</button>
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
                            <th scope="col">Fecha</th>
                            <th scope="col">Hora</th>
                            <th scope="col">Con luz</th>
                            <th scope="col">Pista</th>
                            <th scope="col">Importe</th>
                            <th scope="col">Cancelar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableBody}
                        </tbody>
                    </table>
                </div>
            </Layout>
        );
    }
}

export default MyBookings;