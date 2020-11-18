import React from 'react';
import
{
    Link,
    Redirect,
    Route,
    Switch,
    useRouteMatch
} from 'react-router-dom';
import ListDesings from "../listar_disennos/listar_disennos";
import ListarProyectos from "../listar_proyectos/listar_proyectos";
import CrearProyecto from "../listar_proyectos/crear_proyecto";

class PagPrincipal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogged: true,
            url_empresa: localStorage.getItem('url')
        }
        this.logOut = this.logOut.bind(this);
    }


    logOut(){
        localStorage.removeItem('token');
        localStorage.removeItem('url');
        this.setState({
            isLogged: false
        });
    }

    render() {
        return this.state.isLogged ?
            <div>
                <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
                    <h5 className="my-0 mr-md-auto font-weight-normal">{this.state.url_empresa !== undefined ? 'Dominio: '+ this.state.url_empresa : 'Bienvenido'}</h5>
                        <nav className="my-2 my-md-0 mr-md-3">
                            <Link to={{
                                pathname: '/'
                            }}>
                                <span className="p-2 text-dark">
                                    Home
                                </span>
                            </Link>
                            <Link to={{
                                pathname: '/main'
                            }}>
                                <span className="p-2 text-dark">
                                    Ver Proyectos
                                </span>
                            </Link>
                            <Link to={{
                                pathname: `${this.props.path_url.path}/create_project`,
                                state: { isUpdate: false }
                            }}>
                                <span className="p-2 text-dark">
                                    Crear Proyecto
                                </span>
                            </Link>
                        </nav>
                        <Link to="/">
                            <button className="btn btn-outline-primary" onClick={this.logOut}> Salir</button>
                        </Link>
                </div>
                <Switch>
                    <Route path={`${this.props.path_url.path}/create_project`} exact component={CrearProyecto}/>
                    <Route path={`${this.props.path_url.path}`} exact><ListarProyectos path_url={this.props.path_url}/></Route>
                    <Route path={`${this.props.path_url.path}/designs`} exact component={ListDesings}/>
                </Switch>
            </div>
            :<Redirect to="/login" />
    }
}

function MainAdmin() {
    return (
        <PagPrincipal path_url={useRouteMatch()}/>
    );
}

export default MainAdmin;