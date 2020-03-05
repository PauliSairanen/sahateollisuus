import React from "react";
import "./../../UniversalStyles.css";

const ButtonComponent = props => {

    return (
        <button class={props.style}>
            <div class="allignHorizantally">
                <div>
                    {props.title}
                </div>
                <div>
                    {props.icon}
                </div>
            </div>
        </button>
    )
}

export default ButtonComponent;