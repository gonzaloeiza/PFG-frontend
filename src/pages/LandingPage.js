import React, { Component }  from 'react';
import { Layout } from '../component';
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
                <h1>Loading</h1>
            );
        }
        return (
            <Layout isHeader={true} username={this.state.username}>
                <h1>Landing Page: {this.state.username}</h1>
            </Layout>
        );
    }
}


export default LandingPage;