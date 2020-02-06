import React from "react";
import "./Participants.css";

const FormParticipant = props => {

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

export default FormParticipant;