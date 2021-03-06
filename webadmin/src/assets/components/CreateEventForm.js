//Component for handling event creation
import React, {useState, useEffect} from 'react'
import axios from 'axios';

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import AboutForm from '../components/AboutForm'
import ParticipantsForm from '../components/ParticipantsForm'
import ProgrammeForm from '../components/ProgrammeForm'
import SpeakersForm from '../components/SpeakersForm'
import SponsorsForm from '../components/SponsorsForm'
import VenueTabForm from '../components/VenueTabForm'
import MapMarkerForm from '../components/MapMakerForm'
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import GeneralCard from './GeneralCard';
import './CreateEventForm.css';

import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'
import Toast from 'react-bootstrap/Toast'

import Image from 'react-bootstrap/Image'
import LoginScreen from '../screens/LoginScreen';
import Constants from '../constant/constants'
/**
 * @param changeContent - change screen
 * @param id - Event to edit based on ID
 */
//Screen: Creates events based on FormObjects. 
const CreateEventForm = (props) => { // Todo rename to CreateEventScreen
    const baseURL = Constants.baseURL;

    //Visible forms controller
    const [ActiveForm, setActiveForm] = useState("GeneralForm")
    const [EditID, setEditID] = useState(props.id)
    const [Files, setFiles] = useState([])
    let container;
    //Modal and Toast stuff
    const [ToastShow, setToastShow] = useState(false)
    const [ToastHeader, setToastHeader] = useState("")
    const [ToastBody, setToastBody] = useState("")

    const [ModalShow, setModalShow] = useState(false)
    const [ModalText, setModalText] = useState()
    //ReAuth
    const [ModalAuth, setModalAuth] = useState(false)
    const [Changes, setChanges] = useState(false)
    //Form variables
    const [FormObjects, setFormObjects] = useState({
        //About/General Form
        eventPass: "",
        eventName: "",
        visibility: "hidden",
        address: "",
        lat: "",
        long: "",
        eventColor: "",
        eventImage: "", //https://sahat.lamk.fi/saveFile
        eventWebUrl: "",
        bodyText1: "",
        bodyText2: "",
        bodyText3: "",
        bodyText4: "",
        disclaimer1: "",
        disclaimer2: "",
        placeName: "",
        placeAddress: "",
        placePhone: "",
        placeEmail: "",
        eventTitle: "",
        MiWebsite: "",
        MiOrg: "",
        MiEmail: "",
        //other forms
        participants: [],
        programme: [],
        speakers: [],
        sponsors: [],
        mapmarkers: {
            restaurants: [],
            hotels: [],
            others: [],
        },
        venue: [],
        //more about from stuff (deprecated)
        bodyText: [],
        disclaimer: [],
        
    })
    //Input event id, get data to set formobjects
    async function parseEventData(id){
        if(Changes){
            return null
        }
        let data = await getEventData(id);
        if(data === null){
            return null;
        }
        let pass = await getPassData(data ? data.metadata.eventName : null)
        //console.log(pass)
        if(data){
            setFormObjects({
                //About Form
                eventPass: `${pass}`,
                eventName: `${data.metadata.eventName}`,
                eventImage: `${data.metadata.eventImage}`, //https://sahat.lamk.fi/saveFile
                eventColor: `${data.metadata.colorScheme}`,
                visibility: `${data.metadata.visibility}`,
                address: `${data.metadata.address}`,
                lat: `${data.metadata.lat}`,
                long: `${data.metadata.long}`,
                eventWebUrl: `${data.about.eventWebUrl}`,
                bodyText1: `${data.about.bodyText1}`,
                bodyText2: `${data.about.bodyText2}`,
                bodyText3: `${data.about.bodyText3}`,
                bodyText4: `${data.about.bodyText4}`,
                disclaimer1: `${data.about.disclaimer1}`,
                disclaimer2: `${data.about.disclaimer2}`,
                placeName: `${data.about.eventPlace.name}`,
                placeAddress: `${data.about.eventPlace.address}`,
                placePhone: `${data.about.eventPlace.phone}`,
                placeEmail: `${data.about.eventPlace.email}`,
                eventTitle: `${data.about.title}`,
                MiWebsite: `${data.about.moreInformation.eventWebsite}`,
                MiOrg: `${data.about.moreInformation.organizer}`,
                MiEmail: `${data.about.moreInformation.email}`,
                participants: data.participants,
                programme: data.programme,
                speakers: data.speakers,
                sponsors: data.sponsors,
                bodyText: data.about.bodyText,
                disclaimer: data.about.disclaimer,
                venue: data.venue,
                mapmarkers: data.mapData
            })
        }
    }
    //When EditID is set and if it excists, run parseEventData
    useEffect(() => {
        
        if(EditID){
            parseEventData(EditID);
        }
        else{
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [EditID])


    //Variables for selected navbar element highlighting

    //Change forms in the screen
    function selectForm(e){
        setActiveForm(e.target.name)
    }
    if(ActiveForm === "AboutForm"){
        container = <AboutForm 
            editForm={changeHandler}
            appendForm={appendForm} 
            bodyTexts={FormObjects.bodyText} 
            disclaimers={FormObjects.disclaimer} 
            FO={FormObjects}
            fileToUpload={fileToUpload}
        />
    }
    else if(ActiveForm === "GeneralForm"){
        container = <GeneralCard
            editForm={changeHandler}
            appendForm={appendForm}
            FO={FormObjects}
            fileToUpload={fileToUpload}
            ID={EditID}
            latlongForm={latlongForm}
        />
    }
    else if(ActiveForm === "ParticipantsForm"){
        container = <ParticipantsForm 
        editForm={appendForm}
        subForm={FormObjects.participants}/>
    }
    else if(ActiveForm === "ProgrammeForm"){
        container = <ProgrammeForm 
        editForm={appendForm} 
        fileToUpload={fileToUpload}
        subForm={FormObjects.programme}/>
    }
    else if(ActiveForm === "SpeakersForm"){
        container = <SpeakersForm 
        editForm={appendForm} 
        fileToUpload={fileToUpload}
        subForm={FormObjects.speakers}
        EditID={EditID}
        />
    }
    else if(ActiveForm === "SponsorsForm"){
        container = <SponsorsForm 
        editForm={appendForm} 
        fileToUpload={fileToUpload}
        subForm={FormObjects.sponsors}
        EditID={EditID}/>
    }
    else if(ActiveForm === "VenueTabForm"){
        container = <VenueTabForm 
        editForm={appendForm} 
        fileToUpload={fileToUpload}
        subForm={FormObjects.venue}
        EditID={EditID}/>
    }
    else if(ActiveForm === "MapMarkerForm"){
        container = <MapMarkerForm
        editForm={appendForm}
        fileToUpload={fileToUpload}
        subForm={FormObjects.mapmarkers}
        EditID={EditID}/>
    }
    else{
        container = null
    }
    //changes formobjects, also gets rid of path from file inputs
    function changeHandler(e){ //tuntuu redundantilta, vois poistaa myöhemmin emt.
        //console.log(e.target)
        //e.preventDefault();
        if(e.target.type === "file"){
            setFormObjects({
                ...FormObjects,
                [e.target.name]: [(e.target.value).match(/[^\\/]*$/)[0]]
            })
        }
        else{
            setFormObjects({
                ...FormObjects,
                [e.target.name]: [e.target.value]
            })
        }
        setChanges(true)
    }
    //same as changeHandler, but target and value is more specified
    function appendForm(target,value){
        setFormObjects({
            ...FormObjects,
            [target]: value
        })
        setChanges(true)
    }
    function latlongForm(lat, long){
        setFormObjects({
            ...FormObjects,
            lat: lat,
            long: long
        })
        setChanges(true)
    }
    //Complete form (to send to back-end)
    let finalForm = {
        eventPass: `${FormObjects.eventPass}`,
        metadata: {
            eventName: `${FormObjects.eventName}`,
            eventImage: `${FormObjects.eventImage}`,
            visibility: `${FormObjects.visibility}`,
            colorScheme: `${FormObjects.eventColor}`,
            address: `${FormObjects.address}`,
            lat: `${FormObjects.lat}`,
            long: `${FormObjects.long}`
        },
        about: {
            eventWebUrl: `${FormObjects.eventWebUrl}`,
            eventPlace: {
                name: `${FormObjects.placeName}`,
                address: `${FormObjects.placeAddress}`,
                phone: `${FormObjects.placePhone}`,
                email: `${FormObjects.placeEmail}`
            },
            title: `${FormObjects.eventTitle}`,
            // bodyText: FormObjects.bodyText, //implemented in mobile?
            bodyText1: `${FormObjects.bodyText1}`,
            bodyText2: `${FormObjects.bodyText2}`,
            bodyText3: `${FormObjects.bodyText3}`,
            bodyText4: `${FormObjects.bodyText4}`,
            moreInformation: {
                eventWebsite: `${FormObjects.MiWebsite}`,
                organizer: `${FormObjects.MiOrg}`,
                email: `${FormObjects.MiEmail}`
            },
            // disclaimer: FormObjects.disclaimer //implemented in mobile?
            disclaimer1: `${FormObjects.disclaimer1}`,
            disclaimer2: `${FormObjects.disclaimer2}`,
        },
        participants: FormObjects.participants,
        programme: FormObjects.programme,
        speakers: FormObjects.speakers,
        sponsors: FormObjects.sponsors,
        venue: FormObjects.venue,
        mapData: FormObjects.mapmarkers
    }
    //func to create event
    function createEventPost(form){
        let adminToken = localStorage.getItem("Session")
        let route;
        if(EditID){
            route = "/updateEvent" 
            form.id = EditID;
            setModalText("Creating Event");

        }else{
            route = "/createEvent"
            setModalText("Editing Event");

        }
        setModalShow(true)
        //Field checks
        for(let i in form.mapData){
            for(let j in form.mapData[i]){
                if(form.mapData[i][j].lat === "" || form.mapData[i][j].long === ""){
                    setModalShow(false)
                    toast("Error", "Map Marker: Missing latitude and/or longitude")
                    return null
                }
            }
        }
        if(form.eventPass === ""){
            setModalShow(false)
            toast("Error", "Password field is empty")
            return null
        }
        if(form.metadata.lat === "" || form.metadata.long === ""){
            setModalShow(false)
            toast("Error", "latitude and/or longitude is empty")
            return null
        }
        console.log(form.programme)
        axios.post(baseURL+route, 
        form,
        {
            headers:{
                Authorization: "Bearer "+adminToken
            }
        })
        .then(function (response) {
            // handle success
            //console.log("event create success");
            //console.log(response);
            let id;
            
            if(EditID){
                id = EditID;
            }
            else{
                setEditID(response.data._id)
                id = response.data._id
            }

            if(Files.length > 0){
                setModalText("Uploading files . . .")
                uploadFiles(Files, id)
            }
            else{
                //props.changeContent("AdminScreen")
                setModalShow(false)
                toast("Success", "Changes were saved")
            }
            setChanges(false)
        })
        .catch(function (error) {
            // handle error
            //console.log("event create fail");
            
            if(error.response){
                
                setModalShow(false)
                toast("Error",`${error.response.data.message}`)

                if(error.response.status === 401){
                    setModalAuth(true)
                }
            }
            else{
                setModalShow(false)
                toast("Error","Cannot connect to the server")
            }
        })
    }
    function getPassData(eventName){
        const req = axios.get(baseURL+"/findEventPlaintextPass",
        {
            headers:{
              Authorization: "Bearer "+localStorage.getItem("Session")
            }
        })
        return req
        .then(function (res) {
            let pass = ""
            for(let i in res.data){
                if(res.data[i].eventName === eventName){
                    pass = res.data[i].eventPass
                    break;
                }
            }
            return pass;
        })
        .catch(function (error) {
            console.log(error);

            if(error.response && error.response.status === 401){
                setModalAuth(true)
            }
            return ""
        })
    }
    //input event id, get eventdata
    function getEventData(id){
        const req = axios.post(baseURL+"/findEventAdmin",{
            id: id
        },
        {
            headers:{
              Authorization: "Bearer "+localStorage.getItem("Session")
            }
        })
        return req
        .then(function (res) {
            return res.data;
        })
        .catch(function (error) {
            //console.log(error);
            //getEventData(id)
            if(error.response && error.response.status === 401){
                setModalAuth(true)
            }
            return null
        })
    }
    //function that uploads files.
    function uploadFile(file, cat, id){
        let fd = new FormData();
        //console.log(file)
        fd.append("id", id)
        fd.append("myFiles", file)
        setModalText("Processing: "+file.name);
        const req = axios.post(baseURL+"/saveFile",
        fd, 
        {
            headers: {
                'Content-Type': false,
                'processdata': false,
                Authorization: "Bearer "+localStorage.getItem("Session")
            }
        })
        return req
        .then(function (res){
            //console.log(res)
            setModalText("Successfully sent file: "+file.name);
            return true
        })
        .catch(function (error){
            //console.log(error);

            if(error.response.status === 401){
                setModalAuth(true)
            }
            return false
        })
    }

    /*
    {
        category: kategoria,
        file: tiedosto,
        bound: (ei kahta eventImage paitsi muut)
    }
    */
    async function uploadFiles(files, id){
        //let i;
        //console.log("ID on " +id)
        // for(i = 0; i < files.length; i++){
        //     await uploadFile(files[i].file, "myFiles", id)) 
        // }
        let retry = 0;
        while(files.length > 0 && retry < 3){
            if(await uploadFile(files[0].file, "myFiles", id)){
                retry = 0
                files.splice(0, 1);
            }
            else{
                //console.log("Retry file")
                retry++;
            }
        }
        if(retry >= 3){
            setModalShow(false)
            toast("Error","Failed to upload a file after multiple attempts")
        }
        else{
            setModalShow(false)
            toast("Success","Changes were saved")
        }
        //props.changeContent("AdminScreen")
    }
    //adds file to list of files to upload
    function fileToUpload(e){
        let files = Files;
        let file = e.target.files[0]
        let category = e.target.name;
        //Check if file already exists or (incase of eventImage) is already bound to input
        let found = false;
        let i;
        for(i = 0; i < files.length; i++){
            if(e.target.name === "eventImage" && 
            files[i].bound === e.target.name){
                found = true;
                break;
            }
            else if(file && files[i].file.name === file.name){
                found = true;
                break;
            }
        }
        if(found){
            //console.log("Dup found")
            files.splice(i,1);
        }
        else{
            //console.log("dup not found")
        }
        files.push(
            {
                category: category,
                file: file,
                bound: e.target.name
            }
        );

        setFiles(files)
        //console.log(Files)
    }

    function toast(header, body){
        setToastHeader(header)
        setToastBody(body)
        setToastShow(true)
    }


    return (
        <div id="CreateEventForm">
            <Modal show={ModalShow} backdrop="static" keyboard={false}>
                <Modal.Header>Processing request <Spinner animation="border"/></Modal.Header>
                <Modal.Body>{ModalText}</Modal.Body>
            </Modal>
            <Modal show={ModalAuth} backdrop="static" keyboard={false}>
                <Modal.Header>Authentication token has expired. Please reauthenticate and try again.</Modal.Header>
                <Modal.Body>
                    <LoginScreen
                        changeContent={()=>{}}
                        visibility={setModalAuth}
                        EventID={EditID}
                        return={(id)=>{parseEventData(id)}}/>
                </Modal.Body>
            </Modal>
            <div>
                <Row style={{marginTop:'120px'}}>
                    <Col>
                        {container}
                    </Col>
                </Row>
            </div>
            <div style={{position:'fixed', top:'0', width:'100%', backgroundColor:'white', zIndex:'2'}}>
                <Navbar expand="lg" style={{display:'flex', paddingLeft:'50px', paddingRight:'50px', justifyContent:'center', alignItems:'center', flexDirection:'row', backgroundColor:'white'}}>
                    <Button style={{flex:'1'}} className="otherButtons" onClick={()=>
                    {
                        if(Changes){
                            if(window.confirm("Are you sure?! Unsubmitted events are not saved!")){
                                props.changeContent("AdminScreen")
                            }  
                        }
                        else{
                            props.changeContent("AdminScreen")
                        }
                    }}>Return to Main Menu</Button>
                    <div style={{display:'flex', flex:'6', alignContent: 'center', justifyContent:'center', flexDirection:'row'}}>
                        <Image src="https://pbs.twimg.com/profile_images/572706560015470592/Jszif-0y_normal.png" style={{marginRight:'10px'}}/>
                        <Navbar.Brand><h3>{FormObjects.eventName ? `${FormObjects.eventName}`:null}</h3></Navbar.Brand>
                    </div>
                    <Button style={{flex:'1'}} className="otherButtons" onClick={()=>createEventPost(finalForm)}>Save Changes</Button>
                </Navbar>
                <div style={{display: 'flex', justifyContent: 'center'}} >
                    <ButtonGroup className="navbarButtons" style={{display: 'flex', flexWrap: 'wrap'}}>
                        <Button name="GeneralForm" onClick={selectForm} className={ActiveForm === "GeneralForm" ? "active" : "inactive"}>General</Button>
                        <Button name="AboutForm" onClick={selectForm} className={ActiveForm === "AboutForm" ? "active" : "inactive"}>About</Button>
                        <Button name="ParticipantsForm" onClick={selectForm} className={ActiveForm === "ParticipantsForm" ? "active" : "inactive"}>Participants</Button>
                        <Button name="ProgrammeForm" onClick={selectForm} className={ActiveForm === "ProgrammeForm" ? "active" : "inactive"}>Programme</Button>
                        <Button name="SpeakersForm" onClick={selectForm} className={ActiveForm === "SpeakersForm" ? "active" : "inactive"}>Speakers</Button>
                        <Button name="SponsorsForm" onClick={selectForm} className={ActiveForm === "SponsorsForm" ? "active" : "inactive"}>Sponsors</Button>
                        <Button name="VenueTabForm" onClick={selectForm} className={ActiveForm === "VenueTabForm" ? "active" : "inactive"}>Venue</Button>
                        <Button name="MapMarkerForm" onClick={selectForm} className={ActiveForm === "MapMarkerForm" ? "active" : "inactive"}>Map Marker</Button>
                    </ButtonGroup>
                </div>
            </div>
            
            <div style={{position:"fixed", top:"100px",right:"20px", zIndex:'5000'}}>
                <Toast onClose={()=>setToastShow(false)} show={ToastShow} delay={5000} style={{zIndex:'5'}} autohide>
                    <Toast.Header className={ToastHeader === "Success" ? "text-success" : ToastHeader === "Error" ? "text-danger" : ""}>{ToastHeader}</Toast.Header>
                    <Toast.Body>{ToastBody}</Toast.Body>
                </Toast>
            </div>
            
            {/* <div>{props.id ? <p>DebugMsg. Edit form "{props.id}"</p> : null}</div> */}
            {/* <button name="AboutForm" onClick={selectForm}>About</button>
            <button name="ParticipantsForm" onClick={selectForm}>Participants</button>
            <button name="ProgrammeForm" onClick={selectForm}>Programme</button>
            <button name="SpeakersForm" onClick={selectForm}>Speakers</button>
            <button name="SponsorsForm" onClick={selectForm}>Sponsors</button>
            <button name="VenueTabForm" onClick={selectForm}>VenueTab</button>
            <button onClick={()=>createEventPost(finalForm)}>{props.id ? "Edit Event" : "Create Event"}</button>
            <button onClick={()=>
                {
                    if(window.confirm("Are you sure?! Unsubmitted events are not saved!")){
                        props.changeContent("AdminScreen")
                    }  
                }}>Cancel
            </button> */}
            
            {/* <input type="file" name="test" encType="multipart/form-data" onChange={(e)=>{
                //fileToUpload(e)
                uploadFile(e.target.files[0],"test")
            }}/> */}
            
            {/* <p>{Changes ? "Are Changes" : "No Changes"}</p>
            <p>{JSON.stringify(finalForm, null, 2)}</p>
            <p>{JSON.stringify(Files,null,2)}</p> */}
        </div>
    )
}
export default CreateEventForm

/*
    let formObject = {
        eventPass: "eventin passu",
            metadata: {
              eventName: "simon testi 2",
              eventImage: "Test"
            },
            about: {
              eventWebUrl: "Test",
              eventPlace: {
                  name: "Test",
                  address: "Test",
                  phone: "Test",
                  email: "Test"
            },
            title: "Test",
            bodyText1: "Test",
            bodyText2: "Test",
            bodyText3: "Test",
            bodyText4: "Test",
            moreInformation: {
                eventWebsite: "Test",
                organizer: "Test",
                email: "Test"
            },
            disclaimer1: "Test",
            disclaimer2: "Test"
        },
        participants: [
            {
                Country: "Test",
                FirstName: "Test",
                LastName: "Test",
                Email: "Test",
                Phone: "Test",
                Company: "Test"
            }
        ],
        programme: [
            {
                "Time": "Test",
                "Location": "Test",
                "Description": "Test",
                "NameOfSpeaker": "Test",
                "TitleOfSpeaker": "Test",
                "SpecialTitleOfSpeaker": "Test",
                "CompanyOfSpeaker": "Test"
            }
        ],
        speakers: [
            {
                "Speaker": "Test",
                "Title": "Test",
                "SpecialTitle": "Test",
                "Company": "Test",
                "ImageID": "https://sahat.lamk.fi/images/speakerImages/${imageID}"
            }
        ],
        sponsors: [
            {
                "CompanyName": "Test",
                "CompanyUrl": "Test",
                "ImageID": "Test"
            }
        ]
    }
*/