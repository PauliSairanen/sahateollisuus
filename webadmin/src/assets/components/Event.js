import React from 'react'

import Card from 'react-bootstrap/Card'
/**
 * 
 * @param id - eventin ID
 * @param name - eventin nimi
 * @param delet - evokes deleteEvent
 */
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
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Subtitle>ID: {props.id}</Card.Subtitle>
                <Card.Link href="#" name="edit" className="text-secondary" onClick={clickHandler}>Edit</Card.Link>
                <Card.Link href="#" name="delete" className="text-danger" onClick={clickHandler}>Delete</Card.Link>
            </Card.Body>
            {/* <button name="edit" onClick={clickHandler}>Edit</button><br/>
            <button name="delete" onClick={clickHandler}>Delete</button> */}
        </Card>
    )
}

export default Event
