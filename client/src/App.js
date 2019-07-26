import React from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import Login from './Login';
import Register from './Register';
import PrivateRoute from './PrivateRoute';
import MainPage from './MainPage'

const StylesApp = styled.div``;

class App extends React.Component {
  state = {
    username: '',
    password: '',
  }

  // componentDidMount() {
  // }

  inputChangeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  loginUserHandler = (event) => {
    event.preventDefault();

    if(this.state.username.length >= 3 && this.state.password.length >= 3) {
      this.props.login({
        username: this.state.username,
        password: this.state.password
      }).then(() => {
        this.props.history.push("/jokes");
      }).catch(error => {
        console.log(error.message);
      })
  
      this.setState({
        username: '',
        password: ''
      })
    }
    this.props.history.push("/login");
  }

  passRegisteredUserHandler = () => {
    if(localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'));
      this.setState({
          username: user.username,
          email: user.email
      });
    }
  }

  render() {
    return (
      <StylesApp>
          <Switch>
            <Route 
              path="/login" 
              render={() => {
                return (
                  <Login 
                    username={this.state.username} 
                    password={this.state.password}
                    inputChangeHandler={this.inputChangeHandler}
                    loginUserHandler={this.loginUserHandler}
                  />
                );
              }}
            />
            <Route 
              path="/register" 
              render={(props) => {
                return <Register {...props} passRegisteredUserHandler={this.passRegisteredUserHandler} />
              }} />
            <PrivateRoute 
              path="/jokes" 
              component={MainPage}
            />
          </Switch>     
      </StylesApp>
    );
  }
}

export default App;
