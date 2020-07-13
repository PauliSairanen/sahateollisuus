import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import PrivateRoute from './assets/context/PrivateRoute';
// import { AuthContext } from './assets/context/Auth';
// import Store from './assets/context/Store';
// import { Jumbotron } from 'reactstrap';
//import './App.css';
import './App.scss';
// Components imports

// import EventsNavi from './assets/components/eventsnavi/EventsNavi';
// import EditingNavi from './assets/components/editingnavi/EditingNavi';
// import InfoEdit from './assets/components/info/InfoEdit';

import LoginScreen from './assets/screens/LoginScreen'
import AdminScreen from './assets/screens/AdminScreen';
import CreateEventForm from './assets/components/CreateEventForm'

const App = () => {
  const [Content, setContent] = useState(localStorage.getItem("Session") ? "AdminScreen" : "LoginScreen");
  const [EditID, setEditID] = useState(null)
  let container;
  //when EditID is set, move screen to top and render CreateScreen
  useEffect(() => {
    if(EditID != null){
      window.scrollTo(0, 0)
      setContent("CreateScreen")
    }
  }, [EditID])
  //If screen is changed to other than CreateScreen, set EditID to null
  useEffect(() => {
    if(Content === "AdminScreen" || Content === "LoginScreen"){
      setEditID(null)
    }
  }, [Content])
  //redundant
  function setSession(input){
    if(input === ""){
      console.log("delete session");
      localStorage.clear();
    }
    else{
      localStorage.setItem("Session", input);
    }
  }
  //redundant
  function getSession(){
    return localStorage.getItem("Session");
  }
  // function test()
  // {
  //   setSession("token");
  //   setContent("AdminScreen");
  //   //props.changeSession("");
  // }
  //console.log("Session: " +getSession());
  //change screen based on Content
  if(Content === "LoginScreen"){
    container = 
    <div>
      <LoginScreen changeContent={setContent} 
      visibility={()=>{}}/>
      {/* <button className="LoginScreen" onClick={test}>Bypass</button> */}
    </div>
  }
  if(Content === "CreateScreen"){
    container =
    <>
      <CreateEventForm 
        changeContent={setContent} 
        id={EditID}
      />
    </>
  }
  else if(Content === "AdminScreen"){
    container = 
      <AdminScreen 
        changeContent={setContent} 
        readSession={getSession} 
        changeSession={setSession}
        changeID={setEditID}
      />
  }
  return (
    <div className="App">
      {container}
      {/* <button style={{position:'fixed', left:'0', bottom:'0'}} onClick={()=>{localStorage.setItem("Session", "");}}>TEST: Clear Token</button> */}
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