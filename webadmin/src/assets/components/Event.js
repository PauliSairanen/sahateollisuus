import React from 'react'

const Event = (props) => {
    function clickHandler(e){

        if(e.target.name === "delete"){
            if(window.confirm("Are you sure?!")){
                props.delet(props.id)
            }            
        }
    }

    return (
        <div>
            <p>Event: {props.name}, id: {props.id}</p>
            <button >Edit</button><br/>
            <button name="delete" onClick={clickHandler}>Delete</button>
        </div>
    )
}

export default Event
