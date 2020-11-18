import React from 'react';
import './listar_proyectos.css';
import {
    Link
} from "react-router-dom";
import Config from "../config";

class Projecto extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: props.informacion,
            disennos: props.disennos
        }
    }

    render() {
        return(
            <div className="col mb-4">
              <div className="card mb-4 shadow-sm projecto">
                  <div className="card-header cabezera_projecto">
                      <h4 className="my-0 font-weight-normal">{this.state.data.nombre}</h4>
                      {localStorage.getItem('token') ?
                        <Link
                          to={{
                              pathname: `${this.props.path_url.url}/create_project`,
                              state: {isUpdate: true, data: this.state.data}
                          }}>
                            <span className="icon_edit">
                                <i className="fas fa-edit"></i>
                            </span>
                        </Link>
                          :<></>
                      }
                  </div>
                  <div className="card-body">
                      <h1 className="card-title pricing-card-title">${this.state.data.valor}<small className="text-muted">/
                          COP</small></h1>
                      <p className="card-text">{this.state.data.descripcion}</p>
                      <Link
                          to={{
                              pathname: `${this.props.path_url.url}/designs`,
                              state: { disennos: this.state.disennos, proyecto: this.state.data, }
                          }}>
                          <button type="button" className="btn btn-lg btn-block btn-outline-primary ir_boton">Ir
                          </button>
                      </Link>
                  </div>
              </div>
            </div>
        );
    }
}

class ListarProyectos extends  React.Component {

    constructor(props) {
        super(props);
        this.state ={
            path_url: props.path_url,
            proyectos: [],
            offset: 10,
            pageCount: 1
        }
    }

    componentDidMount() {
        this.loadProjectsFromServer();
    }

    loadProjectsFromServer(){
        let empresa_url = localStorage.getItem('url');
        let url = Config.urlBack+"/"+Config.empresa+"/"+empresa_url+"/"+Config.proyecto+"/";
        if(!empresa_url)
            url = Config.urlBack+"/"+Config.empresa+"/"+this.props.url_empresa+"/"+Config.proyecto+"/";
        fetch(url, {
            method: 'GET'
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                if (response != null && response.length !== 0) {
                    let arr = response.filter(entry => entry) // Created after X
                        .slice((this.state.pageCount - 1) * 10, this.state.offset);
                    this.setState({
                        proyectos: arr,
                        offset: response.length
                    });
                }
            });
        /*let response_v2 = [{id: 'id1', nombre: 'nombre', valor: 1000, descripcion:'...'},
            {id: 'id2', nombre: 'nombre', valor: 2000, descripcion:'...'},
            {id: 'id3', nombre: 'nombre', valor: 3000, descripcion:'...'},
            {id: 'id4', nombre: 'nombre', valor: 4000, descripcion:'...'},
            {id: 'id5', nombre: 'nombre', valor: 5000, descripcion:'...'},
            {id: 'id6', nombre: 'nombre', valor: 6000, descripcion:'...'},
            {id: 'id7', nombre: 'nombre', valor: 7000, descripcion:'...'},
            {id: 'id8', nombre: 'nombre', valor: 8000, descripcion:'...'},
            {id: 'id9', nombre: 'nombre', valor: 9000, descripcion:'...'},
            {id: 'id10', nombre: 'nombre', valor: 10000, descripcion:'...'},
            {id: 'id11', nombre: 'nombre', valor: 11000, descripcion:'...'},
            {id: 'id12', nombre: 'nombre', valor: 12000, descripcion:'...'},
            {id: 'id13', nombre: 'nombre', valor: 13000, descripcion:'...'}];
        let arr = response_v2.filter(entry => entry ) // Created after X
            .slice((this.state.pageCount-1)*10, this.state.offset);
        this.setState({
            proyectos: arr,
            offset: response_v2.length
        });*/

    }

    handlePageClick = (index) => {
        let offset = Math.ceil(index * 10);

        this.setState({ offset: offset, pageCount: index }, () => {
            this.loadProjectsFromServer();
        });
    };

    previous = () =>{
        if(this.state.pageCount > 1){
            let pagNum = this.state.pageCount-1
            let offset = Math.ceil(pagNum * 10);
            this.setState({ offset: offset, pageCount: pagNum }, () => {
                this.loadProjectsFromServer();
            });
        }
    }

    next = () =>{
        if(this.state.pageCount < Math.ceil(this.state.offset / 10)){
            this.setState({ pageCount: this.state.pageCount+1 }, () => {
                this.loadProjectsFromServer();
            });
        }
    }

    create_navigation(){
        let pageCount = Math.ceil(this.state.offset / 10);
        let links = []
        for(var i=1; i<=pageCount;i++){
            links.push(i)
        }

        return <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                <li className="page-item">
                    <span className="page-link" onClick={()=>this.previous()} aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </span>
                </li>
                {links.map(index =>
                    <li className="page-item" key={index}><span className="page-link" onClick={()=>this.handlePageClick(index)}>{index}</span></li>)
                }
                <li className="page-item">
                    <span className="page-link" onClick={()=>this.next()} aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </span>
                </li>
            </ul>
        </nav>
    }

    add_icon(){
        if(localStorage.getItem('token'))
            return <div className="col mb-4 text-center add_icon">
                <Link
                    to={{
                        pathname: `${this.state.path_url.url}/create_project`,
                        state: { isUpdate: false }
                    }}>
                        <span>
                            <i className="fas fa-plus-circle"></i>
                        </span>
                </Link>
                {this.state.proyectos.length === 0 ? <h5>No tienes proyectos aún</h5> :
                    <h5>Añadir nuevo proyecto</h5>}
            </div>
    }

    render() {
        return (
            <div>

                <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                    <h1 className="display-4">Proyectos</h1>
                </div>

                <div className="container">
                    <div className="row row-cols-3">

                        {this.add_icon()}

                        {
                            this.state.proyectos.map(pro =>
                                <Projecto key={pro.id} informacion={{id:pro.id, nombre: pro.nombre, valor: pro.valor, descripcion: pro.descripcion,
                                }} disennos={pro.diseños} path_url={this.state.path_url}/>
                            )
                        }

                    </div>

                    {this.state.offset > 10 ? this.create_navigation() : <></>}

                </div>
            </div>
        );
    }
}

export default ListarProyectos;