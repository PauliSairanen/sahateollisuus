import React, {useEffect, useContext} from 'react';
import { Context } from '../../context/Store';

import "./Speakers.css";

const FormSpeakers = () => {

  const [state, dispatch] = useContext(Context);

  return (
    <div>
      <h1>Create and modify event speaker data:</h1>
      <form>
        Etunimi:
      <input type="text" name="enimi"></input>
      <br></br>Sukunimi:
      <input type="text" name="snimi"></input>
      <br></br>Rooli/asema
      <input type="text" name="rooli"></input>
      <br></br>Yritys:
      <input type="text" name="yritys"></input>
      </form>
      Form, johon voi myös ladata tietokannasta arvot:
      Nimi: etu (required), suku (required) ja toinen nimi
      rooli/asema (agentti/toimitusjohtaja tms)
      firma

      Tekstieditori, johon voi kirjoittaa tai kopioida esittelyn

      Dropbox, johon voi pudottaa logon (kuva x1080px, kuvan poistaminen/vaihtaminen)
      Dropbox, johon voi pudottaa puhujan materiaalit (materiaalien poistaminen/vaihtaminen)

    </div>
  )
}

export default FormSpeakers;