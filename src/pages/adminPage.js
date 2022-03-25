import React, { Component }  from 'react';
import { AdminLayout } from '../component';
import "../assets/css/pages/login.css";

class AdminPage extends Component {
    constructor(props) {     
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            
        }
    }
       handleSubmit = (e) => {
           
        };

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

export default AdminPage;