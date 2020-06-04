//Component for handling event creation
import React, {useState, useEffect} from 'react'
import axios from 'axios';

import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'

const CreateEventForm = (props) => { // Todo rename to CreateEventScreen
    const baseURL = 'https://sahat.lamk.fi';

    //Visible forms controller
    const [ActiveForm, setActiveForm] = useState()
    const [EditID, setEditID] = useState(props.id)
    const [Files, setFiles] = useState([])
    let container;
    //Form variables
    const [FormObjects, setFormObjects] = useState({
        //About Form
        eventPass: "",
        eventName: "",
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
        //more about from stuff
        bodyText: [],
        disclaimer: [],
        venue: []
    })
    async function parseEventData(id){
        let data = await getEventData(id);
        setFormObjects({
            //About Form
            eventPass: "",
            eventName: `${data.metadata.eventName}`,
            eventImage: `${data.metadata.eventImage}`, //https://sahat.lamk.fi/saveFile
            eventWebUrl: `${data.about.eventWebUrl}`,
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
            venue: data.venue
        })
        return true;
    }
    useEffect(() => {
        
        if(EditID){
            parseEventData(EditID);
        }
        else{
        }
    }, [EditID])

    if(ActiveForm === "AboutForm"){
        container = <AboutForm editForm={changeHandler} appendForm={appendForm} bodyTexts={FormObjects.bodyText} disclaimers={FormObjects.disclaimer} FO={FormObjects}/>
    }
    else if(ActiveForm === "ParticipantsForm"){
        container = <ParticipantsForm editForm={appendForm}/>
    }
    else if(ActiveForm === "ProgrammeForm"){
        container = <ProgrammeForm editForm={appendForm}/>
    }
    else if(ActiveForm === "SpeakersForm"){
        container = <SpeakersForm editForm={appendForm}/>
    }
    else if(ActiveForm === "SponsorsForm"){
        container = <SponsorsForm editForm={appendForm}/>
    }
    else if(ActiveForm === "VenueTabForm"){
        container = <VenueTabForm editForm={appendForm}/>
    }
    else{
        container = null
    }
    function changeHandler(e){ //tuntuu redundantilta, vois poistaa myöhemmin emt.
        setFormObjects({
            ...FormObjects,
            [e.target.name]: [e.target.value]
        })
    }
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
            eventImage: `${FormObjects.eventImage}`
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
            bodyText: FormObjects.bodyText, //Not implemented
            moreInformation: {
                eventWebsite: `${FormObjects.MiWebsite}`,
                organizer: `${FormObjects.MiOrg}`,
                email: `${FormObjects.MiEmail}`
            },
            disclaimer: FormObjects.disclaimer
        },
        participants: FormObjects.participants,
        programme: FormObjects.programme, //pdf not implemented
        speakers: FormObjects.speakers,
        sponsors: FormObjects.sponsors,
        venue: FormObjects.venue //implemented?
    }
    //func to create event
    function createEventPost(form){
        let adminToken = localStorage.getItem("Session")
        let route;
        if(EditID){
            route = "/updateEvent" //TODO laita ID ({id: props.id})
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
            props.changeContent("AdminScreen")
        })
        .catch(function (error) {
            // handle error
            console.log("event create fail");
            console.log(error);
        })
    }
    async function getEventData(id){
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
    //Todo function that uploads files.
    function uploadFile(file, cat){
        let fd = new FormData(file);

        axios.post(baseURL+"/saveFiles",fd,
        {
            headers: {
                category: cat,
                'content-type': "multipart/form-data"
            }
        })
        .then(function (res){
            console.log(res)
        })
        .catch(function (error){
            console.log(error);
        })
    }
    //FILE UPLOAD TEST METHODS
    function uploadFiles(files){
        let i;
        for(i = 0; i < files.length; i++){
            uploadFile(files.file, files.category)
        }
    }
    function fileToUpload(e){
        let files = Files;
        let file = e.target.files[0]
        let category = e.target.name;
        //Check if file already exists
        let found = false;
        let i;
        for(i = 0; i < files.length; i++){
            if(files[i].name === file.name){
                found = true;
                break;
            }
        }
        if(found){
            console.log("Dup found")
            files.splice(i,1);
        }
        else{
            console.log("dup not found")
        }
        files.push(
            {
                category: category,
                file: file
            }
        );

        setFiles(files)
        console.log(Files)
    }
    //TESTS END HERE
    function selectForm(e){
        setActiveForm(e.target.name)
    }
    //<AboutForm editForm={changeHandler}/>
    return (
        <>
            <Navbar bg="light" variant="light" expand="lg">
                <Navbar.Brand>Create Event Form</Navbar.Brand>
                
            </Navbar>
            <div>{props.id ? <p>DebugMsg. Edit form "{props.id}"</p> : null}</div>
            <button name="AboutForm" onClick={selectForm}>About</button>
            <button name="ParticipantsForm" onClick={selectForm}>Participants</button>
            <button name="ProgrammeForm" onClick={selectForm}>Programme</button>
            <button name="SpeakersForm" onClick={selectForm}>Speakers</button>
            <button name="SponsorsForm" onClick={selectForm}>Sponsors</button>
            <button name="VenueTabForm" onClick={selectForm}>VenueTab</button>
            {container}
            <button onClick={()=>createEventPost(finalForm)}>{props.id ? "Edit Event" : "Create Event"}</button>
            <button onClick={()=>
                {
                    if(window.confirm("Are you sure?! Unsubmitted events are not saved!")){
                        props.changeContent("AdminScreen")
                    }  
                }}>Cancel
            </button>
            <input type="file" name="test" onChange={(e)=>{
                fileToUpload(e)
            }}/>
            <p>{JSON.stringify(finalForm, null, 2)}</p>
        </>
    )
}

