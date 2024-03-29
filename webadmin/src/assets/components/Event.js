import React from 'react'

import Card from 'react-bootstrap/Card'
/**
 * 
 * @param id - eventin ID
 * @param name - eventin nimi
 * @param edit - evokes edit in parent
 * @param delet - evokes deleteEvent
 * @param img - image name
 */
const Event = (props) => {
    let baseURL = "https://sahat.lab.fi"
    let imgsrc;

    if(props.img.includes("https")){
        imgsrc = props.img
    }
    else{
        imgsrc = baseURL+`/public/${props.id}/${props.img}`
    }
    //console.log(props.name, imgsrc)
    async function clickHandler(e){

        if(e.target.name === "delete"){
            if(window.confirm(`Are you sure you want to delete event "${props.name}"?`)){
                props.delet(props.id)
                //console.log("Deleted event")
            }            
        }
        else if(e.target.name === "edit"){
            //console.log("Event.js")
            props.edit(props.id)
        }
    }

    return (
        <Card style={{ width: '18rem', backgroundColor:`${props.visibility === "visible" ? "white" : "#e0e0e0"}` }}>
            {props.img ? <Card.Img className="rounded mb-0" variant="top" src={imgsrc} style={{border:`5px solid ${props.color}`}}/> : null}
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                {/* <Card.Subtitle>ID: {props.id}</Card.Subtitle> */}
                <Card.Link href="#" name="edit" className="text-secondary" onClick={clickHandler}>Edit</Card.Link>
                <Card.Link href="#" name="delete" className="text-danger" onClick={clickHandler}>Delete</Card.Link>
            </Card.Body>
            {/* <button name="edit" onClick={clickHandler}>Edit</button><br/>
            <button name="delete" onClick={clickHandler}>Delete</button> */}
        </Card>
    )
}

export default Event
