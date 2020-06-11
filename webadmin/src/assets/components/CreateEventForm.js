//Component for handling event creation
import React, {useState, useEffect} from 'react'
import axios from 'axios';
import xlsx from 'xlsx'

import FormTable from '../components/FormTable'

import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

/**
 * @param f - e.target
 */
function xlsxToJson(f){
    return new Promise((res)=>{
        //console.log(e.target.files[0])
        let file = f.files[0]
        if(file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
            let reader = new FileReader();
            reader.onload = function(e){
                let data = e.target.result;
                let xlsxBin = xlsx.read(data, {type:'binary'});
                const wsName = xlsxBin.SheetNames[0]
                const ws = xlsxBin.Sheets[wsName];

                const jsonData = xlsx.utils.sheet_to_json(ws,{header:1});
                //console.log(jsonData)
                let check = true
                while(check){
                    for(let i in jsonData){
                        if(!jsonData[i].length > 0){
                            jsonData.splice(i,1)
                            check = true;
                            break;
                        }
                        else{
                            check = false;
                        }
                    }
                }
                
                res(jsonData)
            };
            reader.readAsBinaryString(file)
        }
        else{
            console.log("invalid file input")
           res(null)
        }
    })
    
}
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
        eventStatus: "",
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
            eventStatus: `${FormObjects.eventStatus}`
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
            <ButtonGroup>
                <Button name="AboutForm" onClick={selectForm}>About</Button>
                <Button name="ParticipantsForm" onClick={selectForm}>Participants</Button>
                <Button name="ProgrammeForm" onClick={selectForm}>Programme</Button>
                <Button name="SpeakersForm" onClick={selectForm}>Speakers</Button>
                <Button name="SponsorsForm" onClick={selectForm}>Sponsors</Button>
                <Button name="VenueTabForm" onClick={selectForm}>Venue</Button>
                <Button name="MapMarkerForm" onClick={selectForm}>Map Marker</Button>
                <Button onClick={()=>createEventPost(finalForm)}>{props.id ? "Edit Event" : "Create Event"}</Button>
                <Button onClick={()=>
                {
                    if(window.confirm("Are you sure?! Unsubmitted events are not saved!")){
                        props.changeContent("AdminScreen")
                    }  
                }}>Cancel</Button>
            </ButtonGroup>
            <div>{props.id ? <p>DebugMsg. Edit form "{props.id}"</p> : null}</div>
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
            {container}
            {/* <input type="file" name="test" encType="multipart/form-data" onChange={(e)=>{
                //fileToUpload(e)
                uploadFile(e.target.files[0],"test")
            }}/> */}
            <p>{JSON.stringify(finalForm, null, 2)}</p>
            <p>{JSON.stringify(Files,null,2)}</p>
        </>
    )
}
/**
 * @param editForm - evoke changehandler
 * @param appendForm - evoke appendForm
 * @param bodytexts - bodytexts from formobjects
 * @param disclaimers - disclaimers from formobjects
 * @param FO - formobjects
 * @param fileToUpload - evoke fileToUpload
 */
