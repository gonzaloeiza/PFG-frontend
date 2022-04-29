import React, { Component }  from 'react';
import { Layout, BlueCard, Loading } from '../components';
import { getMyRankings } from '../services/rankings.services';
import { getUsername } from '../services/user.services';

class RankingsPage extends Component {
    constructor(props) {     
        super(props);
        this.redirectToSpecificRanking = this.redirectToSpecificRanking.bind(this);
        this.state = {
            loading: true,
            rankings: [],
            username: null,
        }
    }

    async componentDidMount() {
        await this.setState({
            loading: false,
            username: getUsername(),
            rankings: await getMyRankings(this.props)
        });
    }


    async redirectToSpecificRanking(e) {
        this.props.history.push(`/rankings/${e.target.value}`);
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

        return (     
            <Layout isHeader={true} username={this.state.username}>
                <BlueCard>
                    <h1>Rankings en los que estás inscrito</h1>
                </BlueCard>
                <div className='container'>
                    <div className='row justify-content-around'>
                        {rankingCards}
                    </div>
                </div>

            </Layout>
        ); 
    }
}

export default RankingsPage;