const AboutForm = (props) => {
    const [Form, setForm] = useState(props.bodyTexts)
    const [Form2, setForm2] = useState(props.disclaimers)
    const [Fields, setFields] = useState(createFields)
    const [Fields2, setFields2] = useState(createFields2)

    function createFields(){
        if(Form){
            let list = Form.map((items,index)=>{
                return (
                <div key={index} id={'ta'+index}>
                    <textarea defaultValue={items} name={index} onChange={changeHandler}/>
                    {/* <button id={'rem'+index} name={index} onClick={remHandler}>-</button> //disabled until I can figure this out */}
                </div>
                )
            })
            return list;
        }
    }
    function changeHandler(e){
        //console.log(Form)
        let temp = Form;
        temp[e.target.name] = e.target.value;
        setForm(temp)
    }
    function remHandler(e){
        
    }
    function clickHandler(e){
        let temp = Form;
        temp.push("")
        setFields(createFields)
    }
    //Redundant code below, 
    function createFields2(){
        if(Form2){
            let list = Form2.map((items,index)=>{
                return (
                <div key={index} id={'dis'+index}>
                    <textarea defaultValue={items} name={index} onChange={changeHandler2}/>
                    {/* <button id={'rem'+index} name={index} onClick={remHandler}>-</button> //disabled until I can figure this out */}
                </div>
                )
            })
            return list;
        }
    }
    function changeHandler2(e){
        //console.log(Form2)
        let temp = Form2;
        temp[e.target.name] = e.target.value;
        setForm2(temp)
    }
    function remHandler2(e){
        
    }
    function clickHandler2(e){
        let temp = Form2;
        temp.push("")
        setFields2(createFields2)
    }
    return(
        <div>
        <form onChange={props.editForm} autoComplete="off" id="abtform">
            <input type="text" name="eventPass" placeholder="Event Password" defaultValue={props.FO.eventPass}/>
            <input type="text" name="eventName" placeholder="Event Name" defaultValue={props.FO.eventName}/>
            <input type="text" name="eventWebUrl" placeholder="Event URL" defaultValue={props.FO.eventWebUrl}/>
            <input type="text" name="placeName" placeholder="Place Name" defaultValue={props.FO.placeName}/>
            <input type="text" name="placeAddress" placeholder="Place Address" defaultValue={props.FO.placeAddress}/>
            <input type="text" name="placePhone" placeholder="Place Phone" defaultValue={props.FO.placePhone}/>
            <input type="text" name="placeEmail" placeholder="Place Email" defaultValue={props.FO.placeEmail}/>
            <input type="text" name="eventTitle" placeholder="Event Title" defaultValue={props.FO.eventTitle}/>
            <input type="text" name="MiWebsite" placeholder="More info Website" defaultValue={props.FO.MiWebsite}/>
            <input type="text" name="MiOrg" placeholder="More info Organizer" defaultValue={props.FO.MiOrg}/>
            <input type="text" name="MiEmail" placeholder="More info Email" defaultValue={props.FO.MiEmail}/>
        </form>
            <label>Event Image</label>
            <input type="file" name="eventImage" onChange={(e)=>{
                props.appendForm("eventImage", `https://sahat.lamk.fi/images/metadataImages/${e.target.files[0].name}`)
            }}/>
        {Fields}
        <button onClick={clickHandler}>Add BodyText</button>
        {Fields2}
        <button onClick={clickHandler2}>Add Disclaimer</button>
        </div>
    )
}
/*
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
*/
const ParticipantsForm = (props) => {
    const [Form, setForm] = useState([])
    function clickHandler(e){
        e.preventDefault(); //prevents page refresh
        let form = Form;
        form.push({
            Country: e.target.form[0].value,
            FirstName: e.target.form[1].value,
            LastName: e.target.form[2].value,
            Email: e.target.form[3].value,
            Phone: e.target.form[4].value,
            Company: e.target.form[5].value
        })
        document.getElementById("form").reset();
        setForm(form)
        props.editForm("participants", Form)
    }
    
    return(
        <form autoComplete="off" id="form">
            <input type="text" name="country" placeholder="Country"/>
            <input type="text" name="firstName" placeholder="First Name"/>
            <input type="text" name="lastName" placeholder="Last Name"/>
            <input type="text" name="email" placeholder="Email"/>
            <input type="text" name="phone" placeholder="Phone"/>
            <input type="text" name="company" placeholder="Company"/>
            <button onClick={clickHandler}>Add Participant</button>
        </form>
    )
}
/*
{
    Time: "Test",
    Location: "Test",
    Description: "Test",
    NameOfSpeaker: "Test",
    TitleOfSpeaker: "Test",
    SpecialTitleOfSpeaker: "Test",
    CompanyOfSpeaker: "Test"
}
TODO Change to
{
    "day": "Päivä 1",
    "content": [
        {
            Time: "",
            Location: "",
            Description: "",
            NameOfSpeaker: "",
            TitleOfSpeaker: "",
            SpecialTitleOfSpeaker: "",
            CompanyOfSpeaker: "",
            Pdf: "Testi.pdf"
        }
    ]
}
*/
const ProgrammeForm = (props) => {
    const [Form, setForm] = useState([])
    function clickHandler(e){
        e.preventDefault(); //prevents page refresh
        let form = Form;
        
        let i;
        let found = false;
        for(i = 0; i < form.length; i++){
            if('day' in form[i]){
                if(form[i].day === "Päivä "+e.target.form[0].value){
                    found = true;
                    break;
                }
            }
        }
        if(found){
            form[i].content.push(
                {
                    Time: e.target.form[1].value,
                    Location: e.target.form[2].value,
                    Description: e.target.form[3].value,
                    NameOfSpeaker: e.target.form[4].value,
                    TitleOfSpeaker: e.target.form[5].value,
                    SpecialTitleOfSpeaker: e.target.form[6].value,
                    Company: e.target.form[7].value
                }
            )
        }
        else{
            form.push(
                {
                    day: "Päivä "+e.target.form[0].value,
                    content: [
                        {
                            Time: e.target.form[1].value,
                            Location: e.target.form[2].value,
                            Description: e.target.form[3].value,
                            NameOfSpeaker: e.target.form[4].value,
                            TitleOfSpeaker: e.target.form[5].value,
                            SpecialTitleOfSpeaker: e.target.form[6].value,
                            Company: e.target.form[7].value
                        }
                    ]
                }
            )
        }
        // form.push({
        //     Time: e.target.form[1].value,
        //     Location: e.target.form[2].value,
        //     Description: e.target.form[3].value,
        //     NameOfSpeaker: e.target.form[4].value,
        //     TitleOfSpeaker: e.target.form[5].value,
        //     SpecialTitleOfSpeaker: e.target.form[6].value,
        //     Company: e.target.form[7].value
        // })
        document.getElementById("form").reset();
        setForm(form)
        props.editForm("programme", Form)
    }
    return(
        <form autoComplete="off" id="form">
            <label>Day:</label>
            <input type="number" name="Date" min="0" defaultValue="0"/>
            <input type="text" name="time" placeholder="Time"/>
            <input type="text" name="location" placeholder="Event Location"/>
            <input type="text" name="description" placeholder="Event Description"/> {/*TODO: Change into textarea*/}
            <input type="text" name="speakerName" placeholder="Speaker Name"/>
            <input type="text" name="speakerTitle" placeholder="Speaker Title"/>
            <input type="text" name="speakerSpecialTitle" placeholder="Speaker Special Title"/>
            <input type="text" name="speakerCompany" placeholder="Speaker Company"/>
            {/* todo pdf */}
            <button onClick={clickHandler}>Add Programme</button>
        </form>
    )
}
/*
{
    "Speaker": "Test",
    "Title": "Test",
    "SpecialTitle": "Test",
    "Company": "Test",
    "ImageID": "not implemented" //https://sahat.lamk.fi/images/speakerImages/${imageID}
}
*/
const SpeakersForm = (props) => {
    const [Form, setForm] = useState([])
    function clickHandler(e){
        e.preventDefault(); //prevents page refresh
        let form = Form;
        form.push({
            Speaker: e.target.form[0].value,
            Title: e.target.form[1].value,
            SpecialTitle: e.target.form[2].value,
            Company: e.target.form[3].value,
            ImageID: "Not Implemented"
        })
        document.getElementById("form").reset();
        setForm(form)
        props.editForm("speakers", Form)
    }
    return(
        <form autoComplete="off" id="form"> 
            <input type="text" name="speaker" placeholder="Speaker"/>
            <input type="text" name="speakerTitle" placeholder="Speaker Title"/>
            <input type="text" name="speakerSpecialTitle" placeholder="Speaker Special Title"/>
            <input type="text" name="speakersCompany" placeholder="Speakers Company"/>
            {/*Todo: image input*/}
            <button onClick={clickHandler}>Add Speaker</button>
        </form>
    )
}
/*
{
    "CompanyName": "Test",
    "CompanyUrl": "Test",
    "ImageID": "Test"
}
*/
const SponsorsForm = (props) => {
    const [Form, setForm] = useState([])
    function clickHandler(e){
        e.preventDefault(); //prevents page refresh
        let form = Form;
        form.push({
            CompanyName: e.target.form[0].value,
            CompanyUrl: e.target.form[1].value,
            ImageID: "Not Implemented"
        })
        document.getElementById("form").reset();
        setForm(form)
        props.editForm("sponsors", Form)
    }
    return(
        <form autoComplete="off" id="form">
            <input type="text" name="sponsorCompany" placeholder="Company Name"/>
            <input type="text" name="sponsorURL" placeholder="Company URL"/>
            {/*TODO: image input*/}
            <button onClick={clickHandler}>Add Sponsor</button>
        </form>
    )
}
const VenueTabForm = (props) => {
    const [Form, setForm] = useState([])
    function clickHandler(e){
        e.preventDefault(); //prevents page refresh
        let form = Form;
        form.push({
            title: e.target.form[0].value,
            image: "Not implemented"
        })
        document.getElementById("form").reset();
        setForm(form)
        props.editForm("venue", Form)
    }
    return(
        <form autoComplete="off" id="form">
            <input type="text" name="title" placeholder="Venue Title"/>
            {/*TODO: Implement image input*/}
            <button onClick={clickHandler}>Add Venue</button>
        </form>
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