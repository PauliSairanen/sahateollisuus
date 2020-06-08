import React from 'react'

const Event = (props) => {
    async function clickHandler(e){

        if(e.target.name === "delete"){
            if(window.confirm(`Are you sure you want to delete event "${props.name}"?`)){
                props.delet(props.id)
                console.log("Deleted event")
            }            
        }
        else if(e.target.name === "edit"){
            //console.log("Event.js")
            props.edit(props.id)
        }
    }

    return (
        <div>
            <p>name: {props.name} id: {props.id}</p>
            <button name="edit" onClick={clickHandler}>Edit</button><br/>
            <button name="delete" onClick={clickHandler}>Delete</button>
        </div>
    )
}

export default Event
