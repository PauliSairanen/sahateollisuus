import React, {useEffect, useContext} from 'react';

import { Context } from '../../context/Store';
import axios from 'axios';

import "./Participants.css";
import "./../../UniversalStyles.css"

const FormParticipant = () => {

  const [state, dispatch] = useContext(Context);
    
  function sendData() {

    const url = 'https://sahat.lamk.fi/testFormParticipant';

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
      <form>
      <div class="allignHorizontally">
        <div class="formContainer">
          <div class="formInputListLeft">
            <div class="formElement">Etunimi</div>
            <div class="formElement">Sukunimi</div>
            <div class="formElement">Yritys</div>
            <div class="formElement">Kansalaisuus</div>
            <div class="formElement">Sähköposti</div>
            <div class="formElement">Puhelinnumero</div>
            <div class="formElement">Osallistuu aterialle</div>
          </div>
          <div class="formInputListRight">
            <input class="formElement" type="text" name="enimi"></input>
            <input class="formElement" type="text" name="snimi"></input>
            <input class="formElement" type="text" name="yritys"></input>
            <input class="formElement" type="text" name="kansalaisuus"></input>
            <input class="formElement" type="text" name="sposti"></input>
            <input class="formElement" type="text" name="puh"></input>
            <input class="formElement" type="radio" name="ateria" value="ylempi"></input>
            <label for="ylempi">Osallistuu</label>
            <input class="formElement" type="radio" name="ateria" value="alempi"></input>
            <label for="alempi">Ei Osallistu</label>
          </div>
        </div>
      </div>

      <div class="allignHorizontally">
        <input type="file" multiple></input>
      </div>
      <div class="allignHorizontally">
        <button class="submit-button">Upload</button>
      </div>
      


    </form>
    </div>
  )
}

/*<div>

Form, johon voi myös ladata tietokannasta arvot:
Nimi: etu (required), suku (required) ja toinen nimi
sähköposti (array, required)
puhelinnumero (array, required, muodon pakotus)
firma
osallistuu aterialle (checkbox ja ruokarajoitukset)

Dropbox, johon voi pudottaa Excelin (Excelin poistaminen, vaihtaminen)
</div> */

export default FormParticipant;