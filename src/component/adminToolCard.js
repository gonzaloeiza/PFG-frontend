import React from 'react'


const AdminToolCard = (props) => {

    return (
        <div className="card card-admin-tools h-100">
           <div className="row no-gutters">
                <div className="col-md-4">
                    <div className="text-white d-flex">
                        <div className="card-body">
                            <i className={props.icon} style={{"fontSize": "5rem", "color": `${props.color}`}}></i>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                <div className="card-body">
                    <h5 className="card-title">{props.tittle}</h5>
                    <p className="card-text">{props.body}</p>
                    <a href={props.href} className="stretched-link"> </a>
                </div>
                </div>
            </div>
        </div>
    );
}
    
    export default AdminToolCard;