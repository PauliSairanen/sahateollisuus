import React, {useEffect, useContext} from 'react';
import { Context } from '../../context/Store';


const EventMaterials = () => {

  const [state, dispatch] = useContext(Context);

  return (
    <div>
      <h1>Create and modify general materials:</h1>
      Dropbox, johon voi pudottaa materiaalit (materiaalien poistaminen/vaihtaminen)
    </div>
  );
}

export default EventMaterials;