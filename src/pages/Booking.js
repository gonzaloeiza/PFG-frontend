import React, { Component }  from 'react';
import { Layout } from '../component';
import { Form } from 'react-bootstrap';
import { getUsername } from '../services/user.service'
import { getCourts, getDisponibility } from '../services/booking.service'
import { message } from 'antd';

class Booking extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state =  {
            loading: true,
            username: null,
            courts: [],
            bookingDay: new Date().toJSON().slice(0,10),
            selectedCourt: null
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const selectedCourt = e.target.getElementsByTagName("select").court.value;
        if (selectedCourt === "Pistas") {
            return message.error("Debes seleccionar una pista");
        }
        this.setState({
            selectedCourt: selectedCourt
        }, () => {
            // fetcheamos resultados
            console.log(this.state);
        })
    }


    async componentDidMount() {
        const courts = await getCourts(this.props);
        this.setState({
            username: getUsername(),
            courts: courts,
            loading: false
        });
    }

    render() {
        if (this.state.loading) {
            return (
                <h1>Loading</h1>
            );
        }
        
        var courtsOption = [];
        for (var i = 0; i < this.state.courts.length; i++) {
            courtsOption.push(
                <option value={this.state.courts[i].name} key={i}>{this.state.courts[i].name}</option>
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
                                            <Form.Control
                                                type="date"
                                                name="bookingDay" 
                                                placeholder="Día de reserva"
                                                defaultValue={this.state.bookingDay}
                                                onChange={(e) => this.setState({bookingDay: e.target.value})}
                                            />
                                        </div>
                                        <div className='col-md-4 mb-1'>
                                            <select className="custom-select form-select" id="court" onChange={(e) => this.setState({selectedCourt: e})}>
                                                <option hidden>Pistas</option>
                                                {courtsOption}
                                            </select>
                                        </div>
                                        <div className='col-md-3 mb-1 d-flex justify-content-center'>
                                            <button type="submit" className="btn btn-color">Buscar</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                
            </Layout>
        );
    }
}

export default Booking;