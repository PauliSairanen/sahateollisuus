import React, {useEffect, useContext} from 'react';
import { Context } from '../../context/Store';
import "./Info.css";
import HeaderComponent from "../../particulars/header_component/HeaderComponent";
import EventNavi from "../eventsnavi/EventsNavi";
import ButtonComponent from '../../particulars/button_component/ButtonComponent';


const InfoEdit = () => {

  const [state, dispatch] = useContext(Context);

  console.log(state.event);
  
  return(
    <div>
      
      <HeaderComponent
        title={"Info"}
      />
      <EventNavi
      />
      <div class = "taustakuva">
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
      </div> 

    </div>
  )
}

export default InfoEdit;