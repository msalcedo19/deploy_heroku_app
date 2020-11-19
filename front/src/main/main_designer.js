import React from 'react';
import
{
    Link,
    Route,
    Switch,
    useRouteMatch,
    useParams
} from 'react-router-dom';
import ListDesings from "../listar_disennos/listar_disennos";
import ListarProyectos from "../listar_proyectos/listar_proyectos";
import CrearDisenno from "../listar_disennos/create_disenno";

class PagPrincipal extends React.Component {

    render() {
        return <div>
            <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
                <h5 className="my-0 mr-md-auto font-weight-normal">{this.props.url_empresa !== undefined ? 'Dominio: '+ this.props.url_empresa.empresaId : 'Bienvenido'}</h5>
                    <nav className="my-2 my-md-0 mr-md-3">
                        <Link to={{
                            pathname: `${this.props.path_url.url}`
                        }}>
                            <span className="p-2 text-dark">
                                Ver Proyectos
                            </span>
                        </Link>
                    </nav>
            </div>
            <Switch>
                <Route path={`${this.props.path_url.path}`} exact>
                    <ListarProyectos path_url={this.props.path_url} url_empresa={this.props.url_empresa.empresaId}/>
                </Route>
                <Route path={`${this.props.path_url.path}/designs/create_design`} exact component={CrearDisenno}/>
                <Route path={`${this.props.path_url.path}/designs`} exact component={ListDesings}/>
            </Switch>
        </div>
    }
}

function MainDesigner() {
    return (
        <PagPrincipal path_url={useRouteMatch()} url_empresa={useParams()}/>
    );
}

export default MainDesigner;