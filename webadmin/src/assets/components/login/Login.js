import React from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import "./Login.css";
//import LoginLost from "./assets/components/login/LoginLost";

const FormLogin = () => {

  // Tämä pitää saada ensimmäisenä toimimaan https://react-hook-form.com/

  return (
    <form autocomplete="off">
      <div class="centered">
        <div id="formLogin">
          <input 
            type="text" 
            placeholder="Login" 
            required 
          />
        </div>
        <div id="formPw">
          <input 
            type="password" 
            placeholder="Password" 
            required 
          />
        </div>
        <div id="btnLogin">
          <input type="submit" value="Login"></input>
        </div>
        <div id="loginLost">
          <Link to="/loginlost">Need help with signing in?</Link>
        </div>
        <br/>
      </div>
    </form>
  );
}

export default FormLogin;