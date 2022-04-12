import React, { Component }  from 'react';
import { Layout, Loading } from '../component';
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
                <header className="bg-dark py-5 bg-image-full" style={{"backgroundImage": "url('http://localhost:5000/images/landingPage/top-banner.jpg')"}}>
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
            </Layout>
        );
    }
}


export default LandingPage;