//Component for handling event creation
import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Container from 'react-bootstrap/Container'
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



/**
 * @param changeContent - change screen
 * @param id - Event to edit based on ID
 */
//Screen: Creates events based on FormObjects. 
const CreateEventForm = (props) => { // Todo rename to CreateEventScreen
    const baseURL = 'https://sahat.lamk.fi';

    //Visible forms controller
    const [ActiveForm, setActiveForm] = useState()
    const [EditID] = useState(props.id)
    const [Files, setFiles] = useState([])
    let container;
    //Form variables
    const [FormObjects, setFormObjects] = useState({
        //About Form
        eventPass: "",
        eventName: "",
        visibility: "hidden",
        eventImage: "", //https://sahat.lamk.fi/saveFile
        eventWebUrl: "",
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
            restaurant: [],
            hotel: [],
            other: []
        },
        venue: [],
        //more about from stuff
        bodyText: [],
        disclaimer: [],
        
    })
    //Input event id, get data to set formobjects
    async function parseEventData(id){
        let data = await getEventData(id);
        setFormObjects({
            //About Form
            eventPass: "",
            eventName: `${data.metadata.eventName}`,
            eventImage: `${data.metadata.eventImage}`, //https://sahat.lamk.fi/saveFile
            eventWebUrl: `${data.about.eventWebUrl}`,
            visibility: `${data.metadata.visibility}`,
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
            mapmarkers: data.mapmarkers
        })
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
        />
    }
    else if(ActiveForm === "SponsorsForm"){
        container = <SponsorsForm 
        editForm={appendForm} 
        fileToUpload={fileToUpload}
        subForm={FormObjects.sponsors}/>
    }
    else if(ActiveForm === "VenueTabForm"){
        container = <VenueTabForm 
        editForm={appendForm} 
        fileToUpload={fileToUpload}
        subForm={FormObjects.venue}/>
    }
    else if(ActiveForm === "MapMarkerForm"){
        container = <MapMarkerForm
        editForm={appendForm}
        fileToUpload={fileToUpload}
        subForm={FormObjects.mapmarkers}/>
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
    }
    //same as changeHandler, but target and value is more specified
    function appendForm(target,value){
        setFormObjects({
            ...FormObjects,
            [target]: value
        })
    }
    //Complete form (to send to back-end)
    let finalForm = {
        eventPass: `${FormObjects.eventPass}`,
        metadata: {
            eventName: `${FormObjects.eventName}`,
            eventImage: `${FormObjects.eventImage}`,
            visibility: `${FormObjects.visibility}`
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
            bodyText: FormObjects.bodyText, //implemented in mobile?
            moreInformation: {
                eventWebsite: `${FormObjects.MiWebsite}`,
                organizer: `${FormObjects.MiOrg}`,
                email: `${FormObjects.MiEmail}`
            },
            disclaimer: FormObjects.disclaimer //implemented in mobile?
        },
        participants: FormObjects.participants,
        programme: FormObjects.programme,
        speakers: FormObjects.speakers,
        sponsors: FormObjects.sponsors,
        venue: FormObjects.venue,
        mapMarkers: FormObjects.mapmarkers
    }
    //func to create event
    function createEventPost(form){
        let adminToken = localStorage.getItem("Session")
        let route;
        if(EditID){
            route = "/updateEvent" 
            form.id = EditID;
        }else{
            route = "/createEvent"
        }
        axios.post(baseURL+route, 
        form,
        {
            headers:{
                Authorization: "Bearer "+adminToken
            }
        })
        .then(function (response) {
            // handle success
            console.log("event create success");
            console.log(response);
            if(Files.length > 0){
                uploadFiles(Files, response.data._id)
            }
            else{
                props.changeContent("AdminScreen")
            }
        })
        .catch(function (error) {
            // handle error
            console.log("event create fail");
            console.log(error);
        })
    }
    //input event id, get eventdata
    function getEventData(id){
        const req = axios.post(baseURL+"/findEvent",{
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
            console.log(error);
        })
    }
    //function that uploads files.
    function uploadFile(file, cat, id){
        let fd = new FormData();
        //console.log(file)
        fd.append("id", id)
        fd.append("myFiles", file)
        const req = axios.post(baseURL+"/saveFile",
        fd, 
        {
            headers: {
                'category': "test",
                'Content-Type': false,
                'processdata': false,
            }
        })
        return req
        .then(function (res){
            console.log(res)
            return true
        })
        .catch(function (error){
            console.log(error);
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
        let i;
        //console.log("ID on " +id)
        for(i = 0; i < files.length; i++){
            await uploadFile(files[i].file, "myFiles", id) //todo testaa et await toimii
        }
        props.changeContent("AdminScreen")
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
            else if(files[i].file.name === file.name){
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
        files.push( //todo ID
            {
                category: category,
                file: file,
                bound: e.target.name
            }
        );

        setFiles(files)
        //console.log(Files)
    }

    return (
        <>
            <Navbar bg="light" variant="light" expand="lg">
                <Navbar.Brand>{props.id ? <p>Edit Event {FormObjects.eventName}</p> : <p>Create Event</p>}</Navbar.Brand>
                {ActiveForm ? <Navbar.Text>Current form: {ActiveForm}</Navbar.Text> : null}
            </Navbar>
            <Container className="containers">
                <Row className="rows" >
                    <Col className="cols" style={{display: 'flex', justifyContent: 'center'}} >
                        <ButtonGroup style={{display: 'flex', flexWrap: 'wrap'}}>
                            <Button name="AboutForm" onClick={selectForm} className="Button">About</Button>
                            <Button name="ParticipantsForm" onClick={selectForm} className="Button">Participants</Button>
                            <Button name="ProgrammeForm" onClick={selectForm} className="Button">Programme</Button>
                            <Button name="SpeakersForm" onClick={selectForm} className="Button">Speakers</Button>
                            <Button name="SponsorsForm" onClick={selectForm} className="Button">Sponsors</Button>
                            <Button name="VenueTabForm" onClick={selectForm} className="Button">Venue</Button>
                            <Button name="MapMarkerForm" onClick={selectForm} className="Button">Map Marker</Button>
                            <Button onClick={()=>createEventPost(finalForm)}>{props.id ? "Edit Event" : "Create Event"}</Button>
                            <Button onClick={()=>
                            {
                                if(window.confirm("Are you sure?! Unsubmitted events are not saved!")){
                                    props.changeContent("AdminScreen")
                                }  
                            }}>Cancel</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
                <Row style={{marginTop:'20px'}}>
                    <Col>
                        {container}
                    </Col>
                </Row>
            </Container>
            
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
            <p>{JSON.stringify(finalForm, null, 2)}</p>
            <p>{JSON.stringify(Files,null,2)}</p>
        </>
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