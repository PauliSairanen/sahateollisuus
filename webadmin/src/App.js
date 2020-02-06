import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from './assets/context/PrivateRoute';
import { AuthContext } from './assets/context/Auth';
import { Jumbotron } from 'reactstrap';
import './App.css';

// Components imports

//import EventMaterials from './assets/components/eventmaterials/EventMaterials';
import EventsNavi from './assets/components/eventsnavi/EventsNavi';
//import Info from './assets/components/info/InfoEdit';
import Login from './assets/components/login/Login';
//import FormParticipant from './assets/components/participants/FormParticipant';
//import FormSpeaker from './assets/components/speakers/FormSpeaker';
//import FormSponsor from './assets/components/sponsors/FormSponsor';

const App = props => {
  const [authTokens, setAuthTokens] = useState();
  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }
  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <div>
        <Jumbotron>
          <Route exact path="/" component={Login} />
          <PrivateRoute path="/eventsnavi" component={EventsNavi} />
        </Jumbotron>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App