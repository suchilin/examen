import React, { Component } from 'react';
import { BrowserRouter as Router,
    Route,
    Link,
    Redirect
} from 'react-router-dom';
import Login from './login';
import "./index.scss";
import ListAllEnfermedades from './cpanel/enfermedad/list'
import ListAllUsers from './cpanel/users/list'
import CreateOneEnfermedad from './cpanel/enfermedad/create'
import CreateOneUser from './cpanel/users/create'
import ReadOneEnfermedad from './cpanel/enfermedad/read'
var auth = require('./auth')

class Home extends Component{
    render(){
        return(<h1>Home</h1>)
    }
}

class Header extends Component{
    render(){
        return(
            <div>
            </div>
            )
    }
}

class Footer extends Component{
    render(){
        return(<div className="search-footer pagination"></div>)
    }
}

class Logout extends Component{
    componentDidMount(){
        auth.logout()
    }
    render(){
        return(
                <Redirect to={{
                    pathname: '/login',
                    state: { from: this.props.location }
                  }}/>
        )
    }
}

class NavBar extends Component{
  render() {
    return (
        <div>
            <Link to='/'><i className='mdi mdi-home'/>Inicio</Link>
            {
              auth.getTypeUser()['tipo']==='M' || auth.getTypeUser()['tipo']==='A'
            ?
              <Link to="/enfermedad/list">Enfermedades</Link>
            :""}
            {
              auth.getTypeUser()['tipo'] === 'A'
            ?
            <Link to="/user/list">Usuarios</Link>
            :""}
            {auth.loggedIn() ? <Link to="/logout"><i className="mdi mdi-logout" />Cerrar sesion</Link>:<Link to="/login/"><i className="mdi mdi-login" />Iniciar sesion</Link>}
        </div>
    );
  }
};

class MainLayout extends Component{
  render() {
    return (
        <Router>
            <div>
                <NavBar />
                <Header />
                <main>
                    <Route exact path="/" component={Home} />
                    <PrivateRoute exact path="/enfermedad/list" component={ListAllEnfermedades} />
                    <PrivateRouteA exact path="/user/list" component={ListAllUsers} />
                    <PrivateRoute exact path="/enfermedad/create" component={CreateOneEnfermedad} />
                    <PrivateRouteA exact path="/user/create" component={CreateOneUser} />
                    <PrivateRoute path="/enfermedad/read/:pk" component={ReadOneEnfermedad} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/logout" component={Logout} />
                </main>
            </div>
        </Router>
    );
  }
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    auth.loggedIn() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const PrivateRouteA = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    auth.getTypeUser()['tipo'] === 'A' ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

export default MainLayout;
