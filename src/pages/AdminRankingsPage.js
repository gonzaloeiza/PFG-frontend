import React, { Component }  from 'react';
import { getRankings, createNewRanking } from '../services/admin.services/rankings.services';
import { AdminLayout, BlueCard, Loading } from '../component';
import { Modal } from 'react-bootstrap';

class AdminRankingsPage extends Component {
    constructor(props) {     
        super(props);
        this.showCreateRankingModal = this.showCreateRankingModal.bind(this);
        this.hideCreateRankingModal = this.hideCreateRankingModal.bind(this);
        this.redirectToSpecificRanking = this.redirectToSpecificRanking.bind(this);
        this.createNewRanking = this.createNewRanking.bind(this);
        this.state = {
            loading: true,
            showCreateRankingModal: false,
            rankings: [],
            newRankingName: "",
            newRankingDescription: ""
        }
    }

    async componentDidMount() {
        await this.setState({
            loading: false,
            rankings: await getRankings(this.props)
        });
    }

    async showCreateRankingModal() {
        await this.setState({
            showCreateRankingModal: true
        });
    }

    async hideCreateRankingModal() {
        await  this.setState({
            showCreateRankingModal: false
        });
    }

    async redirectToSpecificRanking(e) {
        this.props.history.push(`/admin/rankings/${e.target.value}`);
    }


    async createNewRanking(e) {
        e.preventDefault();
        await this.setState({
            loading: true
        });
        
        this.hideCreateRankingModal();
        await createNewRanking(this.props, this.state.newRankingName, this.state.newRankingDescription);
        
        await this.setState({
            loading: false,
            rankings: await getRankings(this.props)
        });
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
                        <h5 className="card-title">{this.state.rankings[i].name}</h5>
                        <p className="card-text">{this.state.rankings[i].description}</p>
                        <button value={this.state.rankings[i].id} className="btn btn-primary" onClick={this.redirectToSpecificRanking}>Ver ranking en detalle</button>
                    </div>
                    </div>
                </div>
            );
        }

        return (     
            <AdminLayout isHeader={true}>
                <BlueCard>
                    <h1>Rankings</h1>
                    <div>
                        <button className='btn btn-warning' onClick={this.showCreateRankingModal}>Crear nuevo ranking</button>
                    </div>
                </BlueCard>
                <div className='container'>
                    <div className='row justify-content-around'>
                        {rankingCards}
                    </div>
                </div>

                <Modal centered show={this.state.showCreateRankingModal} onHide={this.hideCreateRankingModal}>
                    <form onSubmit={this.createNewRanking}>
                        <Modal.Header closeButton>
                            <Modal.Title>Crear Ranking</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <input type="text" onChange={(e) => this.setState({newRankingName: e.target.value})} className='form-control mb-1' placeholder='Nombre del ranking' required/>
                            <textarea type="text" onChange={(e) => this.setState({newRankingDescription: e.target.value})} className='form-control' rows={5} placeholder="Descripción" />
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="btn btn-secondary" onClick={this.hideCreateRankingModal}>
                                Cancelar
                            </button>
                            <button className="btn btn-primary" type="submit">
                                Crear nuevo ranking
                            </button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </AdminLayout>
        ); 
    }
}

export default AdminRankingsPage;