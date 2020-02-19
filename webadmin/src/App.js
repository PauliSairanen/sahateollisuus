import React from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PrivateRoute from './assets/context/PrivateRoute';
import { AuthContext } from './assets/context/Auth';
import { Jumbotron, Form } from 'reactstrap';
import './App.css';

// Components imports

import EditingNavi from './assets/components/editingnavi/EditingNavi';
import EventMaterials from './assets/components/eventmaterials/EventMaterials';
import EventsNavi from './assets/components/eventsnavi/EventsNavi';
import Info from './assets/components/info/InfoEdit';
import Login from './assets/components/login/Login';
import FormParticipant from './assets/components/participants/FormParticipant';
import FormSpeaker from './assets/components/speakers/FormSpeaker';
import FormSponsor from './assets/components/sponsors/FormSponsor';

const App = () => {
  return (
    <AuthContext.Provider value={false}>
      <Router>
        <div>
        <Jumbotron>
        
          <Route exact path="/" component={FormParticipant} />
          <PrivateRoute path="/eventsnavi" component={EventsNavi} />
        </Jumbotron>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App

