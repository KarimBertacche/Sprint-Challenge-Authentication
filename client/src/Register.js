import React, { Component } from 'react';
import styled from 'styled-components';

const StylesSignUp = styled.div``;

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    registerInputHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    registerUserHandler = (event) => {
        event.preventDefault();
    
        if(this.state.username.length >= 3 && this.state.password.length >= 3) {
            this.props.registerUser({
                username: this.state.username,
                password: this.state.password
            }).then(() => {
                this.props.passRegisteredUserHandler();
                this.props.history.push('/login')
            });
    
            this.setState({
                username: '',
                password: ''
            })
        } else {
            alert('make your username and password are at least 3 characters!');
        }
    }

    render() {
        return (
            <StylesSignUp onSubmit={this.registerUserHandler}>
                <h2>Register</h2>
                <input 
                    type="text"
                    value={this.state.username}
                    name='username'
                    onChange={this.registerInputHandler}
                    placeholder='username'
                    minLength="3"
                />
                <input 
                    type="password"
                    value={this.state.password}
                    name="password"
                    onChange={this.registerInputHandler}
                    placeholder="password"
                    minLength="3"
                />
                <button type="submit">Register</button>
            </StylesSignUp>
        );
    }
}

export default Register;