import React, {useState, useEffect} from 'react'
import axios from 'axios';

import LoginScreen from '../screens/LoginScreen';
import Event from '../components/Event'

import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
/**
 * @param changeContent - changes screen
 * @param changeSession - changes session (as localstorage)
 * @param getSession    - gets current session (from localstorage)
 */
const AdminScreen = (props) => {
    const [LoginVisibility, setLoginVisibility] = useState(false);
    const baseURL = 'https://sahat.lamk.fi';
    const [EventList, setEventList] = useState([]);
    const [EventObject, setEventObject] = useState([])
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
        else if(e.target.id === "7"){
            console.log("adminscreen button")
            await props.changeID(null)
            await props.changeContent("CreateScreen")
        }
        else if (e.target.id === "8"){
            console.log(await findEvent("5ed4dfe73b77001e6faae67b"))
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
            return []
            })
    }
    
    const findEvent = function(eventId) {
        const req = axios.post(baseURL+"/findEvent",{
            id: eventId
        },
        {
            headers:{
              Authorization: "Bearer "+props.readSession()
            }
        })
        return req
        .then(function (res) {
            return res.data;
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    //Siirretään update formiin kun sellainen tehdään
    // const updateEvent = function(form) {

    //     axios.post(baseURL+"/updateEvent",{
    //         form
    //       },
    //       {
    //         headers:{
    //           Authorization: "Bearer "+props.readSession()
    //         }
    //       })
    //     .then(function (res) {
    //         return res.data;
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })
    // }

    const deleteEvent = function(eventId) {
        const req = axios.post(baseURL+"/deleteEvent",{
            id: eventId
        },
        {
            headers:{
              Authorization: "Bearer "+props.readSession()
            }
        })
        return req
        .then(function (res) {
            pageLoad()
            return res.data;
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    //EventList creation
    useEffect(() => { //filter metadata based on Search state
        let listObjects = EventList.slice(0).reverse().map((item, index)=>{
            //console.log(item.metadata.eventName)
            if(item.metadata.eventName.includes(Search)){

                // return <DropdownButton key={index} id="dropdown-basic-button" title={item.metadata.eventName} variant="outline-success">
                //     <Event name={item.metadata.eventName} id={item._id} delet={deleteEvent} edit={(nid)=>{props.changeID(nid); console.log("Screen")}}/>
                // </DropdownButton>
                return <div key={index}>
                        <Event name={item.metadata.eventName} 
                            id={item._id}
                            delet={deleteEvent}
                            edit={(nid)=>{props.changeID(nid)}}/>
                </div> 
            }
            else{
                return null
            }
        })
        setEventObject(listObjects)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [EventList])

    // async function test(){
    //     setEventList(await findMetadata())
    // }
    async function pageLoad(){
        //console.log("Page load")
        setEventList(await findMetadata())
    }
    useEffect(() => {
        pageLoad()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Search])
    useEffect(() => {
        //console.log("Admin Screen loaded")
        pageLoad()
        window.scrollTo(0, 0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
        <Navbar bg="light" variant="light" expand="lg">
            <Navbar.Brand>Admin Panel</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link id="7" onClick={clickHandler}>Create Event</Nav.Link>
                <Nav.Link id="0" onClick={clickHandler}>Refresh Events</Nav.Link>
                <Form inline>
                    <FormControl type="text" name="search" onChange={(e)=>{setSearch(e.target.value)}} placeholder="Search" className="mr-sm-2"/>
                </Form>
                {/* <Button variant="outline-primary" id="7" onClick={clickHandler}>Create Event</Button>
                <Button variant="outline-primary" id="0" onClick={clickHandler}>Refresh Events</Button>
                <input type="text" name="search" onChange={(e)=>{setSearch(e.target.value)}} placeholder="Search Field"/> */}
            </Nav>
            <Button variant="outline-success" onClick={()=>{
                    props.changeSession("");
                    props.changeContent("LoginScreen");
                }}>Logout</Button>
        </Navbar>

        {/* <div id="Toolbar">
            <div id="Toolbar-tools">
                <button className="ToolButton" id="1" onClick={clickHandler}>Reauth test</button>
                <button className="ToolButton" id="2" onClick={clickHandler}>Test 2</button>
                <button className="ToolButton" id="3" onClick={clickHandler}>Test 3</button>
                <button className="ToolButton" id="4" onClick={clickHandler}>Test 4</button>
                <button className="ToolButton" id="5" onClick={clickHandler}>Test 5</button>
                <button className="ToolButton" id="6" onClick={clickHandler}>Test 6</button>
                <button className="ToolButton" id="8" onClick={clickHandler}>Test 8</button>
            </div>
        </div> */}
            <div>
                {EventObject.length > 0 ? EventObject : <p>Can't reach back-end</p>}
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


