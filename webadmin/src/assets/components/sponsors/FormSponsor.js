import React from "react";
import "./Sponsors.css";

export default class FormSponsors extends React.Component {

    render() {
      return (
        <div>
          <h1>Create and modify event sponsor data:</h1>
          Form, johon voi myös ladata tietokannasta arvot:
          nettiosoite
          sähköposti
  
          Tekstieditori, johon voi kirjoittaa tai kopioida esittelyn
  
          Dropbox, johon voi pudottaa logon (kuva x1080px, kuvan poistaminen/vaihtaminen)
  
          taustavärin muokkaustyökalu
        </div>
      )
    }
}