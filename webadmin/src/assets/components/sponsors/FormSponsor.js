import React, {useEffect, useContext} from 'react';
import { Context } from '../../context/Store';

import "./Sponsors.css";

const FormSponsors = () => {
  
  const [state, dispatch] = useContext(Context);

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

export default FormSponsors;