import React, {useEffect, useContext} from 'react';

import { Context } from '../../context/Store';
import EventNavi from "../eventsnavi/EventsNavi";


const InfoEdit = () => {

  const [state, dispatch] = useContext(Context);

  const url = 'https://sahat.lamk.fi/testInfoEdit';

  console.log(state.event);
  
  return(

    <div>
      <div class= "allignHorizontally">
        <label for="testi1">Ensimmäinen kappale</label>
        <textarea id="testi1" rows="6" cols="100">Täsä voi olla tää teksti, mutta sen voi ottaa pois ja jättää tyhjän tekstikentän</textarea>
      </div>

      <div class= "allignHorizontally">
        <label for="testi2">Toinen kappale</label>
        <textarea id="testi2" rows="6" cols="100">Täsä voi olla tää teksti, mutta sen voi ottaa pois ja jättää tyhjän tekstikentän</textarea>
      </div>

      <div class= "allignHorizontally">
        <label for="testi3">Kolmas kappale</label>
        <textarea id="testi3" rows="6" cols="100">Täsä voi olla tää teksti, mutta sen voi ottaa pois ja jättää tyhjän tekstikentän</textarea>
      </div>

      <div class="allignHorizontally">
        <button class="submit-button">Upload</button>
      </div>
    </div>
  )
}


export default InfoEdit;