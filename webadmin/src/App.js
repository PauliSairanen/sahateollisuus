import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './assets/context/PrivateRoute';
import { AuthContext } from './assets/context/Auth';
import { Jumbotron, Form } from 'reactstrap';
import './App.css';

// Components imports

import Login from './assets/components/login/Login';
import EventsNavi from './assets/components/eventsnavi/EventsNavi';
import EditingNavi from './assets/components/editingnavi/EditingNavi';
import InfoEdit from './assets/components/info/InfoEdit';

const App = () => {
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