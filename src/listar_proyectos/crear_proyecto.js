import React from "react";
import './create_proyecto.css'
import Config from "../config";
import {Redirect} from "react-router-dom";

class CrearProyecto extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      isUpdate: props.location.state === undefined ? false : props.location.state.isUpdate,
      isCreate: false,
      data: props.location.state === undefined ? {} : props.location.state.data !== undefined ? props.location.state.data : {}
    }

    this.verificarForm = this.verificarForm.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
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
          delete info.isUpdate
          delete info.isCreate

          var url = Config.urlBack+"/"+Config.proyecto+"/";
          var method = 'POST';
          if(comp.state.isUpdate){
            url += info.data.id;
            method = 'PUT'
          }
          else
            delete info.data;


          console.log(info);
          var data = new FormData();
          for(const e in info){
            if(e !== 'data'){
              data.delete(e.toString());
              data.append(e.toString(),info[e]);
            }
            else{
              for(const k in info[e]){
                data.append(k.toString(),info[e][k]);
              }
            }
          }

          fetch(url, {
            method: method,
            body: data,
            headers:{
              "Authorization": "Token " + localStorage.getItem("token")
            }// data can be `string` or {object}!
          }).then(res => res.json())
              .catch(error => console.error('Error:', error))
              .then(_ => {
                comp.setState({
                  isCreate: true
                });
              });
        }
        form.classList.add('was-validated')
      }, false)
    })
  }

  deleteProject(){
    var forms = document.getElementsByClassName('needs-validation')
    var comp = this;

    Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
          event.preventDefault()
          event.stopPropagation()

          var info = {...comp.state};
          var url = Config.urlBack+"/"+Config.proyecto+"/";

          if(comp.state.isUpdate){
            url += info.data.id;
          }

          fetch(url, {
            method: 'DELETE',
            headers:{
              "Authorization": "Token " + localStorage.getItem("token")
            }// data can be `string` or {object}!
          }).then(res => res.json())
              .catch(error => console.error('Error:', error))
              .then(_ => {
                comp.setState({
                  isCreate: true
                });
              });
      }, false)
    })
  }

  render() {
    return (
        this.state.isCreate ?
            <Redirect to={{
              pathname: "/main",
            }}/>
            :
        <div className="container">
          <div className="py-5 text-center">
              <h2>{this.state.isUpdate ? 'Actualizar':'Crear'} Proyecto</h2>
              {this.state.isUpdate ?
                <p className="lead">A continuación se le mostrara la información relacionada con el proyecto. Por favor
                  modifique los campos que crea necesarios y oprima el botón <b>Actualizar proyecto</b></p>
                :
                  <p className="lead">A continuación se le mostrara diferentes campos que debe completar.
                    Por favor rellene todos los campos y oprima en el botón <b>Crear proyecto</b></p>
              }
          </div>

          <div className="row justify-content-center">

            <div className={this.state.isUpdate ? "col-md-8 order-md-1": "col-md-8"}>
              <form className="needs-validation" noValidate>
                <div className="row">
                  <div className="col-md mb-3">
                    <label htmlFor="nombreProyecto">Nombre Proyecto<span className="text-muted">(Obligatorio)</span></label>
                    {this.state.isUpdate ?
                        <input type="text" className="form-control" id="nombreProyecto" name="nombre"
                               onChange={this.handleInputChange} placeholder={this.state.data.nombre} />
                               :
                        <input type="text" className="form-control" id="nombreProyecto" name="nombre"
                               onChange={this.handleInputChange} placeholder="Ingrese un nombre" required/>
                    }
                    <div className="invalid-feedback">
                      El nombre del proyecto es obligatorio.
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="descripccion">Descripción<span className="text-muted">(Obligatorio)</span></label>
                  {this.state.isUpdate ?
                      <textarea rows="3" className="form-control" id="descripccion" name="descripcion"
                                onChange={this.handleInputChange} placeholder={this.state.data.descripcion}/>
                      :
                      <textarea rows="3" className="form-control" id="descripccion" name="descripcion"
                                onChange={this.handleInputChange} placeholder="Ingrese una descripción" required/>
                  }
                  <div className="invalid-feedback">
                    Por favor ingresa una descripción.
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="valor">Valor Estimado a Pagar<span className="text-muted">(Obligatorio)</span></label>
                  {this.state.isUpdate ?
                      <input type="number" className="form-control" id="valor" name="valor"
                             onChange={this.handleInputChange} placeholder={this.state.data.valor} />
                      :
                      <input type="number" className="form-control" id="valor" name="valor"
                             onChange={this.handleInputChange} placeholder="Ingrese un valor a pagar" required/>
                  }

                  <div className="invalid-feedback">
                    El valor es obligatorio.
                  </div>
                </div>

                <button className="btn btn-primary btn-lg btn-block" type="submit" onClick={this.verificarForm}>{this.state.isUpdate ? 'Actualizar':'Crear'} Proyecto</button>
                  {
                    this.state.isUpdate ?
                    <button className="btn btn-danger btn-lg btn-block" type="submit" onClick={this.deleteProject}>Eliminar</button>
                        :
                        <div></div>
                  }
              </form>
            </div>
          </div>
        </div>
    );
  }
}

export default CrearProyecto;
