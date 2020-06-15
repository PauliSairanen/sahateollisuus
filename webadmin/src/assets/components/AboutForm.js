import React, {useState, useEffect} from 'react'

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

export default AboutForm