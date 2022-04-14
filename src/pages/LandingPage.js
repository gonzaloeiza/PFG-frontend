import React, { Component }  from 'react';
import { Carousel } from 'react-bootstrap';
import { BlueCard, Layout, Loading } from '../component';
import { getUsername, sendForm } from '../services/user.service'
import { getCourtsData } from '../services/courts.service'
import { backendURL } from '../config';
import moment from 'moment';

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.submitContactForm = this.submitContactForm.bind(this);
        this.state =  {
            loading: true,
            username: null,
            courts: [],
            formName: "",
            formSurname: "",
            formEmail: "",
            formMessage: ""
        }
    }

    async componentDidMount() {
        await this.setState({
            loading:false,
            username: getUsername(),
            courts: await getCourtsData()
        });
    }

    async submitContactForm(e) {
        e.preventDefault();
        await this.setState({
            loading: true
        });

        sendForm(this.state.formName, this.state.formSurname, this.state.formEmail, this.state.formMessage);
        console.log(this.state);

        await this.setState({
            loading: false,
            formName: "",
            formSurname: "",
            formEmail: "",
            formMessage: ""
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
                <Carousel.Item key={i}>
                    <div className="bg-light">
                        <div className="row g-0">
                            <div className="col-md-4 px-2 d-flex flex-wrap align-items-center">
                                {this.state.courts[i].picture !== null && (
                                    <img src={`${backendURL}/images/courts/${this.state.courts[i].picture}`} className="img-fluid rounded-start" alt="Imagen de la pista" />
                                )}
                            </div>
                            <div className="col-md-8 d-flex align-items-start flex-column mb-5">
                                <div className="card-body w-100 mb-1">
                                    <h5 className="card-title text-warning">{this.state.courts[i].name}</h5>
                                    <div className="mb-1 d-flex">
                                        <p className="card-text fw-bold">Descripción:&nbsp;</p>
                                        <p className="card-text">{this.state.courts[i].description}</p>
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
                                                <p className="col-4 mb-1 text-end">{this.state.courts[i].priceWithLight} €</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="row align-items-end">
                                                <p className="col-8 mb-1">Precio sin luz:</p>
                                                <p className="col-4 mb-1 text-end">{this.state.courts[i].priceWithoutLight} €</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="row align-items-end">
                                                <p className="col-8 mb-1">Duración de reserva:</p>
                                                <p className="col-4 mb-1 text-end">{this.state.courts[i].bookReservationTime} minutos</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="row align-items-end">
                                                <p className="col-8 mb-1">Con cuantos días de antelacion se puede reservar:</p>
                                                <p className="col-4 mb-1 text-end">{this.state.courts[i].numberOfDaysToBookBefore} horas</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="row align-items-end">
                                                <p className="col-8 mb-1">Hasta cuantas horas antes se puede cancelar:</p>
                                                <p className="col-4 mb-1 text-end">{this.state.courts[i].numberOfHoursToCancelCourt} horas</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </Carousel.Item>
            );
        }

        return (
            <Layout isHeader={true} username={this.state.username}>
                <header className="bg-dark py-5 bg-image landing-banner" style={{"backgroundImage": `url('${backendURL}/images/landingPage/top-banner.jpg')`}}>
                    <div className="container px-5">
                        <div className="row gx-5 justify-content-center">
                            <div className="col-lg-6">
                                <div className="text-center my-5">
                                    <h1 className="display-5 fw-bolder text-white mb-2">
                                        Padel Play
                                    </h1>
                                    <p className="lead text-white-50 mb-4">
                                        Tu club de padel de confianza con las mejores instalaciones y tecnologías.
                                        Ven a jugar!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <Carousel className="mt-1" variant="dark">
                    {courtsTable}
                </Carousel>




                <BlueCard className="mb-0">
                        <div className="text-center">
                            <h2 className="text-center mb-4 text-dark">¿Tienes preguntas? Contáctanos</h2>
                        </div>
                    <form onSubmit={this.submitContactForm}>
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-6 mb-3">
                                <input type="text" value={this.state.formName} className="form-control" id="name" placeholder="Nombre" onChange={(e) => this.setState({formName: e.target.value})} required/>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-6 mb-3">
                                <input type="text" value={this.state.formSurname} className="form-control" id="surname" placeholder="Apellidos" onChange={(e) => this.setState({formSurname: e.target.value})} required/>
                            </div>
                        </div>
                            <div className="mb-3">
                                <input type="email" value={this.state.formEmail} className="form-control" id="email" placeholder="Email" onChange={(e) => this.setState({formEmail: e.target.value})} required/>
                            </div>
                            <div className="mb-3">
                                <textarea rows="5" type="text" value={this.state.formMessage} className="form-control" id="message" placeholder="Mensaje" onChange={(e) => this.setState({formMessage: e.target.value})} required/>
                            </div>
                            <div className="mb-3 text-center">
                                <button type="submit" className="btn btn-primary">Enviar</button>
                            </div>
                    </form>
                </BlueCard>

            </Layout>
        );
    }
}


export default LandingPage;