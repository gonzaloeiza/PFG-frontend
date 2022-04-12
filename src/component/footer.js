import React from 'react'

const Footer = props => {

    return (
        <footer className="text-center text-lg-start bg-light text-muted pt-5 my-5">
            <section className="d-flex justify-content-center justify-content-lg-between border-bottom">
                <div className="me-5 d-none d-lg-block ms-4">
                    <span>Siguenos es nuestras redes sociales:</span>
                </div>

                <div>
                    <a href="https://facebook.com" className="me-4 text-reset">
                        <i className="bi bi-facebook"></i>
                    </a>
                    <a href="https://twitter.com" className="me-4 text-reset">
                        <i className="bi bi-twitter"></i>
                    </a>
                    <a href="mailto:gonzaloeizaguirre@gmai.com" className="me-4 text-reset">
                        <i className="bi bi-google"></i>
                    </a>
                    <a href="https://https://instagram.com" className="me-4 text-reset">
                        <i className="bi bi-instagram"></i>
                    </a>
                </div>
            </section>

            <section>
                <div className="container text-center text-md-start mt-5">
                    <div className="row mt-3">
                        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">
                                <i className="fas fa-gem me-3"></i>
                                Padel play
                            </h6>
                            <p>
                                Tu club de padel de confianza con las mejores instalaciones y tecnologías.
                                Ven a jugar!
                            </p>
                        </div>

                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4 text-center">
                            <h6 className="text-uppercase fw-bold mb-4">
                                Redes Sociales
                            </h6>
                            <p>
                                <a href="#!" className="text-reset">Términos y condiciones</a>
                            </p>
                            <p>
                                <a href="#!" className="text-reset">Política de privacidad</a>
                            </p>
                            <p>
                                <a href="#!" className="text-reset">Política de cookies</a>
                            </p>
                            <p>
                                <a href="#!" className="text-reset">Condiciones de uso</a>
                            </p>
                        </div>

                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4 text-center">
                            <h6 className="text-uppercase fw-bold mb-4">
                                Páginas
                            </h6>
                            <p>
                                <a href="/" className="text-reset">Novedades</a>
                            </p>
                            <p>
                                <a href="/courts" className="text-reset">Pistas</a>
                            </p>
                            <p>
                                <a href="/booking" className="text-reset">Reservas</a>
                            </p>
                            <p>
                                <a href="/help" className="text-reset">Ayuda</a>
                            </p>
                        </div>

                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4 text-center">
                            <h6 className="text-uppercase fw-bold mb-4">
                                Contacto
                            </h6>
                            <p>
                                <i className="fas fa-home me-3"></i>
                                Arritugane 4, 48100 Mungia</p>
                            <p>
                                <i className="fas fa-envelope me-3"></i>
                                <a href="mailto:gonzaloeizaguirre@opendeusto.es">gonzaloeizaguirre@opendeusto.es</a>
                            </p>
                            <p>
                                <i className="fas fa-phone me-3"></i>
                                +34 658 223 752
                            </p>
                                <p><i className="fas fa-print me-3"></i>
                                +34 658 223 752 
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <div className="text-center p-4" style={{"backgroundColor": "rgba(0, 0, 0, 0.05)"}}>
                © 2022 Copyright: 
                <a className="text-reset fw-bold" href="https://mdbootstrap.com/">Play padel</a>
            </div>
        </footer>
    );
}

export default Footer