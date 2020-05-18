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
        <div>
            <h1>Admin Panel</h1>
            <button onClick={()=>{
                props.changeSession("");
                props.changeContent("LoginScreen");
            }}>Logout</button>
        </div>
    )
}

export default AdminScreen

