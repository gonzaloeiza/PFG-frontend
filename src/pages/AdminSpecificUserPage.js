import React, { Component }  from 'react';
import { AdminLayout } from '../component';

class AdminSpecificUserPage extends Component {
    constructor(props) {
        super(props);
        this.state =  {
            loading: true,
            user: null
        }
    }

    async componentDidMount() {
        console.log(this.props.match.params.userId);

        await this.setState({
            loading: false,
            // user: await getUserById(this.props, this.props.match.params.userId)
        });
    }


    render() {
        if (this.state.loading) {
            return (
                <div className="center">
                    <div className="spinner-border" style={{width: "5rem", height: "5rem"}} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            );
        }
        
        return (
            <AdminLayout isHeader={true}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xs-12 col-sm-12 col-md-10 col-lg-9">
                            <div className="card my-5">
                                <div className="card-body cardbody-color text-center">
                                    <div className='row justify-content-center'>
                                        <h1>Usuario: </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>   
        );
    }
}

export default AdminSpecificUserPage;