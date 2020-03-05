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
<<<<<<< HEAD
          <Route exact path="/" component={Login} />
            <Switch>
              <PrivateRoute path="/eventsnavi" component={EventsNavi} />
              <PrivateRoute path="/editingnavi" component={EditingNavi} />
            </Switch>
=======
        
          <Route exact path="/" component={FormParticipant} />
          <PrivateRoute path="/eventsnavi" component={EventsNavi} />
>>>>>>> 583ca44e4593c4be17a9b68b7eecea461dba75f3
        </Jumbotron>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App