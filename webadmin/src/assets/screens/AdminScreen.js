import React, {useState} from 'react'
import axios from 'axios';

import LoginScreen from '../screens/LoginScreen';

/**
 * @param changeContent - changes screen
 * @param changeSession - changes session (as localstorage)
 * @param getSession    - gets current session (from localstorage)
 */
const AdminScreen = (props) => {
    const [LoginVisibility, setLoginVisibility] = useState(false);
    const baseURL = 'https://sahat.lamk.fi';
    let session = props.readSession();
    const [EventList, setEventList] = useState();
    let eventList;

    if(session === null){
        console.log("Never should have come here.");
        props.changeContent("LoginScreen");
    }
    async function clickHandler(e){
        console.log(e.target.id);
        if(e.target.id === "0"){
            await axios.get(baseURL+"/findMetadata")
            .then(function (res) {
                // handle success
                //console.log( (res.data)[0]._id );
                eventList = (res.data).map(x=>x._id);
                console.log(eventList);
            })
            .catch(function (error) {
                // handle error
            })
        }
        else if(e.target.id === "1"){
            setLoginVisibility(true);
        }
        else if(e.target.id === "2"){
            console.log(session);
            console.log(props.readSession());
            props.changeContent("AdminScreen");
        }
    }


    return (
        <>
        <div id="Toolbar">
            <div id="Toolbar-text">
                <h1 className="AdminScreen">Admin Panel</h1>
                {/* <p className="AdminScreen">Testing session admin token(not updated btw): {props.readSession()}</p> */}
                
                <button id="Logout" className="AdminScreen" onClick={()=>{
                    props.changeSession("");
                    props.changeContent("LoginScreen");
                }}>Logout</button>
            </div>
            <div id="Toolbar-tools">
                <button className="ToolButton" id="0" onClick={clickHandler}>Find metadata</button>
                <button className="ToolButton" id="1" onClick={clickHandler}>Test 2</button>
                <button className="ToolButton" id="2" onClick={clickHandler}>Test 3</button>
                <button className="ToolButton" id="3" onClick={clickHandler}>Test 4</button>
                <button className="ToolButton" id="4" onClick={clickHandler}>Test 5</button>
            </div>
        </div>
        <div className="AdminScreen">
                <div id="EventList">
                    {eventList}
                </div>
        </div>
        {LoginVisibility ? 
            <div id="ReAuth">
                <p id="ReAuthText">Authecation token invalid.</p>
                <LoginScreen 
                changeContent={(cont) => {props.changeContent(cont)}}
                readSession={() => {props.readSession()}} 
                changeSession={(sess) => {props.changeSession(sess)}}
                visibility={setLoginVisibility}/>
            </div> : null}
        
        </>
    )
}

export default AdminScreen

