import React, {useEffect, useContext} from 'react';
// import EventNavi from "../eventsnavi/EventsNavi";

import { Context } from '../../context/Store';
import axios from 'axios';

const InfoEdit = () => {

  const [state, dispatch] = useContext(Context);
    
  function sendData() {

    const url = 'https://sahat.lamk.fi/testEventsNavi';

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
  
  return(
    
    <div>
      <button onClick={sendData} className="sendData">Lähetä</button>
      <div class= "allignHorizontally">
        <label for="testi1">Ensimmäinen kappale</label>
        <textarea id="testi1" rows="6" cols="100">Täsä voi olla tää teksti, mutta sen voi ottaa pois ja jättää tyhjän tekstikentän</textarea>
      </div>

      <div class= "allignHorizontally">
        <label for="testi2">Toinen kappale</label>
        <textarea id="testi2" rows="6" cols="100">Täsä voi olla tää teksti, mutta sen voi ottaa pois ja jättää tyhjän tekstikentän</textarea>
      </div>

      <div class= "allignHorizontally">
        <label for="testi3">Kolmas kappale</label>
        <textarea id="testi3" rows="6" cols="100">Täsä voi olla tää teksti, mutta sen voi ottaa pois ja jättää tyhjän tekstikentän</textarea>
      </div>

      <div class="allignHorizontally">
        <button class="submit-button">Upload</button>
      </div>
    </div>
  )
}


export default InfoEdit;