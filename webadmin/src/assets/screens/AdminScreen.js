import React, {useState, useEffect} from 'react'
import axios from 'axios';

import LoginScreen from '../screens/LoginScreen';
import Event from '../components/Event'
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
/**
 * @param changeContent - changes screen
 * @param changeSession - changes session (as localstorage)
 * @param getSession    - gets current session (from localstorage)
 */
const AdminScreen = (props) => {
    const [LoginVisibility, setLoginVisibility] = useState(false);
    const baseURL = 'https://sahat.lamk.fi';
    const [EventList, setEventList] = useState([]);
    const [EventObject, setEventObject] = useState()
    const [Search, setSearch] = useState("")
    let eventList;

    if(props.readSession() === null){
        console.log("Never should have come here.");
        props.changeContent("LoginScreen");
    }

    async function clickHandler(e){
        //console.log(e.target.id);

        if(e.target.id === "0"){
            setEventList(await findMetadata())
        }
        else if(e.target.id === "1"){
            setLoginVisibility(true);
        }
        else if(e.target.id === "2"){
            console.log(props.readSession());
            props.changeContent("AdminScreen");
        }
        else if(e.target.id === "3"){
            console.log("Session is " + props.readSession())
            await axios.post(baseURL+"/findEvent",{
                id: "5e8dfbce0482b55473e7988b"
              },
              {
                headers:{
                  Authorization: "Bearer "+props.readSession()
                }
                
              })
            .then(function (res) {
                // handle success
                console.log(res.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
        }
        else if(e.target.id === "5"){
            const data = findMetadata();
            data.then(function(result){
                console.log(result);
            })
            .catch(function (error) {
                console.log(error)
            })
        }
        else if(e.target.id === "6"){
            const data = findEvent("5e8dfbce0482b55473e7988b");
            data.then(function(result){
                console.log(result);
            })
            .catch(function (error) {
                console.log(error)
            })
        }
    }

    async function findMetadata() {
        const req = axios.get(baseURL+"/findMetadata", {
            headers:{
              Authorization: "Bearer "+props.readSession()
            }
        })
        return req
            .then(function (res) {
            eventList = (res.data);
            return eventList;
            })
            .catch(function (error) {
            console.log(error);
            })
    }
    
    const findEvent = function(eventId) {
        return axios.post(baseURL+"/findEvent",{
            id: eventId
          },
          {
            headers:{
              Authorization: "Bearer "+props.readSession()
            }
          })
        .then(function (res) {
            return res.data;
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    const updateEvent = function(form) {
        let adminToken = localStorage.getItem("Session")
        axios.post(baseURL+"/updateEvent",{
            form
          },
          {
            headers:{
              Authorization: "Bearer "+props.readSession()
            }
          })
        .then(function (res) {
            return res.data;
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    const deleteEvent = function(eventId) {
        axios.post(baseURL+"/deleteEvent",{
            id: eventId
          },
          {
            headers:{
              Authorization: "Bearer "+props.readSession()
            }
          })
        .then(function (res) {
            return res.data;
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    const saveImages = function(category) {
        
    }
    //EventList creation
    useEffect(() => { //filter metadata based on Search state
        let listObjects = EventList.map((item, index)=>{
            console.log(item.metadata.eventName)
            if(item.metadata.eventName.includes(Search)){
                return <li key={index}>
                        <Event name={item.metadata.eventName} 
                            id={item._id}
                            delet={deleteEvent}/>
                </li> 
            }
        })
        
        setEventObject(listObjects)
    }, [EventList])

    async function test(){
        setEventList(await findMetadata())
    }
    return (
        <>
        <Navbar bg="light" variant="light" expand="lg">
            <Navbar.Brand>Admin Toolbar</Navbar.Brand>
            <Button variant="outline-success" onClick={test}>Logout</Button>
        </Navbar>

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
                <button className="ToolButton" id="0" onClick={clickHandler}>Get Event</button>
                <input type="text" name="search" onChange={(e)=>{setSearch(e.target.value)}} placeholder="Search Field"/>
                <button className="ToolButton" id="1" onClick={clickHandler}>Reauth test</button>
                <button className="ToolButton" id="2" onClick={clickHandler}>Test 3</button>
                <button className="ToolButton" id="3" onClick={clickHandler}>Test 4</button>
                <button className="ToolButton" id="4" onClick={clickHandler}>Test 5</button>
                <button className="ToolButton" id="5" onClick={clickHandler}>Test 6</button>
                <button className="ToolButton" id="6" onClick={clickHandler}>Test 7</button>
            </div>
        </div>
            <ul>
                {
                    // EventList.map((item, index)=>{
                    //     return <li key={index}>
                    //             <Event name={item.metadata.eventName} 
                    //             id={item._id}
                    //             delet={deleteEvent}/>
                    //         </li> 
                    // })
                }
                {EventObject}
            </ul>
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


