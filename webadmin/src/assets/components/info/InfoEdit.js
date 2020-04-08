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
        <label for="testi">Näil voi antaa labelit</label>
        <textarea id="testi" rows="6" cols="100">Täsä voi olla tää teksti, mutta sen voi ottaa pois ja jättää tyhjän tekstikentän</textarea>
      </div>

      <div class= "allignHorizontally">
        <label for="testi"></label>
        <textarea id="testi" rows="6" cols="100">Täsä voi olla tää teksti, mutta sen voi ottaa pois ja jättää tyhjän tekstikentän</textarea>
      </div>

      <div class= "allignHorizontally">
        <label for="testi"></label>
        <textarea id="testi" rows="6" cols="100">Täsä voi olla tää teksti, mutta sen voi ottaa pois ja jättää tyhjän tekstikentän</textarea>
      </div>
    </div>
  )
}

export default InfoEdit;