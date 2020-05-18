import React, {useState} from 'react';
import axios from 'axios';

/**
 * @param changeContent - changes screen
 * @param changeSession - changes session (as localstorage)
 * @param getSession    - gets current session (from localstorage)
 */
const LoginScreen = (props) => {
    const [form, setForm] = useState({});
    const [Details, setDetails] = useState("")
    const baseURL = 'https://sahat.lamk.fi';
    let session = props.readSession();

    if(session != null){
        //console.log("Session in progress, initiate automatic login");
        props.changeContent("AdminScreen");
    }
    else{
        //console.log("normal login");
    }
    const updateField = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };
    function clickHandler(e)
    {
        e.preventDefault();
        if('un' in form && 'pw' in form){
            //username and password set
            axios.post(baseURL+'/adminLogin',{
                "username": form.un, // SahaAdmin1
                "password": form.pw // SahaPäälikkö1
              })
              .then(function (response) {
                // handle success
                console.log("admin login success");
                console.log(response);
                console.log("admin token:");
                console.log(response.data);
                props.changeSession(response.data.token);
                props.changeContent("AdminScreen");
              })
              .catch(function (error) {
                // handle error
                console.log("admin login fail");
                console.log(error);
                if(error.toString().includes("401")){
                    //console.log("Login incorrect");
                    setDetails("Incorrect username and/or password");
                }
            })
        }
        else{
            //either username or password fields are empty
        }
        
    }
    function test()
    {
        props.changeSession("token");
        props.changeContent("AdminScreen");
        //props.changeSession("");
    }
    return(
        <div>
            <form autoComplete="off">
                <input type="text" name="un" onChange={updateField} placeholder="username"/>
                <input type="password" name="pw" onChange={updateField} placeholder="password"/>
                <button type="submit" onClick={clickHandler}>Login</button>
            </form>
            <p>{Details}</p>
            <br/>
            <button onClick={test}>Test</button>
            <br/>
        </div>
    )
}

export default LoginScreen