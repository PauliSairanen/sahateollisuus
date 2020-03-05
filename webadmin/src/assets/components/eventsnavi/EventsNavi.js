import React from "react";
import { useAuth } from '../../context/Auth';
import { Link } from 'react-router-dom';
import "./EventsNavi.css";

const events = [ {"event":"First"}, {"event":"Second"}, {"event":"Third"}, 
    {"event":"Fourth"}, {"event":"Fifth"}, {"event":"Sixth"} ]

// Global state & routing?

const EventNavi = props =>{

    const listEvents = events.map(instance => <Link to='/editingnavi'><button className="event" onClick={eventClicked} key="instance.event">{instance.event}</button></Link>)

    function eventClicked() {
        console.log("hello")
    }

    // State uuden eventin luomiseen ja uudelleenlataamiseen
    // https://www.robinwieruch.de/react-state-array-add-update-remove

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