import React from 'react';
import {Button} from 'react-bootstrap';
import './DeleteButton.css';

const DeleteButton = props => {
  return (
      <Button id={props.id} name={props.name} className="deleteButton" onClick={props.onClick} style={props.style}>
        <div className="deleteButtonTextContainer">
          <p id={props.id} name={props.name}>-</p>
        </div>
      </Button>
  )
}

export default DeleteButton;