import React from 'react';
import {Button} from 'react-bootstrap';
import './SortButton.css';

const SortButton = props => {
  return (
    <div className="sortButtonWrapper">
      <Button className="sortButton" id={props.id} name={props.name} onClick={props.onClick} style={props.style}>
        {props.content}
      </Button>
    </div>
  )
}

export default SortButton;