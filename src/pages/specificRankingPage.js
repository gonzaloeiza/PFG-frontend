import React, { Component }  from 'react';
import { Layout, BlueCard, Loading } from '../component';
import { getSpecificRanking } from '../services/rankings.services';
import { getUsername } from '../services/user.services';
import moment from "moment";

class specificRankingPage extends Component {
    constructor(props) {     
        super(props);
        this.state = {
            loading: true,
            username: null,
            ranking: null
        }
    }

    async componentDidMount() {
        await this.setState({
            loading: false,
            username: getUsername(),
            ranking: await getSpecificRanking(this.props, this.props.match.params.rankingId)
        });
    }


    render() {
        if (this.state.loading) {
            return (
                <Loading />
            );
        }


        return (     
            <Layout isHeader={true} username={this.state.username}>
                <BlueCard>
                    <h1>Ranking: {this.state.ranking[0]["group.ranking.name"]}</h1>
                    <p className='mt-3'>Descripción: {this.state.ranking[0]["group.ranking.description"]}</p>
                    <p>Creado: {moment(this.state.ranking[0]["group.ranking.createdAt"]).format("YYYY-MM-DD HH:mm")}</p>
                </BlueCard>
                <div className='container'>
                    <div className='row justify-content-around'>
                    </div>
                </div>

            </Layout>
        ); 
    }
}

export default specificRankingPage;