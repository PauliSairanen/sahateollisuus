import React, {useEffect, useContext} from 'react';
import { Context } from '../../context/Store';
import "./../../UniversalStyles.css"


const FormProgram = () => {

  const [state, dispatch] = useContext(Context);

  const url = 'https://sahat.lamk.fi/testFormProgram';

  console.log(state.event);
  
    return (
      <div className="fileDrop">
        <div>
          <form>
            <h2>Add event program data</h2>
            <div className="allignHorizontally">
              <input type="file" id="FormProgram" multiple/>
            </div>
            <div className="allignHorizontally">
              <button className="submit-button" type="submit">Upload</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
  /*return(
    <div>
      <h1>Create and modify event program data:</h1>
      Formi
      Drag&Drop

      Joku missä näytetään speakerin esittely

    </div>*/
  

export default FormProgram;