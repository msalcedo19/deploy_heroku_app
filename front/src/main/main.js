import React from 'react';
import './main.css'
import
{
    Link,
    useRouteMatch,
    Switch,
    Route
} from 'react-router-dom';
import ListDesings from "../listar_disennos/listar_disennos";
import ListarProyectos from "../listar_proyectos/listar_proyectos";
import CrearProyecto from "../listar_proyectos/crear_proyecto";

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogged: localStorage.getItem('token') !== undefined ,
            url_empresa: localStorage.getItem('url')
        }
        this.logOut = this.logOut.bind(this);
    }

    componentDidMount() {
        this.setState({
            isLogged: false
        })
    }

    logOut(){
        localStorage.removeItem('token');
        localStorage.removeItem('url');
        this.setState({
            isLogged: false
        });
    }

    render() {
        return <div>
            <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
                <h5 className="my-0 mr-md-auto font-weight-normal">{this.state.url_empresa !== null ? 'Dominio: '+ this.state.url_empresa : 'Bienvenido'}</h5>

                <nav className="my-2 my-md-0 mr-md-3">
                    <Link to={{
                        pathname: '/'
                    }}>
                            <span className="p-2 text-dark">
                                Home
                            </span>
                    </Link>
                    {localStorage.getItem('token')?
                        <>
                            <Link to={{
                                pathname: '/main'
                            }}>
                                    <span className="p-2 text-dark">
                                        Ver Proyectos
                                    </span>
                            </Link>
                            <Link to={{
                                pathname: `main/create_project`,
                                state: { isUpdate: false }
                            }}>
                                    <span className="p-2 text-dark">
                                        Crear Proyecto
                                    </span>
                            </Link>
                        </>
                        :<></>}
                </nav>

                <Link to="/login">
                    <button className="btn btn-outline-primary" onClick={this.logOut}>{localStorage.getItem('token') ? 'Salir':'Ingresar'}</button>
                </Link>
            </div>

            <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column text-center">
                <main role="main" className="inner cover">
                    <h1 className="cover-heading">SaaS</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis justo vestibulum,
                        malesuada libero sed, consequat leo. Quisque purus elit, semper sed euismod quis, sagittis id
                        felis. Suspendisse imperdiet vehicula laoreet. Aenean vel metus ut felis lobortis mollis sed
                        nec risus.</p>
                    <p>
                        <Link to={{
                            pathname: '/main'
                        }}>
                            {localStorage.getItem('token') ?
                                <button className="btn btn-lg btn-outline-primary">Proyectos</button>
                            :   <Link to="/login">
                                    <button className="btn btn-outline-primary">Ingresar</button>
                                </Link>}

                        </Link>
                        <Switch>
                            <Route path={`${this.props.path_url.path}/create_project`} exact component={CrearProyecto}/>
                            <Route path={`main`} exact><ListarProyectos path_url={this.props.path_url}/></Route>
                            <Route path={`${this.props.path_url.path}/designs`} exact component={ListDesings}/>
                        </Switch>
                    </p>
                </main>
            </div>
        </div>
    }
}

function Home() {
    return (
        <HomePage path_url={useRouteMatch()}/>
    );
}

export default Home;