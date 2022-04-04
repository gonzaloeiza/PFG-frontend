import React, { Component }  from 'react';
import { AdminLayout } from '../component';
import { getCourts } from '../services/admin.services/bookings.service'

class AdminCourtsPage extends Component {
    constructor(props) {
        super(props);
        this.state =  {
            loading: true,
            courts: []
        }
    }

    async componentDidMount() {
        await this.setState({
            loading: false,
            courts: await getCourts()
        });
        console.log(this.state.courts);
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
            <AdminLayout isHeader={true} username={this.state.username}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xs-12 col-sm-12 col-md-10 col-lg-9">
                            <div className="card my-5">
                                <div className="card-body cardbody-color text-center">
                                    <div className='row justify-content-center'>
                                        <h1>Pistas</h1>
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

export default AdminCourtsPage;