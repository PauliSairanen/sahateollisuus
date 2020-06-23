import React from 'react';
import {Button} from 'react-bootstrap';
import './AddButton.css';

const DeleteButton = props => {

  const addFunction = props.addFunction;

  return (
      <Button className="addButton" onClick={addFunction}>
        <div className="addButtonTextContainer">
          <p>+</p>
        </div>
      </Button>
  )
}

export default DeleteButton;