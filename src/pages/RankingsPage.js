import React, { Component }  from 'react';
import { Modal } from 'react-bootstrap';
import { Layout, BlueCard, Loading } from '../components';
import { getMyRankings, getOpenRankings } from '../services/rankings.services';
import { getUserData, getUsername, sendForm } from '../services/user.services';

class RankingsPage extends Component {
    constructor(props) {     
        super(props);
        this.redirectToSpecificRanking = this.redirectToSpecificRanking.bind(this);
        this.showOpenRankingsModal = this.showOpenRankingsModal.bind(this);
        this.hideOpenRankingsModal = this.hideOpenRankingsModal.bind(this);
        this.showInscriptionModal = this.showInscriptionModal.bind(this);
        this.hideInscriptionModal = this.hideInscriptionModal.bind(this);
        this.sendRankingRegistration = this.sendRankingRegistration.bind(this);
        this.state = {
            loading: true,
            showOpenRankingsModal: false,
            showInscriptionModal: false,
            rankings: [],
            openRankings: [],
            username: null,
            userData: null,
            formMessage: "",
            selectedRankingIndex: null,
        }
    }

    async componentDidMount() {
        await this.setState({
            loading: false,
            username: getUsername(),
            rankings: await getMyRankings(this.props),
            userData: await getUserData(this.props),
            openRankings: await getOpenRankings(this.props),
        });
    }


    async redirectToSpecificRanking(e) {
        this.props.history.push(`/rankings/${e.target.value}`);
    }


    async showOpenRankingsModal() {
        await this.setState({
            showOpenRankingsModal: true
        });
    }
    
    async hideOpenRankingsModal() {
        await this.setState({
            showOpenRankingsModal: false,
            selectedRankingIndex: null,
            formMessage: ""
        });
    }

    async showInscriptionModal(e) {
        await this.setState({
            showInscriptionModal: true,
            selectedRankingIndex: e.target.value
        });
    }

    async hideInscriptionModal() {
        await this.setState({
            showInscriptionModal: false,
            selectedRankingIndex: null,
            formMessage: ""
        });
    }

    async sendRankingRegistration() {
        var message = "Inscripción a " + this.state.openRankings[this.state.selectedRankingIndex].name + ": " + this.state.formMessage;

        if (this.state.formMessage.trim() === "") {
            message = "Inscripción a " + this.state.openRankings[this.state.selectedRankingIndex].name + ": Me gustaría apuntarme al ranking pero no tengo pareja."
        }

        await sendForm(this.state.userData.name , this.state.userData.firstSurname, this.state.userData.email, message);
        this.hideInscriptionModal();
        this.hideOpenRankingsModal();
    }


    render() {
        if (this.state.loading) {
            return (
                <Loading />
            );
        }


        var rankingCards = [];
        for (var i = 0; i < this.state.rankings.length; i++) {
            rankingCards.push(
                <div key={i} className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 mb-4">
                    <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{this.state.rankings[i]["ranking.name"]}</h5>
                        <p className="card-text">{this.state.rankings[i]["ranking.description"]}</p>
                        <button value={this.state.rankings[i].rankingId} className="btn btn-primary" onClick={this.redirectToSpecificRanking}>Ver ranking en detalle</button>
                    </div>
                    </div>
                </div>
            );
        }

        
        var openRankingCards = [];
        for (i = 0; i < this.state.openRankings.length; i++) {
            openRankingCards.push(
                <div  key={i} className='row justify-content-center'>
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{this.state.openRankings[i].name}</h5>
                                <p className="card-text">{this.state.openRankings[i].description}</p>
                                <button value={i} onClick={this.showInscriptionModal} className="btn btn-primary">Enviar solicitud de inscripción</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }


        return (     
            <Layout isHeader={true} username={this.state.username}>
                <BlueCard>
                    <h1>Rankings en los que estás inscrito</h1>
                    <div className='text-center'>
                        <button type="button" className="mx-2 mt-2 btn btn-secondary bi bi-list-ol" onClick={this.showOpenRankingsModal}>&#32;Ranking con inscripción abierta</button>
                    </div>
                </BlueCard>
                <div className='container'>
                    <div className='row justify-content-around'>
                        {rankingCards}
                    </div>
                </div>
                <Modal show={this.state.showOpenRankingsModal} onHide={this.hideOpenRankingsModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Rankings con inscripción abierta</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {openRankingCards}
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-light" onClick={this.hideOpenRankingsModal}>
                            Ocultar
                        </button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.showInscriptionModal} onHide={this.hideInscriptionModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Enviar solicitud</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Mensaje de solicitud:</p>
                        <textarea rows="5" type="text" value={this.state.formMessage} className="form-control" id="message" placeholder="Si no tienes pareja y quieres que se te busque una no modifiques el mensaje. Si tienes pareja especifica su nombre, apellidos y email." onChange={(e) => this.setState({formMessage: e.target.value})} required/>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-light" onClick={this.hideInscriptionModal}>
                            Ocultar
                        </button>
                        <button className="btn btn-primary" onClick={this.sendRankingRegistration}>
                            Enviar
                        </button>
                    </Modal.Footer>
                </Modal>

            </Layout>
        ); 
    }
}

export default RankingsPage;