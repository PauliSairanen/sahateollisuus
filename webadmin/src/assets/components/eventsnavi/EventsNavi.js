import React from "react";
import { useAuth } from '../../context/Auth';
import "./EventsNavi.css";

import EditingNavi from '../editingnavi/EditingNavi';
import ButtonComponent from "../button_component/ButtonComponent";

const EventNavi = props => {
    const { setAuthTokens } = useAuth();
    function logOut() {
        setAuthTokens();
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
                <ButtonComponent
                    title={"placeholder"}
                    style={"buttonNavi"}
                />
            </div>

        </div>



    )
}

export default EventNavi;