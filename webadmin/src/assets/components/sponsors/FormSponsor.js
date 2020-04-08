import React, {useEffect, useContext} from 'react';
import { Context } from '../../context/Store';

import "./Sponsors.css";
import "./../../UniversalStyles.css"
import EventNavi from "../eventsnavi/EventsNavi";
import DragAndDrop from '../../particulars/header_component/DragAndDrop';

const FormSponsors = () => {
  
  const [state, dispatch] = useContext(Context);

  return (
    <div>
      <HeaderComponent
        title={"Sponsorit"}
      />
      <EventNavi
      />
      <div class="allignHorizontally">
        <div class="formContainer">
          <div class="formInputListLeft">
            <div class="formElement">Nettiosoite</div>
            <div class="formElement">Yrityksen nimi</div>
          </div>
          <div class="formInputListRight">
            <input class="formElement" type="text" name="nosoite"></input>
            <input class="formElement" type="text" name="yrnimi"></input>
          </div>
        </div>
      </div>

      <div class = "textPlacement">
        <label for="sponsoriteksti"></label>
        <textarea id="sponsoriteksti" rows="4" cols="50">
          Tätäkin täytyy parannella viel...
        </textarea>
      </div>

      <div class="allignHorizontally">
        <input type="file" multiple></input>
      </div>



      <div class="allignHorizontally">
        <div class="dragAndDropContainer">
          <DragAndDrop/>
        </div>
      </div>


      <div class="allignHorizontally">
        <div class="formContainer">
          <div class="formInputListLeft">
            <ButtonComponent
              title={"Save"}
              style={"buttonAccept"}
            />
          </div>
          <div class="formInputListRight">
            <ButtonComponent
              title={"Cancel"}
              style={"buttonDecline"}
            />
          </div>
        </div>
      </div>









      {/* <h1>Create and modify event sponsor data:</h1>
      Form, johon voi myös ladata tietokannasta arvot:
      nettiosoite
      sähköposti

      Tekstieditori, johon voi kirjoittaa tai kopioida esittelyn

      Dropbox, johon voi pudottaa logon (kuva x1080px, kuvan poistaminen/vaihtaminen)

      taustavärin muokkaustyökalu */}
    </div>
  )
}

export default FormSponsors;