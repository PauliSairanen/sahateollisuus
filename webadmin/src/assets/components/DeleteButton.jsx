import React from 'react';
import {Button} from 'react-bootstrap';
import './DeleteButton.css';

const DeleteButton = props => {

  const deleteFunction = props.deleteFunction;

  return (
      <Button className="deleteButton" onClick={deleteFunction}>
        <div className="deleteButtonTextContainer">
          <p>-</p>
        </div>
      </Button>
  )
}

export default DeleteButton;