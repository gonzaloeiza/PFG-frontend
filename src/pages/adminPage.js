import React, { Component }  from 'react';
import { AdminLayout, BlueCard } from '../component';

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
                <BlueCard>
                    <div>
                        <h1>Pagina admin</h1>
                    </div>
                </BlueCard>
            </AdminLayout>   
        ); 
    }
}

export default AdminPage;