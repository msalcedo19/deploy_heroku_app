import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from "./main/main"
import MainAdmin from "./main/main_admin";
import MainDesigner from "./main/main_designer";
import IngresoRegistro from "./ingreso_registro/ingreso_registro";
import Footer from "./footer/footer";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

const isAuthenticated = ()=> {
    let token = localStorage.getItem('token');
    return !!token;
};

const MyRoute = (props) =>{
    return isAuthenticated() ?
        <Route {...props}/>
        :<Redirect to="/login" />
}

function App (){
    return <>
        <Switch>
            <Route path="/" exact component={Home} />
            <MyRoute path="/main" component={MainAdmin} />
            <Route path="/login" exact component={IngresoRegistro}/>
            <Route path="/:empresaId" component={MainDesigner}/>
        </Switch>
    </>
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
