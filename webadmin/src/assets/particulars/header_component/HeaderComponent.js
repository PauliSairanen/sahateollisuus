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
          style = {"buttonLogOut"}
          icon = {"(Icon comes next to text)"}
        />
      </div>
    </div>
  )
}

export default HeaderComponent;