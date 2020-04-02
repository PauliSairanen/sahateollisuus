import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/Auth';
import './Login.css';
//import LoginLost from "./assets/components/login/LoginLost";

const FormLogin = props => {

  // Pois kommentoidut ovat backendiä varten

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthTokens } = useAuth();
  const referer = '/eventsnavi' || props.location.state.referer;

  // const username = 'test';
  // const okpw = 'test';

  function postLogin() {
    axios.post("https://sahat.lamk.fi/authenticate", {
      userName,
      password
    }).then(result => {
      if (result.status === 200) {
        setAuthTokens(result.data);
        setLoggedIn(true);
      } else {
        setIsError(true);
      }
    }).catch(e => {
      setIsError(true);
    });
  }

  // function postLogin() {
  //   if ((userName === username) && (password === okpw)) {
  //     setAuthTokens(200)
  //     setLoggedIn(true) 
  //   }
  // }

  if (isLoggedIn) {
    return <Redirect to={referer} />;
  }

  return (
    <form autoComplete="off">
      <div className="centered">
        <div id="formLogin">
          <input 
            type="text" 
            placeholder="Login"
            onChange={e => {
              setUserName(e.target.value);
            }}
            required 
          />
        </div>
        <div id="formPw">
          <input 
            type="password" 
            placeholder="Password" 
            onChange={e => {
              setPassword(e.target.value);
            }}
            required 
          />
        </div>
        <div id="btnLogin">
          <button onClick={postLogin}>Login</button>
        </div>
        <div id="loginLost">
          <Link to="/loginlost">Need help signing in?</Link>
        </div>
        <br/>
      </div>
    </form>
  );
}

export default FormLogin;