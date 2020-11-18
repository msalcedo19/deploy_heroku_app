import React from 'react';
import './ingreso_registro.css'
import {Toast, Row, Col} from 'react-bootstrap';
import
{
    Link,
    Redirect
} from 'react-router-dom';
import Config from "../config";

class IngresoRegistro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: !!localStorage.getItem('token'),
            isLogin: true,
            show: false
        }

        this.changeIsLogin = this.changeIsLogin.bind(this);
        this.verificarForm = this.verificarForm.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.setSession = this.setSession.bind(this);
    }

    changeIsLogin(){
        this.setState({
            isLogin: !this.state.isLogin
        })
    }

    setSession(token){
        if(token["token"]){
            localStorage.setItem("token", token["token"]);
            localStorage.setItem("url", token["url"]);
            this.setState({
                isLogged: true
            })
        }

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


        var data = {...this.state};
        delete data.isLogin;
        delete data.show;


        // Loop over them and prevent submission
        Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {

                    event.preventDefault();
                    event.stopPropagation();
                }
                else{
                    event.preventDefault();
                    event.stopPropagation();

                    var url = Config.urlBack+"/"+Config.empresa+'/create';
                    if(comp.state.isLogin) url = Config.urlBack+'/auth/';

                    var formData = new FormData();
                    for(const e in data){
                        formData.append(e.toString(),data[e]);
                    }

                    fetch(url, {
                        method: 'POST',
                        body: formData, // data can be `string` or {object}!
                    }).then(res => res.json())
                        .catch(error => console.error('Error:', error))
                        .then(response => {
                            if(response !== undefined && response["token"]){
                                comp.setSession(response)
                            }
                            else if(response !== undefined && response['email'])
                            {
                                url = Config.urlBack+"/auth/";
                                formData = new FormData();
                                formData.append('email', response['email']);
                                formData.append('contraseña', response['contraseña']);
                                fetch(url, {
                                    method: 'POST', // or 'PUT'
                                    body: formData, // data can be `string` or {object}!
                                }).then(res => res.json())
                                    .catch(error => console.error('Error:', error))
                                    .then(response => comp.setSession(response));
                            }
                            else{
                                comp.setState({show: !comp.state.show})
                            }
                        });
                }
                form.classList.add('was-validated')
            }, false)
        });
    }

    render() {
        return this.state.isLogged ?
            <Redirect to={{
                pathname: "/main"
            }}/>
            :<div>
                <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
                    <h5 className="my-0 mr-md-auto font-weight-normal">Bienvenido</h5>
                        <Link to={{
                            pathname: '/'
                        }}>
                                <span className="p-2 text-dark">
                                    Home
                                </span>
                        </Link>
                        <Link to="/login">
                            <button className="btn btn-outline-primary" onClick={this.changeIsLogin}> {this.state.isLogin ? 'Registrarse' : 'Ingresar'}</button>
                        </Link>
                </div>

                <div className="text-center login_signup">
                    <Row className="form-signin">
                        <Col xs={12}>
                            <Toast onClose={() => this.setState({show: !this.state.show})} show={this.state.show} delay={10000} autohide>
                                <Toast.Header>
                                    <strong className="mr-auto">{this.state.isLogin ? 'Ingreso': 'Registro'} Fallido</strong>
                                </Toast.Header>
                                <Toast.Body>Por favor vuelve a intentarlo.</Toast.Body>
                            </Toast>
                        </Col>
                    </Row>

                    {this.state.isLogin ?
                        <form className="form-signin needs-validation" noValidate>
                            <h1 className="h3 mb-3 font-weight-normal">Por favor Ingresa</h1>

                            <label htmlFor="inputEmail" className="sr-only">Correo Electrónico</label>
                            <input type="email" onChange={this.handleInputChange} id="inputEmail" name="email" className="form-control" placeholder="Correo Electrónico" required
                                   autoFocus/>
                            <div className="invalid-feedback">
                                Por favor ingresa un correo electrónico valido.
                            </div>
                            <label htmlFor="inputPassword" className="sr-only">Contraseña</label>
                            <input type="password" onChange={this.handleInputChange} id="inputPassword" name="contraseña" className="form-control" placeholder="Contraseña"
                                   required/>
                            <div className="invalid-feedback">
                                Ingresa una contraseña.
                            </div>
                            <div className="etc-login-form">
                                <p>No tienes una cuenta aún? <strong className="signUp" onClick={this.changeIsLogin}>Registrate Aquí</strong></p>
                            </div>
                            <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.verificarForm}>Ingresa</button>
                        </form>

                        :
                        <form className="form-signin needs-validation" noValidate>
                            <h1 className="h3 mb-3 font-weight-normal">Por favor Registrate</h1>
                            <label htmlFor="inputNombreEmpresa" className="sr-only">Nombre Empresa</label>
                            <input type="text" onChange={this.handleInputChange} id="inputNombreEmpresa" name="nombre" className="form-control" placeholder="Empresa" required
                                   autoFocus/>
                            <div className="invalid-feedback">
                                El nombre de la empresa es requerido.
                            </div>
                            <label htmlFor="inputEmail" className="sr-only">Correo Electrónico</label>
                            <input type="email" onChange={this.handleInputChange} id="inputEmail" className="form-control" name="email" placeholder="Correo Electrónico" required/>
                            <div className="invalid-feedback">
                                Por favor ingresa un correo electrónico valido.
                            </div>
                            <label htmlFor="inputPassword" className="sr-only">Contraseña</label>
                            <input type="password" onChange={this.handleInputChange} id="inputPassword" className="form-control" name="contraseña" placeholder="Contraseña"
                                   required/>
                            <div className="invalid-feedback">
                                Se requiere una contraseña para continuar.
                            </div>
                            <label htmlFor="inputConfirmPassword" className="sr-only">Confirmar Contraseña</label>
                            <input type="password" id="inputConfirmPassword" className="form-control" name="contraseña2" placeholder="Repite la Contraseña"
                                   required/>
                            <div className="etc-login-form">
                                <p>ya tienes una cuenta? <strong className="signUp" onClick={this.changeIsLogin}>Ingresa Aquí</strong></p>
                            </div>
                            <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.verificarForm}>Registrate</button>
                        </form>

                    }
                </div>
            </div>
    }
}

export default IngresoRegistro;


