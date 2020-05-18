import React from 'react'

/**
 * @param changeContent - changes screen
 * @param changeSession - changes session (as localstorage)
 * @param getSession    - gets current session (from localstorage)
 */
const AdminScreen = (props) => {
    let session = props.readSession();
    if(session === null){
        console.log("Never should have come here.");
        props.changeContent("LoginScreen");
    }
    return (
        <div className="AdminScreen">
            <h1 className="AdminScreen">Admin Panel</h1>
            <p className="AdminScreen">Session admin token: {props.readSession()}</p>
            <button onClick={()=>{
                props.changeSession("");
                props.changeContent("LoginScreen");
            }}>Logout</button>
        </div>
    )
}

export default AdminScreen

