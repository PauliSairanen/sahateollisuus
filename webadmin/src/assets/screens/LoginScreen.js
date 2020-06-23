import React, {useState} from 'react';
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios';
/**
 * @param changeContent - changes screen
 * @param changeSession - changes session (as localstorage)
 * @param getSession    - gets current session (from localstorage)
 * @param visibility    - changes visibility in AdminScreen
 */
const LoginScreen = (props) => {
    const [form, setForm] = useState({});
    localStorage.setItem("Form", form);
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
                    props.visibility(false);
                    props.changeSession(response.data.token);
                    props.changeContent("AdminScreen");
                })
                .catch(function (error) {
                    // handle error
                    canLogin = true;
                    //props.visibility(false);
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
    // function test()
    // {
    //     props.changeSession("token");
    //     props.changeContent("AdminScreen");
    //     //props.changeSession("");
    // }
    return(
        <Container>
            <Row>
                <Col style={{display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'center'}}>
                    <Card>
                        <Form className="LoginScreen" autoComplete="off">
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" name="un" onChange={updateField}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="pw" onChange={updateField}/>
                                <Form.Text className="text-danger">{Details}</Form.Text>
                            </Form.Group>
                            <Button onClick={clickHandler}>Login</Button>              
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default LoginScreen