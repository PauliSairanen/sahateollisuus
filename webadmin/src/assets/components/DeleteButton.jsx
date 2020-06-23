import React from 'react';
import {Button} from 'react-bootstrap';
import './DeleteButton.css';

const DeleteButton = props => {
  return (
      <Button className="deleteButton" onClick={props.onClick}>
        <div className="deleteButtonTextContainer">
          <p>-</p>
        </div>
      </Button>
  )
}

export default DeleteButton;