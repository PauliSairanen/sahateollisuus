import React, {useEffect, useContext} from 'react';
import { Context } from '../../context/Store';

const FormProgram = () => {

  const [state, dispatch] = useContext(Context);

  const url = 'https://sahat.lamk.fi/testFormProgram';

  console.log(state.event);
  
  return(
    <div>
      <h1>Create and modify event program data:</h1>
      Formi
      Drag&Drop

      Joku missä näytetään speakerin esittely

    </div>
  )
}

export default FormProgram;