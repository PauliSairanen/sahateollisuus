import React from "react";
import "./Participants.css";

export default class FormParticipant extends React.Component {

    // Tämä pitää saada heti toisena toimimaan
  
    render() {
      return (
        <div>
          <h1>Create or modify event participant data:</h1>
          Form, johon voi myös ladata tietokannasta arvot:
          Nimi: etu (required), suku (required) ja toinen nimi
          sähköposti (array, required)
          puhelinnumero (array, required, muodon pakotus)
          firma
          osallistuu aterialle (checkbox ja ruokarajoitukset)
  
          Dropbox, johon voi pudottaa Excelin (Excelin poistaminen, vaihtaminen)
        </div>
      )
    }
  }