import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/Auth';
import './Login.css';
//import LoginLost from "./assets/components/login/LoginLost";

import qs from 'qs'

const FormLogin = props => {

  // Pois kommentoidut ovat backendiä varten

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthTokens } = useAuth();
  const referer = '/eventsnavi' || props.location.state.referer;
  
  // function postLogin() {

  //   const auth = {
  //     un: userName,
  //     pw: password,
  //   }

  //   const url = 'https://sahat.lamk.fi/authenticate';

  //   const options = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': "Basic " + btoa("userName" + ":" + "password")
  //     }
  //   }

  //   axios.post(url, options).then(
  //     result => {
  //       console.log(result.status)
  //     if (result.status === 200) {
  //       setAuthTokens(200);
  //       setLoggedIn(true);
  //     } else {
  //       console.log(result.status)
  //       setIsError(true);
  //     }
  //   }).catch(error => {
  //     setIsError(true);
  //     if (error.response) {
  //       // The request was made and the server responded with a status code
  //       // that falls out of the range of 2xx
  //       console.log(error.response.data);
  //       console.log(error.response.status);
  //       console.log(error.response.headers);
  //     } else if (error.request) {
  //       // The request was made but no response was received
  //       // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
  //       // http.ClientRequest in node.js
  //       console.log(error.request);
  //     } else {
  //       // Something happened in setting up the request that triggered an Error
  //       console.log('Error', error.message);
  //     }
  //   });
  // }

  // const username = 'test';
  // const okpw = 'test';

  function postLogin() {
    // if ((userName === username) && (password === okpw)) {
      setAuthTokens(200)
      setLoggedIn(true) 
    // }
  }

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
            type="text" 
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