import React, {useEffect, useContext} from 'react';

import { Context } from '../../context/Store';
import axios from 'axios';

const FormProgram = () => {

  const [state, dispatch] = useContext(Context);
    
  function sendData() {

    const url = 'https://sahat.lamk.fi/testFormProgram';

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
      <h1>Create and modify event program data:</h1>
      Formi
      Drag&Drop

      Joku missä näytetään speakerin esittely

    </div>
  )
}

export default FormProgram;