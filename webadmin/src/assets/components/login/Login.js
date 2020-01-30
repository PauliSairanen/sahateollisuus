import React from "react";
import "./Login.css";

export default class FormLogin extends React.Component {

    // Tämä pitää saada ensimmäisenä toimimaan https://react-hook-form.com/
  
      render() {
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
                type="text" 
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
  }