const AboutForm = (props) => {
    const [Form, setForm] = useState(props.bodyTexts)
    const [Form2, setForm2] = useState(props.disclaimers)
    const [Fields, setFields] = useState(createFields)
    const [Fields2, setFields2] = useState(createFields2)

    //renders bodytexts
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
    //changes disclaimers
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
            <input type="text" name="eventStatus" placeholder="Event Status" defaultValue={props.FO.eventStatus}/>
            <input type="text" name="eventWebUrl" placeholder="Event URL" defaultValue={props.FO.eventWebUrl}/>
            <input type="text" name="placeName" placeholder="Place Name" defaultValue={props.FO.placeName}/>
            <input type="text" name="placeAddress" placeholder="Place Address" defaultValue={props.FO.placeAddress}/>
            <input type="text" name="placePhone" placeholder="Place Phone" defaultValue={props.FO.placePhone}/>
            <input type="text" name="placeEmail" placeholder="Place Email" defaultValue={props.FO.placeEmail}/>
            <input type="text" name="eventTitle" placeholder="Event Title" defaultValue={props.FO.eventTitle}/>
            <input type="text" name="MiWebsite" placeholder="More info Website" defaultValue={props.FO.MiWebsite}/>
            <input type="text" name="MiOrg" placeholder="More info Organizer" defaultValue={props.FO.MiOrg}/>
            <input type="text" name="MiEmail" placeholder="More info Email" defaultValue={props.FO.MiEmail}/>
            <label>Event Image</label>
            <input type="file" id="test" name="test" onChange={(e)=>{
                //props.appendForm("eventImage", `https://sahat.lamk.fi/images/metadataImages/${e.target.files[0].name}`)
                props.fileToUpload(e)
            }}/>
        </form>
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
/**
 * @param editForm - evoke appendForm
 * @param subForm - get formObject data to Form
 */
const ParticipantsForm = (props) => {
    const [Form, setForm] = useState(props.subForm)
    
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
    async function fileHandler(e){
        //console.log(e.target.files[0])
        let jsonData = await xlsxToJson(e.target)
        //console.log(jsonData)
        for(let i in jsonData){
            console.log(jsonData[i])
            if(i > 0){
                let form = Form
                form.push(
                    {
                        Country: jsonData[i][0],
                        FirstName: jsonData[i][1],
                        LastName: jsonData[i][2],
                        Email: jsonData[i][3],
                        Phone: jsonData[i][4],
                        Company: jsonData[i][5]
                    }
                )
                setForm(form)
                props.editForm("participants", Form)
            }
        }
    }
    return(
        <>
        <form autoComplete="off" id="form">
            <input type="text" name="country" placeholder="Country"/>
            <input type="text" name="firstName" placeholder="First Name"/>
            <input type="text" name="lastName" placeholder="Last Name"/>
            <input type="text" name="email" placeholder="Email"/>
            <input type="text" name="phone" placeholder="Phone"/>
            <input type="text" name="company" placeholder="Company"/>
            <button onClick={clickHandler}>Add Participant</button>
        </form>
        <label>.xlsx file input</label>
        <input type="file" onChange={fileHandler}/>
        {Form.length > 0 ? <FormTable form={Form} setForm={setForm}/> : null}
        
        </>
    )
}
/*
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
/**
 * @param editForm - evoke appendForm
 * @param subForm - get formObject data to Form
 * @param fileToUpload - put file to list of files to upload
 */
const ProgrammeForm = (props) => {
    const [Form, setForm] = useState(props.subForm)
    useEffect(() => {
        props.editForm("programme", Form)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Form])
    const keys = 
    [
        "Day",
        "Time",
        "Location",
        "Description",
        "Name of Speaker",
        "Title of Speaker",
        "Special Title of Speaker",
        "Company",
        "Pdf"
    ]
    function dataToForm(data){
        let form = [];
        console.log(data)
        for(let key in data){
            let i;
            let found = false;
            //console.log(data[key])
            for(i = 0; i < form.length; i++){
                if('day' in form[i]){
                    if(form[i].day === data[key].day){
                        found = true;
                        break;
                    }
                }
            }
            if(found){
                form[i].content.push(
                    {
                        Time: data[key].Time,
                        Location: data[key].Location,
                        Description: data[key].Description,
                        NameOfSpeaker: data[key].NameOfSpeaker,
                        TitleOfSpeaker: data[key].TitleOfSpeaker,
                        SpecialTitleOfSpeaker: data[key].SpecialTitleOfSpeaker,
                        Company: data[key].Company,
                        Pdf: data[key].Pdf
                    }
                )
            }
            else{
                form.push(
                    {
                        day: data[key].day,
                        content: [
                            {
                                Time: data[key].Time,
                                Location: data[key].Location,
                                Description: data[key].Description,
                                NameOfSpeaker: data[key].NameOfSpeaker,
                                TitleOfSpeaker: data[key].TitleOfSpeaker,
                                SpecialTitleOfSpeaker: data[key].SpecialTitleOfSpeaker,
                                Company: data[key].Company,
                                Pdf: data[key].Pdf
                            }
                        ]
                    }
                )
            }
            
            
        }
        setForm(form)
        //props.editForm("programme", Form)
    }
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
                    Company: e.target.form[7].value,
                    Pdf: (e.target.form[8].value).match(/[^\\/]*$/)[0]
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
                            Company: e.target.form[7].value,
                            Pdf: (e.target.form[8].value).match(/[^\\/]*$/)[0]
                        }
                    ]
                }
            )
        }
        document.getElementById("form").reset();
        setForm(form)
        props.editForm("programme", Form)
    }

    async function fileHandler(e){
        let jsonData = await xlsxToJson(e.target)
        console.log(jsonData)
        let list = []
        for(let i in jsonData){
            if(i > 0){       
                list.push(
                    {
                        day: "Päivä "+jsonData[i][0],
                        Time: jsonData[i][1],
                        Location: jsonData[i][2],
                        Description: jsonData[i][3],
                        NameOfSpeaker: jsonData[i][4],
                        TitleOfSpeaker: jsonData[i][5],
                        SpecialTitleOfSpeaker: jsonData[i][6],
                        Company: jsonData[i][7],
                        Pdf: jsonData[i][8],
                    }
                )
            }   
        }
        dataToForm(list)
    }

    return(
        <>
        <form autoComplete="off" id="form">
            <label>Day:</label>
            <input type="number" name="Date" min="0" defaultValue="0"/>
            <input type="text" name="time" placeholder="Time"/>
            <input type="text" name="location" placeholder="Event Location"/>
            {/* <input type="text" name="description" placeholder="Event Description"/> */}
            <textarea name="description" placeholder="Event Description"/>
            <input type="text" name="speakerName" placeholder="Speaker Name"/>
            <input type="text" name="speakerTitle" placeholder="Speaker Title"/>
            <input type="text" name="speakerSpecialTitle" placeholder="Speaker Special Title"/>
            <input type="text" name="speakerCompany" placeholder="Speaker Company"/>
            <input type="file" name="test" id="test" 
            onChange={(e)=>{props.fileToUpload(e)}}/>
            <button onClick={clickHandler}>Add Programme</button>
        </form>
        <label>.xlsx file input</label>
        <input type="file" onChange={fileHandler}/>
        {Form.length > 0 ? 
            <FormTable 
                form={Form} 
                setForm={(data) => dataToForm(data)} 
                keys={keys} 
                programme={true}
                fileToUpload={(e)=>{props.fileToUpload(e)}}
            /> : 
        null}
        </>
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
/**
 * @param editForm - evoke appendForm
 * @param subForm - get formObject data to Form
 * @param fileToUpload - put file to list of files to upload
 */
const SpeakersForm = (props) => {
    const [Form, setForm] = useState(props.subForm)
    function clickHandler(e){
        e.preventDefault(); //prevents page refresh
        let form = Form;
        form.push({
            Speaker: e.target.form[0].value,
            Title: e.target.form[1].value,
            SpecialTitle: e.target.form[2].value,
            Company: e.target.form[3].value,
            ImageID: (e.target.form[4].value).match(/[^\\/]*$/)[0]
        })
        document.getElementById("form").reset();
        setForm(form)
        props.editForm("speakers", Form)
    }
    async function fileHandler(e){
        let jsonData = await xlsxToJson(e.target)
        for(let i in jsonData){
            //console.log(jsonData[i])
            if(i > 0){
                let form = Form
                form.push(
                    {
                        Speaker: jsonData[i][0],
                        Title: jsonData[i][1],
                        SpecialTitle: jsonData[i][2],
                        Company: jsonData[i][3],
                        ImageID: jsonData[i][4],
                    }
                )
                setForm(form)
                props.editForm("speakers", Form)
            }
        }
    }
    return(
        <>
        <form autoComplete="off" id="form"> 
            <input type="text" name="speaker" placeholder="Speaker"/>
            <input type="text" name="speakerTitle" placeholder="Speaker Title"/>
            <input type="text" name="speakerSpecialTitle" placeholder="Speaker Special Title"/>
            <input type="text" name="speakersCompany" placeholder="Speakers Company"/>
            <input type="file" name="speakerImage" id="test" 
            onChange={(e)=>{props.fileToUpload(e)}}/>
            <button onClick={clickHandler}>Add Speaker</button>
        </form>
        <label>.xlsx file input</label>
        <input type="file" onChange={fileHandler}/>
        {Form.length > 0 ? <FormTable form={Form} setForm={setForm} fileToUpload={(e)=>{props.fileToUpload(e)}}/> : null}
        </>
    )
}
/*
{
    "CompanyName": "Test",
    "CompanyUrl": "Test",
    "ImageID": "Test"
}
*/
/**
 * @param editForm - evoke appendForm
 * @param subForm - get formObject data to Form
 * @param fileToUpload - put file to list of files to upload
 */
const SponsorsForm = (props) => {
    const [Form, setForm] = useState(props.subForm)
    function clickHandler(e){
        e.preventDefault(); //prevents page refresh
        let form = Form;
        form.push({
            CompanyName: e.target.form[0].value,
            CompanyUrl: e.target.form[1].value,
            ImageID: (e.target.form[2].value).match(/[^\\/]*$/)[0]
        })
        document.getElementById("form").reset();
        setForm(form)
        props.editForm("sponsors", Form)
    }
    return(
        <>
        <form autoComplete="off" id="form">
            <input type="text" name="sponsorCompany" placeholder="Company Name"/>
            <input type="text" name="sponsorURL" placeholder="Company URL"/>
            <input type="file" name="sponsorImg" id="test" 
            onChange={(e)=>{props.fileToUpload(e)}}/>
            <button onClick={clickHandler}>Add Sponsor</button>
        </form>
        {Form.length > 0 ? <FormTable form={Form} setForm={setForm} fileToUpload={(e)=>{props.fileToUpload(e)}}/> : null}
        </>
    )
}
/**
 * @param editForm - evoke appendForm
 * @param subForm - get formObject data to Form
 * @param fileToUpload - put file to list of files to upload
 */
const VenueTabForm = (props) => {
    const [Form, setForm] = useState(props.subForm)
    function clickHandler(e){
        e.preventDefault(); //prevents page refresh
        let form = Form;
        form.push({
            title: e.target.form[0].value,
            image: (e.target.form[1].value).match(/[^\\/]*$/)[0]
        })
        document.getElementById("form").reset();
        setForm(form)
        props.editForm("venue", Form)
    }
    return(
        <>
        <form autoComplete="off" id="form">
            <input type="text" name="title" placeholder="Venue Title"/>
            <input type="file" name="venueImg" id="test" 
            onChange={(e)=>{props.fileToUpload(e)}}/>
            <button onClick={clickHandler}>Add Venue</button>
        </form>
        {Form.length > 0 ? <FormTable form={Form} setForm={setForm} fileToUpload={(e)=>{props.fileToUpload(e)}}/> : null}
        </>
    )
}


/*
"mapMarkers":
{
    "restaurant":
    [
        {
            "lat": "",
            "lng": "",
            "name": "",
            "address": "",
            "description": "",
            "category": "",
            "webURL": "",
            "image": ""
        }
    ],
    "hotel":
    [
        {
            "lat": "",
            "lng": "",
            "name": "",
            "address": "",
            "description": "",
            "webURL": "",
            "image": "",
            "rating": ""
        }
    ],
    "other":
    [
        {
            "lat": "",
            "lng": "",
            "name": "",
            "address": "",
            "description": "",
            "webURL": "",
            "image": "",
            "type": ""
        }
    ]
}
*/
const MapMarkerForm = (props) =>{
    const [Form, setForm] = useState(props.subForm)
    const [ActiveForm, setActiveForm] = useState()
    const keys = [
        "Marker Category",
        "Latitude",
        "Longitude",
        "Name",
        "Address",
        "Description",
        "WebURL",
        "(Restaurant) category",
        "(Hotel) rating",
        "(Other) type",
        "Image"
    ]

    function clickHandler(e){
        e.preventDefault(); //prevents page refresh
        let i;
        let marker = {}
        for(i = 0; i < e.target.form.length - 1; i++){
            marker[e.target.form[i].name] = e.target.form[i].value
        }
        Form[ActiveForm].push(marker)
        // console.log(Form[ActiveForm])
        
        // let form = Form;
        
        // //Todo, Form data to json

        document.getElementById("form").reset();
        setForm(Form)
        props.editForm("mapmarkers", Form)
    }
    function dataToForm(data){
        let newForm = {
            restaurant: [],
            hotel: [],
            other: []
        }
        for(let item in data){
            let newObj = {}
            let destination;
            for(let key in data[item]){
                if(key === "markcat"){
                    destination = data[item][key]
                }
                else{
                    console.log(data[item][key], key)
                }
                newObj[key] = data[item][key]
            }
            newForm[destination].push(newObj)
        }
        setForm(newForm)
        props.editForm("mapmarkers", Form)
    }
    let container;
    if(ActiveForm === "restaurant"){
        container = 
        <>
            <input type="text" name="lat" placeholder="Latitude"/>
            <input type="text" name="lng" placeholder="Longitude"/>
            <input type="text" name="name" placeholder="Name"/>
            <input type="text" name="address" placeholder="Address"/>
            <input type="text" name="description" placeholder="Description"/>
            <input type="text" name="category" placeholder="Category"/>
            <input type="text" name="webURL" placeholder="Website URL"/>
            {/*Todo image input*/}
            <button onClick={clickHandler}>Add Restaurant Map Marker</button>
        </>

    }
    else if(ActiveForm === "hotel"){
        container =
        <>
            <input type="text" name="lat" placeholder="Latitude"/>
            <input type="text" name="lng" placeholder="Longitude"/>
            <input type="text" name="name" placeholder="Name"/>
            <input type="text" name="address" placeholder="Address"/>
            <input type="text" name="description" placeholder="Description"/>
            <input type="text" name="rating" placeholder="Rating"/>
            <input type="text" name="webURL" placeholder="Website URL"/>
            <button onClick={clickHandler}>Add Hotel Map Marker</button>
        
        </>

    }
    else if(ActiveForm === "other"){
        container = 
        <>
            <input type="text" name="lat" placeholder="Latitude"/>
            <input type="text" name="lng" placeholder="Longitude"/>
            <input type="text" name="name" placeholder="Name"/>
            <input type="text" name="address" placeholder="Address"/>
            <input type="text" name="description" placeholder="Description"/>
            <input type="text" name="type" placeholder="Type"/>
            <input type="text" name="webURL" placeholder="Website URL"/>
            <button onClick={clickHandler}>Add Other Map Marker</button>
        
        </>

    }
    else{
        container = null;
    }
    return(
        <>
        <Dropdown>
        <Dropdown.Toggle>
            Marker Categories
        </Dropdown.Toggle>
        <Dropdown.Menu>
            <Dropdown.Item href="#" onClick={(e)=>{setActiveForm(e.target.name)}} name="restaurant">Restaurant</Dropdown.Item>
            <Dropdown.Item href="#" onClick={(e)=>{setActiveForm(e.target.name)}} name="hotel">Hotel</Dropdown.Item>
            <Dropdown.Item href="#" onClick={(e)=>{setActiveForm(e.target.name)}} name="other">Other</Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
        <form id="form" autoComplete="off">
            {container}
        </form>
        {Form.restaurant.length > 0 || Form.hotel.length > 0 || Form.other.length > 0 ? 
            <FormTable 
                form={Form} 
                setForm={(data)=>{dataToForm(data)}} 
                keys={keys}
                mapMarkers={true}
                fileToUpload={(e)=>{props.fileToUpload(e)}}
            /> : 
        null}
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