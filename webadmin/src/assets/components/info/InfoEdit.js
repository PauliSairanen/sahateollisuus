import React, {useEffect, useContext} from 'react';
import { Context } from '../../context/Store';
import "./Info.css";

const InfoEdit = () => {

  const [state, dispatch] = useContext(Context);

  console.log(state.event);
  
  return(
    <div>
      <h1>Create and modify event info data:</h1>
      Tekstieditori
    </div>
  )
}

export default InfoEdit;