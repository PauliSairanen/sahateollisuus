import React, {useEffect, useContext} from 'react';
import { Context } from '../../context/Store';

import "./Participants.css";
import "./../../UniversalStyles.css"

const FormParticipant = () => {

  const [state, dispatch] = useContext(Context);

  const url = 'https://sahat.lamk.fi/testFormParticipant';

  return (
    <div>
      <div class="allignHorizantally">
        <div class="formContainer">
          <div class="formInputListLeft">
            <div class="formElement">Etunimi</div>
            <div class="formElement">Sukunimi</div>
            <div class="formElement">Yritys</div>
            <div class="formElement">Kansalaisuus</div>
            <div class="formElement">Sähköposti</div>
            <div class="formElement">Puhelinnumero</div>
          </div>
          <div class="formInputListRight">
            <input class="formElement" type="text" name="enimi"></input>
            <input class="formElement" type="text" name="snimi"></input>
            <input class="formElement" type="text" name="yritys"></input>
            <input class="formElement" type="text" name="kansalaisuus"></input>
            <input class="formElement" type="text" name="sposti"></input>
            <input class="formElement" type="text" name="puh"></input>
          </div>
        </div>
      </div>

      <div class="allignHorizontally">
        <input type="file" multiple></input>
      </div>

      <div class="allignHorizontally">
        <div class="dragAndDropContainer">
          <p>This is drag and drop container</p>
        </div>
      </div>

      <div>

        Form, johon voi myös ladata tietokannasta arvot:
        Nimi: etu (required), suku (required) ja toinen nimi
        sähköposti (array, required)
        puhelinnumero (array, required, muodon pakotus)
        firma
        osallistuu aterialle (checkbox ja ruokarajoitukset)

        Dropbox, johon voi pudottaa Excelin (Excelin poistaminen, vaihtaminen)
    </div>

    </div>
  )
}

export default FormParticipant;