import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import PrivateRoute from './assets/context/PrivateRoute';
// import { AuthContext } from './assets/context/Auth';
// import Store from './assets/context/Store';
// import { Jumbotron } from 'reactstrap';
import './App.css';

// Components imports

// import Login from './assets/components/login/Login';
// import EventsNavi from './assets/components/eventsnavi/EventsNavi';
// import EditingNavi from './assets/components/editingnavi/EditingNavi';
// import InfoEdit from './assets/components/info/InfoEdit';

import LoginScreen from './assets/screens/LoginScreen'
import AdminScreen from './assets/screens/AdminScreen';

const App = () => {
  const [Content, setContent] = useState("LoginScreen");
  let container;

  function setSession(input){
    if(input === ""){
      console.log("delete session");
      localStorage.clear();
    }
    else{
      localStorage.setItem("Session", input);
    }
  }
  function getSession(){
    return localStorage.getItem("Session");
  }
  console.log("Session: " +getSession());
  if(Content === "LoginScreen"){
    container = <LoginScreen changeContent={setContent} readSession={getSession} changeSession={setSession}/>
  }
  else{
    container = <AdminScreen changeContent={setContent} readSession={getSession} changeSession={setSession}/>
  }
  return (
    <div className="App">
      {container}
    </div>
  )
}



export default App

// const [authTokens, setAuthTokens] = useState();
// const setTokens = (data) => {
//   localStorage.setItem("tokens", JSON.stringify(data));
//   setAuthTokens(data);
// }

    
// <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
//   <Router>
    //     <div>
    //     <Jumbotron>
    //       <Route exact path="/" component={Login} />
    //         <Switch>
    //           <Store>
    //             <PrivateRoute path="/eventsnavi" component={EventsNavi} />
    //             <PrivateRoute path="/editingnavi" component={EditingNavi} />
    //           </Store>
    //         </Switch>
    //     </Jumbotron>
    //     </div>
    //   </Router>
    // </AuthContext.Provider>