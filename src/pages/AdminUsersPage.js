import React, { Component }  from 'react';
import { AdminLayout } from '../component';

class AdminUsersPage extends Component {
    constructor(props) {
        super(props);
        this.state =  {

        }
    }

    render() {
        return (
            <AdminLayout isHeader={true}>
                <div className="container">
                   <h1>admin</h1>
                </div>
            </AdminLayout>   
        );
    }
}

export default AdminUsersPage;