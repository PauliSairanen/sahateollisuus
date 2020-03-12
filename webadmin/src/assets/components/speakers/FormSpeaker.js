import React, {useEffect, useContext} from 'react';
import { Context } from '../../context/Store';

import "./Speakers.css";
import HeaderComponent from "../../particulars/header_component/HeaderComponent";
import EventNavi from "../eventsnavi/EventsNavi";
import ButtonComponent from '../../particulars/button_component/ButtonComponent';

const FormSpeakers = () => {

  const [state, dispatch] = useContext(Context);

  return (
    <div>
      <HeaderComponent
        title={"Puhujat"}
      />
      <EventNavi
      />
      <div class="allignHorizontally">
        <div class="formContainer">
          <div class="formInputListLeft">
            <div class="formElement">Puhuja</div>
            <div class="formElement">Titteli</div>
            <div class="formElement">Erikoistittelit</div>
            <div class="formElement">Yritys</div>
          </div>
          <div class="formInputListRight">
            <input class="formElement" type="text" name="puhuja"></input>
            <input class="formElement" type="text" name="rooli"></input>
            <input class="formElement" type="text" name="etitteli"></input>
            <input class="formElement" type="text" name="firma"></input>
          </div>
        </div>
      </div>


      <div class="allignHorizontally">
        <div class="formContainer">
          <div class="formInputListLeft">
            <div class="allignHorizontally">
              <input type="file" multiple></input>
            </div>

            <div class="allignHorizontally">
              <div class="dragAndDropContainer">
                <p>Tähän Logo</p>
              </div>
            </div>
          </div>

          <div class="formInputListRight">
            <div class="allignHorizontally">
              <input type="file" multiple></input>
            </div>

            <div class="allignHorizontally">
              <div class="dragAndDropContainer">
                <p>Tähän puhujan materiaali</p>
              </div>
            </div>
          </div>
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






      {/*  Form, johon voi myös ladata tietokannasta arvot:
      Nimi: etu (required), suku (required) ja toinen nimi
      rooli/asema (agentti/toimitusjohtaja tms)
      firma

      Tekstieditori, johon voi kirjoittaa tai kopioida esittelyn

      Dropbox, johon voi pudottaa logon (kuva x1080px, kuvan poistaminen/vaihtaminen)
      Dropbox, johon voi pudottaa puhujan materiaalit (materiaalien poistaminen/vaihtaminen)
*/}
      </div>
  )
}

export default FormSpeakers;