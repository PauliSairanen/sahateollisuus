import React from "react";
import "./Speakers.css";

export default class FormSpeakers extends React.Component {

    render() {
      return (
        <div>
          <h1>Create and modify event speaker data:</h1>
          Form, johon voi myös ladata tietokannasta arvot:
          Nimi: etu (required), suku (required) ja toinen nimi
          rooli/asema (agentti/toimitusjohtaja tms)
          firma
  
          Tekstieditori, johon voi kirjoittaa tai kopioida esittelyn
  
          Dropbox, johon voi pudottaa logon (kuva x1080px, kuvan poistaminen/vaihtaminen)
          Dropbox, johon voi pudottaa puhujan materiaalit (materiaalien poistaminen/vaihtaminen)
  
          ViewPresentation, johon liitetään ViewPresentation-luokan sisältö
  
        </div>
      )
    }
}