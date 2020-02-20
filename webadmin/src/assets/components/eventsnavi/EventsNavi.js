import React from "react";
import { useAuth } from '../../context/Auth';
import "./EventsNavi.css";

import EditingNavi from '../editingnavi/EditingNaviff';

const EventNavi = props =>{
    const { setAuthTokens } = useAuth();
    function logOut() {
        setAuthTokens();
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
        </div>
    )
}

export default EventNavi;