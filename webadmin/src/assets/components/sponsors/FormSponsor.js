import React, {useEffect, useContext} from 'react';

import { Context } from '../../context/Store';
import axios from 'axios';

import "./Sponsors.css";
import "./../../UniversalStyles.css"
import EventNavi from "../eventsnavi/EventsNavi";

const FormSponsors = () => {
  
  const [state, dispatch] = useContext(Context);
    
  function sendData() {

    const url = 'https://sahat.lamk.fi/testFormSponsors';

    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        'test': state.event
        })
    }

    axios(url, options).then(
    result => {
        console.log(result.status)
        console.log(result.config.body)
    
    }).catch(error => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
    });
  }

  return (
    <div>
      <button onClick={sendData} className="sendData">Lähetä</button>
      <div class="allignHorizontally">
        <div class="formContainer">
          <div class="formInputListLeft">
            <div class="formElement">Yrityksen nimi</div>
            <div class="formElement">Nettiosoite</div>
          </div>
          <div class="formInputListRight">
            <input class="formElement" type="text" name="yrnimi"></input>
            <input class="formElement" type="text" name="nosoite"></input>
          </div>
        </div>
      </div>

      <div class = "textPlacement">
        <label for="sponsoriteksti"></label>
        <textarea id="sponsoriteksti" rows="4" cols="50">
          Tätäkin täytyy parannella viel...
        </textarea>
      </div>

      <div class="allignHorizontally">
        <input type="file" multiple></input>
      </div>


      <div class="allignHorizontally">
        <div class="dragAndDropContainer">
        </div>
      </div>

      <div class="allignHorizontally">
        <button class="submit-button">Upload</button>
      </div>
      
      {/* <h1>Create and modify event sponsor data:</h1>
      Form, johon voi myös ladata tietokannasta arvot:
      nettiosoite
      sähköposti

      Tekstieditori, johon voi kirjoittaa tai kopioida esittelyn

      Dropbox, johon voi pudottaa logon (kuva x1080px, kuvan poistaminen/vaihtaminen)

      taustavärin muokkaustyökalu */}
    </div>
  )
}

export default FormSponsors;