//deprecated, do not use
import React, {useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/Auth';

import { Context } from '../../context/Store';
import axios from 'axios';

import "./EventsNavi.css";


// Page must update when array changes
const events = []
events.length = 0;

const EventNavi = props =>{

    const [state, dispatch] = useContext(Context);
    
    function getData() {
        if(state){
            if(useEffect){
                
            }
        }
        const url = 'https://sahat.lamk.fi/testEventsNavi';

        const options = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            }
        }
        axios(url, options).then(
        result => { 
            result.data.forEach(element => {
                events.push( { "event": element } );
            });   
        }).catch(error => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
        });
    }
    getData();

    const listEvents = events.map(instance => <Link to='/editingnavi'><button className="event" onClick={eventClicked} key="instance.event">{instance.event.metadata.eventName}</button></Link>)

    function eventClicked() {
        dispatch({type: 'MOD_EVENT', payload: events})
        // state.events[`${}`] = 
        // console.log()
    }

    const { setAuthTokens } = useAuth()
    function logOut() {
        if (window.confirm("Haluatko kirjautua ulos?\nMenetät kaiken tallettamattoman tiedon.")) 
        setAuthTokens();
    }
    function createNew() {
        events.push()
    }
    return (
        <div>
            <div className="title">
                EVENTS
                <button onClick={logOut}>
                    Kirjaudu ulos
                </button>
                </div>
            <div className="eventNavi">
                <nav className="navObjects">
                    {listEvents}
                    <button onClick={createNew} className="createNew">Luo uusi</button>
                </nav>
            </div>
        </div>
    )
}

export default EventNavi;