import React from 'react';
import {
    Link
} from "react-router-dom";

class Footer extends React.Component {
    render() {
        return <footer className="pt-4 my-md-5 pt-md-5 border-top">
                <div className="row">
                    <div className="col-12 col-md"/>
                    <div className="col-6 col-md">
                        <h5>Ingreso</h5>
                        <ul className="list-unstyled text-small">
                            <li>
                                <Link to={{pathname:"/", state:{login: true}}}>
                                    <span className="text-muted">
                                        Login
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link to={{pathname:"/", state:{login: false}}}>
                                    <span className="text-muted">
                                        Registrarse
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-6 col-md">
                    </div>
                    <div className="col-6 col-md">
                        <h5>About</h5>
                        <ul className="list-unstyled text-small">
                            <li><a className="text-muted" href="#">GitHub</a></li>
                            <li><a className="text-muted" href="https://es.reactjs.org/">React</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
    }
}

export default Footer;