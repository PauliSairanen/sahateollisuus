import React from 'react';
import { BrowserRouter as Router, Link, Switch } from 'react-router-dom';
import { useAuth } from '../../context/Auth';
import PrivateRoute from '../../../assets/context/PrivateRoute';

import "./EditingNavi.css";

import Info from '../info/InfoEdit';
import FormParticipant from '../participants/FormParticipant';
import FormSpeaker from '../speakers/FormSpeaker';
import FormSponsor from '../sponsors/FormSponsor';
import EventMaterials from '../eventmaterials/EventMaterials';

// Global state https://codeburst.io/global-state-with-react-hooks-and-context-api-87019cc4f2cf

const EditingNavi = () => {

    const { setAuthTokens } = useAuth()
    function logOut() {
        if (window.confirm("Haluatko kirjautua ulos?\nMenetät kaiken tallettamattoman tiedon.")) 
        setAuthTokens();
    }
        
    return (
        <Router>
          <div>
            <ul>
              <li><Link to='../info/InfoEdit.js'>Info</Link></li>
              <li><Link to='../participants/FormParticipant.js'>Osallistujat</Link></li>
              <li><Link to='../speakers/FormSpeaker.js'>Puhujat</Link></li>
              <li><Link to='../sponsors/FormSponsor.js'>Sponsorit</Link></li>
              <li><Link to='../eventmaterials/EventMaterials.js'>Materiaalit</Link></li>
            </ul>
            <button onClick={logOut}>
                Kirjaudu ulos
            </button>
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