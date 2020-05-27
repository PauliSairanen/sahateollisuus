//Component for handling event creation
import React, {useState} from 'react'
import axios from 'axios';


const CreateEventForm = (props) => { // Todo rename to CreateEventScreen
    const baseURL = 'https://sahat.lamk.fi';

    //Visible forms controller
    const [ActiveForm, setActiveForm] = useState("AboutForm")
    let container;

    if(ActiveForm == "AboutForm"){
        container = <AboutForm editForm={changeHandler}/>
    }
    else if(ActiveForm == "ParticipantsForm"){
        container = <ParticipantsForm editForm={appendForm}/>
    }
    else if(ActiveForm == "ProgrammeForm"){
        container = <ProgrammeForm editForm={appendForm}/>
    }
    else if(ActiveForm == "SpeakersForm"){
        container = <SpeakersForm editForm={appendForm}/>
    }
    else if(ActiveForm == "SponsorsForm"){
        container = <SponsorsForm editForm={appendForm}/>
    }
    else{
        container = null
    }
    //Form variables
    const [FormObjects, setFormObjects] = useState({
        //About Form
        eventPass: "",
        eventName: "",
        eventWebUrl: "",
        placeName: "",
        placeAddress: "",
        placePhone: "",
        placeEmail: "",
        eventTitle: "",
        MiWebsite: "",
        MiOrg: "",
        MiEmail: "",
        participants: [],
        programme: [],
        speakers: [],
        sponsors: []
    })
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
            eventImage: "Not implemented"
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
            bodyText1: "Not implemented",
            bodyText2: "Not implemented",
            bodyText3: "Not implemented",
            bodyText4: "Not implemented",
            moreInformation: {
                eventWebsite: `${FormObjects.MiWebsite}`,
                organizer: `${FormObjects.MiOrg}`,
                email: `${FormObjects.MiEmail}`
            },
            disclaimer1: "Not implemented",
            disclaimer2: "Not implemented"
        },
        participants: FormObjects.participants,
        programme: FormObjects.programme,
        speakers: FormObjects.speakers,
        sponsors: FormObjects.sponsors
    }
    //func to create event
    function createEventPost(form){
        let adminToken = localStorage.getItem("Session")
        axios.post(baseURL+'/createEvent', 
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
        })
        .catch(function (error) {
            // handle error
            console.log("event create fail");
            console.log(error);
        })
    }
    function selectForm(e){
        setActiveForm(e.target.name)
    }
    //<AboutForm editForm={changeHandler}/>
    return (
        <>
            <button name="AboutForm" onClick={selectForm}>About</button>
            <button name="ParticipantsForm" onClick={selectForm}>Participants</button>
            <button name="ProgrammeForm" onClick={selectForm}>Programme</button>
            <button name="SpeakersForm" onClick={selectForm}>Speakers</button>
            <button name="SponsorsForm" onClick={selectForm}>Sponsors</button>
            {container}
            <button onClick={()=>createEventPost(finalForm)}>Submit Event</button>
            <p>{JSON.stringify(finalForm, null, 2)}</p>
        </>
    )
}

const AboutForm = (props) => {
    
    return(
        <form onChange={props.editForm} autoComplete="off">
            <input type="text" name="eventPass" placeholder="Event Password"/>
            <input type="text" name="eventName" placeholder="Event Name"/>
            <input type="text" name="eventWebUrl" placeholder="Event URL"/>
            <input type="text" name="placeName" placeholder="Place Name"/>
            <input type="text" name="placeAddress" placeholder="Place Address"/>
            <input type="text" name="placePhone" placeholder="Place Phone"/>
            <input type="text" name="placeEmail" placeholder="Place Email"/>
            <input type="text" name="eventTitle" placeholder="Event Title"/>
            <input type="text" name="MiWebsite" placeholder="More info Website"/>
            <input type="text" name="MiOrg" placeholder="More info Organizer"/>
            <input type="text" name="MiEmail" placeholder="More info Email"/>

        </form>
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
*/
const ProgrammeForm = (props) => {
    const [Form, setForm] = useState([])
    function clickHandler(e){
        e.preventDefault(); //prevents page refresh
        let form = Form;
        form.push({
            Time: e.target.form[0].value,
            Location: e.target.form[1].value,
            Description: e.target.form[2].value,
            NameOfSpeaker: e.target.form[3].value,
            TitleOfSpeaker: e.target.form[4].value,
            SpecialTitleOfSpeaker: e.target.form[5].value,
            Company: e.target.form[6].value
        })
        document.getElementById("form").reset();
        setForm(form)
        props.editForm("programme", Form)
    }
    return(
        <form autoComplete="off" id="form">
            <input type="text" name="time" placeholder="Time"/>
            <input type="text" name="location" placeholder="Event Location"/>
            <input type="text" name="description" placeholder="Event Description"/> {/*TODO: Change into textarea*/}
            <input type="text" name="speakerName" placeholder="Speaker Name"/>
            <input type="text" name="speakerTitle" placeholder="Speaker Title"/>
            <input type="text" name="speakerSpecialTitle" placeholder="Speaker Special Title"/>
            <input type="text" name="speakerCompany" placeholder="Speaker Company"/>
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

    return(
        null
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