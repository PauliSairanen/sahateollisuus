import React from "react";
import "./Login.css";

const FormLogin = () => {

  // Tämä luo/palauttaa kirjautumistiedot sähköpostilla sitten joskus

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
        <br/>
      </div>
    </form>
  );
}

export default FormLogin;