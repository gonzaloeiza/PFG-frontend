import React, { Component }  from 'react';
import { AdminLayout, BlueCard, AdminToolCard } from '../component';

class AdminPage extends Component {
    constructor(props) {     
        super(props);
        this.state = {
            
        }
    }

    render() {
        return (
            <AdminLayout isHeader={true}>
                <BlueCard>
                    <div>
                        <h1>Página de administración</h1>
                    </div>
                </BlueCard>
                <div className="container">
                    <div className="row justify-content-around gy-4">
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                            <AdminToolCard 
                                tittle="Solicitudes de registro"
                                icon="bi bi-person-check-fill"
                                body="Aquí podrás aceptar o rechazar una solicitud de registro"
                                color="#FEF432"
                                href="/admin/pendingUsers"
                                />
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                            <AdminToolCard 
                                tittle="Usuarios"
                                icon="bi bi-people-fill"
                                body="Aquí podrás buscar y visualizar a todos los usuarios y sus datos"
                                color="#F77979"
                                href="/admin/users"
                            />
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                            <AdminToolCard 
                                tittle="Reservas"
                                icon="bi bi-bookmark-dash-fill"
                                body="Aquí podrás buscar, visualizar y modificar cualquier reserva"
                                color="#A0FF9C"
                                href="/admin/bookings"
                            />
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                            <AdminToolCard 
                                tittle="Pistas"
                                icon="bi bi-journal-text"
                                body="Aquí podrás visualizar, modificar, eliminar y crear las pistas"
                                color="#85C8FF"
                                href="/admin/courts"
                            />
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                            <AdminToolCard 
                                tittle="Ajustes"
                                icon="bi bi-gear-fill"
                                body="Aquí podrás acceder a los ajustes de los administradores"
                                color="#FFCE5C"
                                href="/admin/settings"
                            />
                        </div>
                    </div>
                </div>
            </AdminLayout>   
        ); 
    }
}

export default AdminPage;