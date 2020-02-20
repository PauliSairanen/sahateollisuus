import React from "react";
import "./HeaderComponent.css";
import ButtonComponent from "./../button_component/ButtonComponent"

const HeaderComponent = props => {

  return (
    <div class="container_content">
      <div>
        <h1>{props.title}</h1>
      </div>
      <div>
        <ButtonComponent
          title = {"Log out"}
          style = {"buttonDecline"}
          icon = {"Icon comes here"}
        />
      </div>
    </div>
  )
}

export default HeaderComponent;