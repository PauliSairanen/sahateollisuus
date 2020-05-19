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
    let canLogin = true;

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
    async function clickHandler(e)
    {
        if(canLogin){
            e.preventDefault();
            if('un' in form && 'pw' in form){
                canLogin = false;
                setDetails("Processing ..."); //
                //username and password set
                await axios.post(baseURL+'/adminLogin',{
                    "username": form.un, // SahaAdmin1
                    "password": form.pw // SahaPäälikkö1
                })
                .then(function (response) {
                    // handle success
                    canLogin = true;
                    setDetails("Success");
                    //console.log("admin login success");
                    //console.log(response);
                    //console.log("admin token:");
                    //console.log(response.data);
                    props.changeSession(response.data.token);
                    props.changeContent("AdminScreen");
                })
                .catch(function (error) {
                    // handle error
                    canLogin = true;
                    //console.log("admin login fail");
                    //console.log(error);
                    if(error.toString().includes("401")){
                        //console.log("Login incorrect");
                        setDetails("Incorrect username and/or password");
                    }
                })
                canLogin = true;
            }
            else{
                //either username or password fields are empty
                setDetails("Please input username and password");
            }
        }
        
        
    }
    function test()
    {
        props.changeSession("token");
        props.changeContent("AdminScreen");
        //props.changeSession("");
    }
    return(
        <div className="LoginScreen">
            <h1 className="LoginScreen">Login</h1>
            <form className="LoginScreen" autoComplete="off">
                <input className="LoginScreen" 
                type="text" name="un" onChange={updateField} placeholder="username"/>
                <input className="LoginScreen" 
                type="password" name="pw" onChange={updateField} placeholder="password"/>
                <br/>
                <button className="LoginScreen" 
                type="submit" onClick={clickHandler}>Login</button>
            </form>
            <p className="LoginScreen">{Details}</p>
            
        </div>
    )
}

export default LoginScreen