import React, { Component }  from 'react';
import { Layout, BlueCard, Loading } from '../component';
import { getUsername } from '../services/user.service'

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state =  {
            loading: true,
            username: null
        }
    }

    componentDidMount() {
        this.setState({
            username: getUsername(),
            loading:false
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
                    <h1>Landing Page: {this.state.username}</h1>
                </BlueCard>
            </Layout>
        );
    }
}


export default LandingPage;