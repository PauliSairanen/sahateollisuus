import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useAuth } from '../../context/Auth';
import axios from 'axios';

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
  
  function testi(){
    const baseURL = 'https://sahat.lamk.fi';
    if(false){
      //iqnore toimii
      axios.get(baseURL+'/findAbout')
      .then(function (response) {
        // handle success
        console.log("get test 1 success");
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log("get test 1 fail");
        console.log(error);
      })
      // ------------------------------------
      //iqnore ei toimi error 500
      axios.post(baseURL+'/findAll')
      .then(function (response) {
        // handle success
        console.log("post test 1 success");
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log("post test 1 fail");
        console.log(error);
      })
      //------------------------------------
      //iqnore ei toimi error 500
      axios.post(baseURL+'/login', {
        pass: "test"
      })
      .then(function (response) {
        // handle success
        console.log("post test 2 success");
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log("post test 2 fail");
        console.log(error);
      })

      //------------------------------------
      //iqnore ei toimi error 500
      const qs = require('qs');
      axios.post(baseURL+'/login', qs.stringify({
        'pass':"test"
      }))
      .then(function (response) {
        // handle success
        console.log("post test 3 success");
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log("post test 3 fail");
        console.log(error);
      })
    }
    
    //---------------------------------------
    // toimii
    if(true){
      axios.get(baseURL+'/findMetadata')
      .then(function (response) {
        // handle success
        console.log("get metadata success");
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log("get metadata fail");
        console.log(error);
      })
    }
    

    //---------------------------------------
    //toimii
    if(false){
      axios.post(baseURL+'/findEvent',{
        id: "5ebe7f27f5f9314cbf189996"
      })
      .then(function (response) {
        // handle success
        console.log("post test 4 success");
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log("post test 4 fail");
        console.log(error);
      })
    }
    

    //--------------------------------------
    if(false){ // toimii
      axios.post(baseURL+'/adminLogin',{
        "username": "SahaAdmin1",
        "password": "SahaPäälikkö1"
      })
      .then(function (response) {
        // handle success
        console.log("admin login success");
        console.log(response);
        console.log("admin token:");
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log("admin login fail");
        console.log(error);
      })
    }
    //-------------------------------------
    // (ei toimi cors error) nyt toimii. muista auth menee headers objektin sisälle config objecktiin axioksen kolmas parametri
    if(false){
      let adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNhaGFBZG1pbjEiLCJpYXQiOjE1ODk1NDQ5OTUsImV4cCI6MTU4OTU0ODU5NX0.uBV1GI6W0PilXQvUu2Z8Ei1PnQNTKuo4mm9B2n5Ugvc"
      axios.post(baseURL+'/createEvent', 
      {
        "eventPass": "Koodaus1",
          "metadata": {
              "eventName": "Simon posti testi",
              "eventImage": "Test"
          },
          "about": {
              "eventWebUrl": "Test",
              "eventPlace": {
                  "name": "Test",
                  "address": "Test",
                  "phone": "Test",
                  "email": "Test"
              },
              "title": "Test",
              "bodyText1": "Test",
              "bodyText2": "Test",
              "bodyText3": "Test",
              "bodyText4": "Test",
              "moreInformation": {
                  "eventWebsite": "Test",
                  "organizer": "Test",
                  "email": "Test"
              },
              "disclaimer1": "Test",
              "disclaimer2": "Test"
          },
          "participants": [
              {
                  "Country": "Test",
                  "FirstName": "Test",
                  "LastName": "Test",
                  "Email": "Test",
                  "Phone": "Test",
                  "Company": "Test"
              }
          ],
          "programme": [
              {
                  "Time": "Test",
                  "Location": "Test",
                  "Description": "Test",
                  "NameOfSpeaker": "Test",
                  "TitleOfSpeaker": "Test",
                  "SpecialTitleOfSpeaker": "Test",
                  "CompanyOfSpeaker": "Test"
              }
          ],
          "speakers": [
              {
                  "Speaker": "Test",
                  "Title": "Test",
                  "SpecialTitle": "Test",
                  "Company": "Test",
                  "ImageID": "Test"
              }
          ],
          "sponsors": [
              {
                  "CompanyName": "Test",
                  "CompanyUrl": "Test",
                  "ImageID": "Test"
              }
          ]
      },
      {
        headers:{
          Authorization: "Bearer "+adminToken
        }
        
      })
      .then(function (response) {
        // handle success
        console.log("event create success");
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log("event create fail");
        console.log(error);
      })
    }
    
    //-------------------------------------

    if(true){
      let adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNhaGFBZG1pbjEiLCJpYXQiOjE1ODk1NDQ5OTUsImV4cCI6MTU4OTU0ODU5NX0.uBV1GI6W0PilXQvUu2Z8Ei1PnQNTKuo4mm9B2n5Ugvc"
      axios.post(baseURL+'/deleteEvent', 
      {
        "id": "5ebe9155c002f65aad8fcb2d"
      },
      {
        headers:{
          Authorization: "Bearer "+adminToken
        }
        
      })
      .then(function (response) {
        // handle success
        console.log("event delete success");
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log("event delete fail");
        console.log(error);
      })
    }
  }
  function postLogin(e) {
    e.preventDefault(); // estää formin sivun päivityksen (alt fix, siirtää nappula formin ulkopuolelle)
    const url = 'https://sahat.lamk.fi/authenticate';

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'un': `${userName}`,
        'pw': `${password}`
      })
    }

    console.log(options.body)

    axios(url, options).then(
      result => {
        console.log(result.status)
      if (result.status === 200) { // kun bäkkäri onnistuu palauttamaan tietoa status on 200.
        setAuthTokens(200);
        setLoggedIn(true);
      } else { // tapahtuu vain jos bäkkärissä on vikaa
        console.log(result.status)
        setIsError(true);
      }
    }).catch(error => {
      setIsError(true);
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

  // const username = 'test';
  // const okpw = 'test';

  // function postLogin() {
    // if ((userName === username) && (password === okpw)) {
      // setAuthTokens(200)
      // setLoggedIn(true) 
    // }
  // }

  if (isLoggedIn) {
    return <Redirect to={referer} />;
  }

  return (
    <div>
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
    <button onClick={testi}>Login</button>
    </div>
  );
}

export default FormLogin;