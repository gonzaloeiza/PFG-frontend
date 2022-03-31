import React, { Component }  from 'react';
import { AdminLayout } from '../component';

class AdminUsersPage extends Component {
    constructor(props) {
        super(props);
        this.state =  {
            loading: true,
            users: [],
        }
    }

    async componentDidMount() {
      
    }

    render() {

        return (
            <AdminLayout isHeader={true}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xs-12 col-sm-12 col-md-10 col-lg-9">
                            <div className="card my-5">
                                <div className="card-body cardbody-color text-center">
                                    <h1>Usuarios</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>   
        );
    }
}

export default AdminUsersPage;