import React, {useEffect, useContext} from 'react';

import { Context } from '../../context/Store';
import axios from 'axios';

import "./Speakers.css";
import EventNavi from "../eventsnavi/EventsNavi";

const FormSpeakers = () => {

  const [state, dispatch] = useContext(Context);
    
  function sendData() {

    const url = 'https://sahat.lamk.fi/testFormSpeakers';

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
            <div class="formElement">Puhuja</div>
            <div class="formElement">Titteli</div>
            <div class="formElement">Erikoistittelit</div>
            <div class="formElement">Yritys</div>
          </div>
          <div class="formInputListRight">
            <input class="formElement" type="text" name="puhuja"></input>
            <input class="formElement" type="text" name="rooli"></input>
            <input class="formElement" type="text" name="etitteli"></input>
            <input class="formElement" type="text" name="firma"></input>
          </div>
        </div>
      </div>
      
      <div class= "allignHorizontally">
        <label for="speaker">Puhujan esittely</label>
        <textarea id="speaker" rows="6" cols="100">Tää vaati hienosäätöö viel...</textarea>
      </div>

      <div class="allignHorizontally">
        <div class="formContainer">
          <div class="formInputListLeft">
            <div class="allignHorizontally">
              <input type="file" multiple></input>
            </div>

            <div class="allignHorizontally">
              <div class="dragAndDropContainer">
                <p></p>
              </div>
            </div>
          </div>

          <div class="formInputListRight">
            <div class="allignHorizontally">
              <input type="file" multiple></input>
            </div>
          </div>
        </div>
      </div>
      
      <div class="allignHorizontally">
        <button class="submit-button">Upload</button>
      </div>
      
      {/*  Form, johon voi myös ladata tietokannasta arvot:
      Nimi: etu (required), suku (required) ja toinen nimi
      rooli/asema (agentti/toimitusjohtaja tms)
      firma

      Tekstieditori, johon voi kirjoittaa tai kopioida esittelyn

      Dropbox, johon voi pudottaa logon (kuva x1080px, kuvan poistaminen/vaihtaminen)
      Dropbox, johon voi pudottaa puhujan materiaalit (materiaalien poistaminen/vaihtaminen)
*/}
      </div>
  )
}

export default FormSpeakers;