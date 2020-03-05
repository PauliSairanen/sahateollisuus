import React from "react";
import { useAuth } from '../../context/Auth';
import { Link } from 'react-router-dom';
import "./EventsNavi.css";

import EditingNavi from '../editingnavi/EditingNavi';
import ButtonComponent from "../button_component/ButtonComponent";

const EventNavi = props => {
    const { setAuthTokens } = useAuth();
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
        /*        <div>
                   <div className="title">
                       EVENTS
                       <button onClick={logOut}>
                           Kirjaudu ulos
                       </button>
                       </div>
                   <div className="eventNavi">
                       <nav className="navObjects">
                           <a href="/"><button>1</button></a>
                           <a href="/"><button>2</button></a>
                           <a href="/"><button>3</button></a>
                           <a href="/"><button>4</button></a>
                           <a href="/"><button>5</button></a>
                           <a href="/"><button>6</button></a>
                           <a href="/"><button>7</button></a>
                           <a href="/"><button>8</button></a>
                           <a href="/"><button>9</button></a>
                           LUO UUSI
                       </nav>
                   </div>
               </div> */


        <div class="container_content">
            <div>
                <ButtonComponent
                    title={"Osallistujat"}
                    style={"buttonNavi"}
                />
            </div>
            <div>
                <ButtonComponent
                    title={"Puhujat"}
                    style={"buttonNavi"}
                />
            </div>
            <div>
                <ButtonComponent
                    title={"Sponsorit"}
                    style={"buttonNavi"}
                />
            </div>
            <div>
                <ButtonComponent
                    title={"Info"}
                    style={"buttonNavi"}
                    />
                </div>
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
            <div>
                <ButtonComponent
                    title={"placeholder"}
                    style={"buttonNavi"}
                />
            </div>

        </div>
        </div>


    )
}
}
export default EventNavi;
