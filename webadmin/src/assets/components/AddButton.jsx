import React from 'react';
import {Button} from 'react-bootstrap';
import './AddButton.css';

const DeleteButton = props => {
  return (
      <Button className="addButton" onClick={props.onClick}>
        <div className="addButtonTextContainer">
          <p>+</p>
        </div>
      </Button>
  )
}

export default DeleteButton;