import React, { Component }  from 'react';
import { Layout, BlueCard, Loading } from '../component';
import { getSpecificRanking, setResultOfMatch } from '../services/rankings.services';
import { getUsername } from '../services/user.services';
import moment from "moment";

class specificRankingPage extends Component {
    constructor(props) {     
        super(props);
        this.handleMatchResult = this.handleMatchResult.bind(this);
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

    async handleMatchResult(e) {
        const target = e.target;

        await this.setState({
            loading: true
        });

        var partnerOneWins = 1;
        if (target.name === "partnerOneWins") {
            if (this.state.ranking[target.value].partnerOneWins === 1) {
                //partnerOneWins a null
                partnerOneWins = null;
            }
        } else if (target.name === "partnerTwoWins") {
            if (this.state.ranking[target.value].partnerOneWins === null) {
                //partnerOneWins a 0
                partnerOneWins = 0;
            } else if (this.state.ranking[target.value].partnerOneWins === 0) {
                //partnerOneWins a null
                partnerOneWins = null;
            } else if (this.state.ranking[target.value].partnerOneWins === 1) {
                //partnerOneWins a 0
                partnerOneWins = 0;
            }
        }
        await setResultOfMatch(this.props, this.state.ranking[target.value].id, this.state.ranking[target.value]["partnerOne.id"], partnerOneWins);

        await this.setState({
            loading: false,
            ranking: await getSpecificRanking(this.props, this.props.match.params.rankingId)
        });
    
    }


    render() {
        if (this.state.loading) {
            return (
                <Loading />
            );
        }


        var matchesBody = [];
        for (var i = 0; i < this.state.ranking.length; i++) {
            matchesBody.push(
                <tr key={i}>
                    <td>
                        <p className='fw-bold'>
                            {this.state.ranking[i]["partnerOne.playerOne.name"]} {this.state.ranking[i]["partnerOne.playerOne.firstSurname"]} {this.state.ranking[i]["partnerOne.playerOne.secondSurname"]}
                        </p>
                        (+{this.state.ranking[i]["partnerOne.playerOne.phoneNumber"]}) ({this.state.ranking[i]["partnerOne.playerOne.email"]})</td>
                    <td>
                        <p className='fw-bold'>
                            {this.state.ranking[i]["partnerOne.playerTwo.name"]} {this.state.ranking[i]["partnerOne.playerTwo.firstSurname"]} {this.state.ranking[i]["partnerOne.playerTwo.secondSurname"]}
                        </p>
                        (+{this.state.ranking[i]["partnerOne.playerTwo.phoneNumber"]}) ({this.state.ranking[i]["partnerOne.playerTwo.email"]})
                    </td>

                    {this.state.ranking[i].partnerOneWins === null ? (
                        <>
                            <td>
                                <input className="form-check-input" value={i} id={"partnerOneWins" + i} name="partnerOneWins" onChange={this.handleMatchResult} type="checkbox" />
                            </td>
                            <td className='fw-bold'>vs</td>
                            <td>
                                <input className="form-check-input" value={i} id={"partnerTwoWins" + i} name="partnerTwoWins" onChange={this.handleMatchResult} type="checkbox" />
                            </td>
                        </>
                    ) : (
                        <>
                            <td>
                                <input className="form-check-input" value={i} id={"partnerOneWins" + i} name="partnerOneWins" checked={this.state.ranking[i].partnerOneWins} onChange={this.handleMatchResult} type="checkbox" />
                            </td>
                            <td className='fw-bold'>vs</td>
                            <td>
                                <input className="form-check-input" value={i} id={"partnerTwoWins" + i} name="partnerTwoWins" checked={!this.state.ranking[i].partnerOneWins} onChange={this.handleMatchResult} type="checkbox" />
                            </td>
                        </>
                    )}
                    
                    <td>
                        <p className='fw-bold'>
                            {this.state.ranking[i]["partnerTwo.playerOne.name"]} {this.state.ranking[i]["partnerTwo.playerOne.firstSurname"]} {this.state.ranking[i]["partnerTwo.playerOne.secondSurname"]}
                        </p>
                        (+{this.state.ranking[i]["partnerTwo.playerOne.phoneNumber"]}) ({this.state.ranking[i]["partnerTwo.playerOne.email"]})</td>
                    <td>
                        <p className='fw-bold'>
                            {this.state.ranking[i]["partnerTwo.playerTwo.name"]} {this.state.ranking[i]["partnerTwo.playerTwo.firstSurname"]} {this.state.ranking[i]["partnerTwo.playerTwo.secondSurname"]}
                        </p>
                        (+{this.state.ranking[i]["partnerTwo.playerTwo.phoneNumber"]}) ({this.state.ranking[i]["partnerTwo.playerTwo.email"]})
                    </td>
                </tr>
            );
        }

        return (     
            <Layout isHeader={true} username={this.state.username}>
                <BlueCard>
                    <h1>Ranking: {this.state.ranking[0]["group.ranking.name"]}</h1>
                    <p className='mt-3'>Descripción: {this.state.ranking[0]["group.ranking.description"]}</p>
                    <p>Creado: {moment(this.state.ranking[0]["group.ranking.createdAt"]).format("YYYY-MM-DD HH:mm")}</p>
                </BlueCard>
                <BlueCard className="col-12">
                    <h1>Partidos a jugar (Jornada {this.state.ranking[0]["group.ranking.journeyNumber"]})</h1>
                    <div className="container table-responsive mt-4">
                        <table className="table table-striped">
                            <thead className="table-dark">
                                <tr>
                                    <th scope="col" colSpan="3">Pareja 1</th>
                                    <th scope="col"></th>
                                    <th scope="col" colSpan="3">Pareja 2</th>
                                </tr>
                                <tr>
                                    <th scope="col">Jugador 1</th>
                                    <th scope="col">Jugador 2</th>
                                    <th scope="col">Pareja 1 ganadora</th>
                                    <th scope="col"></th>
                                    <th scope="col">Pareja 2 ganadora</th>
                                    <th scope="col">Jugador 1</th>
                                    <th scope="col">Jugador 2</th>
                                </tr>
                            </thead>
                            <tbody>
                                {matchesBody}
                            </tbody>
                        </table>
                    </div> 
                </BlueCard>

            </Layout>
        ); 
    }
}

export default specificRankingPage;