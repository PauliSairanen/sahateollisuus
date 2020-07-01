import React from 'react';
import {Button} from 'react-bootstrap';
import './AddButton.css';

const DeleteButton = props => {
  return (
      <Button className="addButton" id={props.id} name={props.name} onClick={props.onClick} style={props.style}>
        <div className="addButtonTextContainer">
          <p id={props.id} name={props.name}>+</p>
        </div>
      </Button>
  )
}

export default DeleteButton;