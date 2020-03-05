import React, {useEffect, useContext} from 'react';
import { BrowserRouter as Router, Link, Switch } from 'react-router-dom';

import PrivateRoute from '../../../assets/context/PrivateRoute';

//import { Context } from '../../context/Store';
import "./EditingNavi.css";

import Info from '../info/InfoEdit';
import FormParticipant from '../participants/FormParticipant';
import FormSpeaker from '../speakers/FormSpeaker';
import FormSponsor from '../sponsors/FormSponsor';
import EventMaterials from '../eventmaterials/EventMaterials';

const EditingNavi = () => {

    //const [state, dispatch] = useContext(Context);
        
    return (
        <Router>
          <div>
            <ul>
              <li>
                <Link to='../info/InfoEdit.js'>Info</Link>
              </li>
              <li>
                <Link to='../participants/FormParticipant.js'>Osallistujat</Link>
              </li>
              <li>
                <Link to='../speakers/FormSpeaker.js'>Puhujat</Link>
              </li>
              <li>
                <Link to='../sponsors/FormSponsor.js'>Sponsorit</Link>
              </li>
              <li>
                <Link to='../eventmaterials/EventMaterials.js'>Materiaalit</Link>
              </li>
            </ul>
            <hr />
            <Switch>
              <PrivateRoute path="/info" component={Info} />
              <PrivateRoute path="/participants" component={FormParticipant} />
              <PrivateRoute path="/speakers" component={FormSpeaker} />
              <PrivateRoute path="/sponsors" component={FormSponsor} />
              <PrivateRoute path="/materials" component={EventMaterials} />
            </Switch>
          </div>
        </Router>
      );

};


export default EditingNavi;