import React from "react";
import './create_disenno.css'
import Config from "../config";
import {Redirect} from "react-router-dom";

class CrearDisenno extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            isCreate: false,
            proyecto: props.location.state !== undefined ? props.location.state.proyecto : ''
        }

        this.verificarForm = this.verificarForm.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    verificarForm(){

        var forms = document.getElementsByClassName('needs-validation')
        var comp = this;
        // Loop over them and prevent submission
        Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault()
                    event.stopPropagation()
                }
                else{
                    event.preventDefault()
                    event.stopPropagation()

                    var info = {...comp.state};
                    delete info.isCreate

                    var url = Config.urlBack+"/"+Config.proyecto+"/"+comp.state.proyecto.id+"/"+Config.disenno+"/";
                    var method = 'POST';

                    var data = new FormData();
                    data.append('estado', false);
                    data.append('proyecto', comp.state.proyecto.id);
                    for(const e in info){
                        data.append(e.toString(),info[e]);
                    }

                    let blobFile = document.getElementById('imagen').files[0];
                    let img = new Image();
                    img.onload = function (){
                        if(this.width<800 || this.height<600)
                            alert('La imagen debe ser minimo de 800x600');
                        else{
                            data.append('diseno_original', blobFile);
                            fetch(url, {
                                method: method,
                                body: data
                            }).then(res => res.json())
                                .catch(error => console.error('Error:', error))
                                .then(response => {
                                    comp.setState({
                                        isCreate: true
                                    });
                                });
                        }
                    }
                    img.src = URL.createObjectURL(blobFile);

                    /*fetch(url, {
                        method: method,
                        body: data,
                        headers:{
                            "Authorization": "Token " + localStorage.getItem("token")
                        }// data can be `string` or {object}!
                    }).then(res => res.json())
                        .catch(error => console.error('Error:', error))
                        .then(response => {
                            comp.setState({
                                isCreate: true
                            });
                        });*/
                }
                form.classList.add('was-validated')
            }, false)
        })
    }

    render() {
        return (
            this.state.isCreate ?
                <Redirect to={{
                    pathname: `${this.props.location.state.path_url.url}`,
                    state:{showToast: true, disennos: this.props.location.state.disennos,
                        proyecto: this.state.proyecto}
                }}/>
                :
                <div className="container">
                    <div className="py-5 text-center">
                        <h2>Subir Diseño</h2>
                        <p className="lead">A continuación se le mostrara diferentes campos que debe completar.
                            Por favor rellene todos los campos y oprima en el botón <b>Crear Diseño</b></p>
                    </div>

                    <div className="row justify-content-center">

                        <div className="col-md-8">
                            <form className="needs-validation" noValidate>
                                <div className="row">
                                    <div className="col-md mb-3">
                                        <label htmlFor="nombreDiseñador">Nombre<span className="text-muted">(Obligatorio)</span></label>

                                        <input type="text" className="form-control" id="nombreDiseñador" name="nombre_disenador"
                                               onChange={this.handleInputChange} placeholder="Ingrese su nombre completo" required/>

                                        <div className="invalid-feedback">
                                            El nombre del diseñador es obligatorio.
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md mb-3">
                                        <label htmlFor="apellidoDiseñador">Apellido<span className="text-muted">(Obligatorio)</span></label>

                                        <input type="text" className="form-control" id="apellidoDiseñador" name="apellido_disenador"
                                               onChange={this.handleInputChange} placeholder="Ingrese sus apellidos" required/>

                                        <div className="invalid-feedback">
                                            Los apellidos son obligatorios.
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md mb-3">
                                        <label htmlFor="inputEmail" >Correo Electrónico</label>
                                        <input type="email" onChange={this.handleInputChange} id="inputEmail"
                                               name="email_disenador" className="form-control"
                                               placeholder="Ingresa tu correo electrónico" required/>
                                        <div className="invalid-feedback">
                                            Por favor ingresa un correo electrónico valido.
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="valor">Valor del Diseño<span className="text-muted">(Obligatorio)</span></label>
                                        <input type="number" className="form-control" id="valor" name="precio"
                                               onChange={this.handleInputChange} placeholder="Ingrese un valor" required/>
                                    <div className="invalid-feedback">
                                        El valor es obligatorio.
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <div className="row">
                                        <div className="col-12"><label htmlFor="valor">Subir diseño<span
                                            className="text-muted">(Obligatorio)</span></label>
                                        </div></div>
                                    <input type="file"id="imagen"/>
                                </div>

                                <button className="btn btn-primary btn-lg btn-block" type="submit" onClick={this.verificarForm}>Crear Diseño</button>
                            </form>
                        </div>
                    </div>
                </div>
        );
    }
}

export default CrearDisenno;
