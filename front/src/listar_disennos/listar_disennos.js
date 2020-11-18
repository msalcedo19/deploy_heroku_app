import React from 'react';
import './listar_disennos.css';
import {Link, useRouteMatch} from "react-router-dom";
import Config from "../config";
import {Col, Row, Toast} from "react-bootstrap";

class Disenno extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            id: props.id['id'] !== undefined ? props.id['id']: props.id,
            proyecto: props.proyecto
        }
        this.getDesign = this.getDesign.bind(this);
        this.downloadImage = this.downloadImage.bind(this);
        this.downloadImageProcesada = this.downloadImageProcesada.bind(this);
    }

    componentDidMount() {
        var url = Config.urlBack+"/"+Config.proyecto+"/"+this.state.proyecto+"/"+Config.disenno+"/"+ this.state.id;

        fetch(url, {
            method: 'GET',
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                if (response != null && response.length !== 0) {
                    this.setState({
                        data: response
                    })
                }
            });
    }

    getDesign(){
        if(this.state.data.estado){
            return <div className="card text-center disenno_v2">
                <div className="card-body">
                    {!this.state.data.estado?
                        <div className="rotation">
                                        <span className="icon">
                                            <i className="fas fa-spinner"> </i>
                                        </span>
                        </div>
                        :
                        <img src={`data:image/png;base64,${this.state.data.diseno_original}`} className="card-img design_image" alt="..."></img>
                    }
                </div>
            </div>
        }
    }

    downloadImage(){
        let filename = prompt("Guardar como",""),
            link = document.createElement('a');

        if (filename == null){//si el usiario dio cancelar
            return;
        }
        else if (filename === ""){//si el usuario le dio click y no puso nombre al archivo
            link.download = "Sin título";
            link.href = `data:image/png;base64,${this.state.data.diseno_original}`;//usa la imagen del canvas
        }
        else{//si el usuario le dio aceptar y puso un nombre al archivo
            link.download = filename;
            link.href = `data:image/png;base64,${this.state.data.diseno_original}`;
        }
        link.click();
    }
    downloadImageProcesada(){
        let filename = prompt("Guardar como",""),
            link = document.createElement('a');

        if (filename == null){//si el usiario dio cancelar
            return;
        }
        else if (filename === ""){//si el usuario le dio click y no puso nombre al archivo
            link.download = "Sin título";
            link.href = `data:image/png;base64,${this.state.data.diseno_procesado}`;//usa la imagen del canvas
        }
        else{//si el usuario le dio aceptar y puso un nombre al archivo
            link.download = filename;
            link.href = `data:image/png;base64,${this.state.data.diseno_procesado}`;
        }
        link.click();
    }

    render() {
        return (
            <div className="col mb-4">
                    {localStorage.getItem('token') ?
                        <div className="card text-center disenno">
                            <div className="card-header">{this.state.data.estado ? 'Disponible' : ' Procesando'}</div>
                            <div className="card-body">
                                <h5 className="card-title email">{this.state.data.email}</h5>
                                <p className="card-text author">Diseñador: {this.state.data.nombre_disenador} {this.state.data.apellido_disenador}</p>
                                <p className="card-text">
                                    <small className="text-muted">Subido el {this.state.data.fecha_publicacion}</small>
                                </p>
                                {!this.state.data.estado?
                                    <div className="rotation">
                                    <span className="icon">
                                        <i className="fas fa-spinner"> </i>
                                    </span>
                                    </div>
                                    :
                                    <img src={`data:image/png;base64,${this.state.data.diseno_procesado}`} className="card-img design_image" alt="imagen_diseño"></img>
                                }
                                <h5 className="card-title precio">Precio: $ {this.state.data.precio}</h5>
                             </div>
                            <div className="card-footer footer_disenno">
                                <div className="col-6">
                                    <div className="row justify-content-center download" onClick={this.downloadImage}>
                                        <p>Original</p>
                                        <span className="download_icon">
                                            <i className="fas fa-download"> </i>
                                        </span>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="row justify-content-center download" onClick={this.downloadImageProcesada}>
                                        <p>Convertido</p>
                                        <span className="download_icon">
                                            <i className="fas fa-download"> </i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    :
                        this.getDesign()
                    }

        </div>
        );
    }
}

class ListarDisennos extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            disennos: props.disennos,
            proyecto: props.proyecto,
            offset: 10,
            pageCount: 1,
            showToast: props.showToast !== undefined ? props.showToast: false
          }

    }

    componentDidMount() {
        if(this.state.disennos === undefined || this.state.disennos.length === 0){
            var url = Config.urlBack+"/"+Config.proyecto+"/"+this.state.proyecto.id+"/"+Config.disenno+"/";

            fetch(url, {
                method: 'GET',
                headers: {
                    "Authorization": "Token " + localStorage.getItem("token")
                }// data can be `string` or {object}!
            }).then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                    if (response != null && response.length !== 0) {
                        this.setState({
                            disennos: response
                        })
                    }
                });
        }
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
                    <li className="page-item"><span className="page-link" key={index} onClick={()=>this.handlePageClick(index)}>{index}</span></li>)
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
        if(!localStorage.getItem('token'))
            return <div className="col mb-4 text-center add_icon">
                <Link
                    to={{
                        pathname: `${this.props.path_url.url}/create_design`,
                        state: { proyecto: this.state.proyecto, disennos: this.state.disennos, path_url: this.props.path_url }
                    }}>
                                <span>
                                    <i className="fas fa-plus-circle"></i>
                                </span>
                </Link>

                {this.state.disennos.length === 0 ? <h5>No tienes diseños aún</h5> :
                    <h5>Añadir nuevo diseño</h5>}
            </div>
    }


    render() {
        return (
            <div>
                <Row className="form-signin">
                    <Col xs={12}>
                        <Toast onClose={() => this.setState({showToast: !this.state.showToast})} show={this.state.showToast} delay={3000} autohide>
                            <Toast.Header>
                                <strong className="mr-auto">Confirmación</strong>
                            </Toast.Header>
                            <Toast.Body>Hemos recibido tu diseño y lo estamos procesado para que
                                sea publicado</Toast.Body>
                        </Toast>
                    </Col>
                </Row>
                <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                    <h1 className="display-4">Diseños ({this.state.proyecto.nombre})</h1>
                </div>

                <div className="container">
                    <div className="row row-cols-3">

                        {this.add_icon()}
                        {
                            this.state.disennos.map((pro,index) =>
                                <Disenno key={index} id={pro} proyecto={this.state.proyecto.id}/>
                            )
                        }

                    </div>

                    {this.state.offset > 10 ? this.create_navigation() : <></>}
                </div>
            </div>
        );
    }
}

function ListDesings(props) {
    return (
        <ListarDisennos path_url={useRouteMatch()} proyecto={props.location.state.proyecto}
                         disennos={props.location.state.disennos} showToast={props.location.state.showToast}/>
    );
}

export default ListDesings;
