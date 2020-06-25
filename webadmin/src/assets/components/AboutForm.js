import React, {useState} from 'react'
import Card from 'react-bootstrap/Card'
import BsForm from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import AboutCard from '../components/AboutCard'
/**
 * @param editForm - evoke changehandler
 * @param appendForm - evoke appendForm
 * @param bodytexts - bodytexts from formobjects
 * @param disclaimers - disclaimers from formobjects
 * @param FO - formobjects
 * @param fileToUpload - evoke fileToUpload
 */
const AboutForm = (props) => {
    const [Form, setForm] = useState(props.bodyTexts ? props.bodyTexts : [])
    const [Form2, setForm2] = useState(props.disclaimers ? props.disclaimers : [])
    const [Fields, setFields] = useState(createFields)
    const [Fields2, setFields2] = useState(createFields2)

    //renders bodytexts
    function createFields(){
        if(Form){
            let list = Form.map((items,index)=>{
                return (
                <div key={index} id={'ta'+index}>
                    <BsForm.Control as="textarea" rows="3" defaultValue={items} name={index} onChange={changeHandler}/>
                    {/* <textarea defaultValue={items} name={index} onChange={changeHandler}/> */}
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
    // function remHandler(e){
        
    // }
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
                    <BsForm.Control as="textarea" rows="3" defaultValue={items} name={index} onChange={changeHandler2}/>
                    {/* <textarea defaultValue={items} name={index} onChange={changeHandler2}/> */}
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
    // function remHandler2(e){
        
    // }
    function clickHandler2(e){
        let temp = Form2;
        temp.push("")
        setFields2(createFields2)
    }
    return(
        // <div>
        // <form onChange={props.editForm} autoComplete="off" id="abtform">
        //     <input type="text" name="eventPass" placeholder="Event Password" defaultValue={props.FO.eventPass}/>
        //     <input type="text" name="eventName" placeholder="Event Name" defaultValue={props.FO.eventName}/>
        //     <input type="text" name="visibility" placeholder="Event Status(visible/hidden)" defaultValue={props.FO.visibility}/>
        //     <input type="text" name="eventWebUrl" placeholder="Event URL" defaultValue={props.FO.eventWebUrl}/>
        //     <input type="text" name="placeName" placeholder="Place Name" defaultValue={props.FO.placeName}/>
        //     <input type="text" name="placeAddress" placeholder="Place Address" defaultValue={props.FO.placeAddress}/>
        //     <input type="text" name="placePhone" placeholder="Place Phone" defaultValue={props.FO.placePhone}/>
        //     <input type="text" name="placeEmail" placeholder="Place Email" defaultValue={props.FO.placeEmail}/>
        //     <input type="text" name="eventTitle" placeholder="Event Title" defaultValue={props.FO.eventTitle}/>
        //     <input type="text" name="MiWebsite" placeholder="More info Website" defaultValue={props.FO.MiWebsite}/>
        //     <input type="text" name="MiOrg" placeholder="More info Organizer" defaultValue={props.FO.MiOrg}/>
        //     <input type="text" name="MiEmail" placeholder="More info Email" defaultValue={props.FO.MiEmail}/>
        //     <label>Event Image</label>
        //     <input type="file" id="test" name="test" onChange={(e)=>{
        //         //props.appendForm("eventImage", `https://sahat.lamk.fi/images/metadataImages/${e.target.files[0].name}`)
        //         props.fileToUpload(e)
        //     }}/>
        // </form>
        // {Fields}
        // <button onClick={clickHandler}>Add BodyText</button>
        // {Fields2}
        // <button onClick={clickHandler2}>Add Disclaimer</button>
        // </div>

        // <Card>
        //     <BsForm onChange={props.editForm} style={{padding: '30px'}}>
        //         <BsForm.Row>
        //             <BsForm.Group as={Col}>
        //                 <BsForm.Label>Event Password</BsForm.Label>
        //                 <BsForm.Control type="text" name="eventPass" defaultValue={props.FO.eventPass} />
        //             </BsForm.Group>
        //             <BsForm.Group as={Col}>
        //                 <BsForm.Label>Event Name</BsForm.Label>
        //                 <BsForm.Control type="text" name="eventName" defaultValue={props.FO.eventName} />
        //             </BsForm.Group>
        //             <BsForm.Group as={Col}>
        //                 <BsForm.Label>Place Title</BsForm.Label>
        //                 <BsForm.Control type="text" name="eventTitle" defaultValue={props.FO.eventTitle} />
        //             </BsForm.Group>
        //             <BsForm.Group as={Col}>
        //                 {/* <BsForm.Label>Event visibility(visible/hidden)</BsForm.Label>
        //                 <BsForm.Control type="text" name="visibility" defaultValue={props.FO.visibility} /> */}
        //                 <BsForm.Label>Event visiblity</BsForm.Label>
        //                 <BsForm.Check type={'radio'} name="visibility" label={'visible'} value="visible" defaultChecked={props.FO.visibility == "visible" ? true : false}/> {/*eslint-disable-line*/}
        //                 <BsForm.Check type={'radio'} name="visibility" label={'hidden'} value="hidden" defaultChecked={props.FO.visibility == "hidden" ? true : false}/> {/*eslint-disable-line*/}
        //             </BsForm.Group>
        //             <BsForm.Group as={Col}>
        //                 <BsForm.Label>Event WebURL</BsForm.Label>
        //                 <BsForm.Control type="text" name="eventWebUrl" defaultValue={props.FO.eventWebUrl} />
        //             </BsForm.Group>
        //             <BsForm.Group as={Col}>
        //                 <BsForm.Label>Event Image</BsForm.Label>
        //                 <BsForm.Control type="file" id="test" name="eventImage" onChange={(e)=>{
        //                     //props.appendForm("eventImage", `https://sahat.lamk.fi/images/metadataImages/${e.target.files[0].name}`)
        //                     props.fileToUpload(e)
        //                 }} />
        //                 <BsForm.Label>{props.FO.eventImage ? "Selected image: "+ props.FO.eventImage : null}</BsForm.Label>

        //             </BsForm.Group>
        //         </BsForm.Row>


        //         <BsForm.Row>
        //             <BsForm.Group as={Col}>
        //                 <BsForm.Label>Place Name</BsForm.Label>
        //                 <BsForm.Control type="text" name="placeName" defaultValue={props.FO.placeName} />
        //             </BsForm.Group>
        //             <BsForm.Group as={Col}>
        //                 <BsForm.Label>Place Address</BsForm.Label>
        //                 <BsForm.Control type="text" name="placeAddress" defaultValue={props.FO.placeAddress} />
        //             </BsForm.Group>
        //             <BsForm.Group as={Col}>
        //                 <BsForm.Label>Place Phone</BsForm.Label>
        //                 <BsForm.Control type="text" name="placePhone" defaultValue={props.FO.placePhone} />
        //             </BsForm.Group>
        //             <BsForm.Group as={Col}>
        //                 <BsForm.Label>Place Email</BsForm.Label>
        //                 <BsForm.Control type="text" name="placeEmail" defaultValue={props.FO.placeEmail} />
        //             </BsForm.Group>
        //         </BsForm.Row>
        //         <BsForm.Row>
        //             <BsForm.Group as={Col}>
        //                 <BsForm.Label>More Info Website</BsForm.Label>
        //                 <BsForm.Control type="text" name="MiWebsite" defaultValue={props.FO.MiWebsite} />
        //             </BsForm.Group>
        //             <BsForm.Group as={Col}>
        //                 <BsForm.Label>More Info Organizer</BsForm.Label>
        //                 <BsForm.Control type="text" name="MiOrg" defaultValue={props.FO.MiOrg} />
        //             </BsForm.Group>
        //             <BsForm.Group as={Col}>
        //                 <BsForm.Label>More Info Email</BsForm.Label>
        //                 <BsForm.Control type="text" name="MiEmail" defaultValue={props.FO.MiEmail} />
        //             </BsForm.Group>
        //         </BsForm.Row>

        //         <BsForm.Row>
        //             <BsForm.Group as={Col}>
        //                 <BsForm.Label>BodyText</BsForm.Label>
        //                 {Fields}
        //                 <Button onClick={clickHandler}>Add Bodytext</Button>
        //             </BsForm.Group>

        //             <BsForm.Group as={Col}>
        //                 <BsForm.Label>Disclaimer</BsForm.Label>
        //                 {Fields2}
        //                 <Button onClick={clickHandler2}>Add Disclaimer</Button>
        //             </BsForm.Group>
        //         </BsForm.Row>
        //     </BsForm>
        // </Card>

        <AboutCard onChange={(e)=>{props.editForm(e)}} form={props.FO}/>
    )
}

export default AboutForm