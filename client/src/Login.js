import React from 'react';
import styled from 'styled-components';

const StylesLogin = styled.div``;

export default function Login(props) {
    return (
        <>
            {
                props.loginLoading 
                ?   <StylesLogin>
                        <h2>Loggin in...</h2>   
                    </StylesLogin>
                :   <StylesLogin onSubmit={props.loginUserHandler}>
                        <h2>Login</h2>
                        <input 
                            type="text"
                            value={props.username}
                            name='username'
                            onChange={props.inputChangeHandler}
                            placeholder='username'
                        />
                        <input 
                            type="password"
                            value={props.password}
                            name="password"
                            onChange={props.inputChangeHandler}
                            placeholder="password"
                        />
                        <button type="submit">Sign in</button>
                    </StylesLogin>
            }
        </>
    );
}