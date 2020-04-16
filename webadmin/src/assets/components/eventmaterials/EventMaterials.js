import React, {useEffect, useContext} from 'react';
import { Context } from '../../context/Store';
import "./../../UniversalStyles.css"


const EventMaterials = () => {

  const [state, dispatch] = useContext(Context);
  
  const url = 'https://sahat.lamk.fi/testEventMaterials';

  return (
    <div className="fileDrop">
      <div>
        <form>
          <h2>Lisää materiaalit</h2>
          <div className="allignHorizontally">
            <input type="file" id="eventMaterial" multiple/>
          </div>
          <div className="allignHorizontally">
            <button className="submit-button" type="submit">Upload</button>
          </div>
        </form>
      </div>
    </div>
  )
}


  

      //<h1>Create and modify general materials:</h1>
      //Dropbox, johon voi pudottaa materiaalit (materiaalien poistaminen/vaihtaminen)



export default EventMaterials ;