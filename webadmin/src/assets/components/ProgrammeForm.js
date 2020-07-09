import React, {useState, useEffect} from 'react'
//import FormTable from '../components/FormTable'
import xlsxToJson from '../components/XlsxConverter'

import ProgrammeCard from '../components/ProgrammeCard'
import AddButton from '../components/AddButton'
//import DeleteButton from '../components/DeleteButton'
import { ButtonGroup, Button, Col, Row, Card, OverlayTrigger, Tooltip} from 'react-bootstrap' // eslint-disable-line
//import { colors } from '@material-ui/core'
//import BsForm from 'react-bootstrap/Form'
/*Esim
[
    {
        "day": "Day 0",
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
    },
    {
        "day": "Day 1",
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
]
Todo make function to convert ^^^ to vvv
[
    {day: "Day 0", jne},
    {day: "Day 0", jne},
    {day: "Day 0", jne},
    {day: "Day 1", jne},
    {day: "Day 1, jne},
    {day: "Day 2", jne},
]
*/
/**
 * @param editForm - evoke appendForm
 * @param subForm - get formObject data to Form
 * @param fileToUpload - put file to list of files to upload
 */
const ProgrammeForm = (props) => {
    const [Form, setForm] = useState(props.subForm)
    const [Data, setData] = useState(FormToData(Form))
    const [ActiveDay, setActiveDay] = useState("1") // eslint-disable-line
    useEffect(() => {
        props.editForm("programme", Form)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Form])

    // const keys = 
    // [
    //     "Day",
    //     "Time",
    //     "Location",
    //     "Description",
    //     "Name of Speaker",
    //     "Title of Speaker",
    //     "Special Title of Speaker",
    //     "Company",
    //     "Pdf"
    // ]
    function dataToForm(data){
        let form = [];
        for(let key in data){
            let i;
            let found = false;
            for(i = 0; i < form.length; i++){
                if('day' in form[i]){
                    if(form[i].day === 'Day '+data[key].day){
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
                        CompanyOfSpeaker: data[key].CompanyOfSpeaker,
                        Pdf: data[key].Pdf
                    }
                )
            }
            else{
                form.push(
                    {
                        day: 'Day '+data[key].day,
                        content: [
                            {
                                Time: data[key].Time,
                                Location: data[key].Location,
                                Description: data[key].Description,
                                NameOfSpeaker: data[key].NameOfSpeaker,
                                TitleOfSpeaker: data[key].TitleOfSpeaker,
                                SpecialTitleOfSpeaker: data[key].SpecialTitleOfSpeaker,
                                CompanyOfSpeaker: data[key].CompanyOfSpeaker,
                                Pdf: data[key].Pdf
                            }
                        ]
                    }
                )
            }
        }
        let fix = false
        for(let i in data){
            if(ActiveDay === data[i].day){
                fix = false;
                break;
            }
            fix = true;
        }
        if(fix){
            setActiveDay("1")
        }
        setForm(form)
        setData(FormToData(form))

        //props.editForm("programme", Form)
    }
    function FormToData(form){
        let newForm = []
        for(let i in form){
            let day = form[i].day
            day = day.replace("Day ", "")
            let content = form[i].content

            for(let j in content){
                newForm.push(
                {
                    day: day,
                    Time: content[j].Time,
                    Location: content[j].Location,
                    Description: content[j].Description,
                    NameOfSpeaker: content[j].NameOfSpeaker,
                    TitleOfSpeaker: content[j].TitleOfSpeaker,
                    SpecialTitleOfSpeaker: content[j].SpecialTitleOfSpeaker,
                    CompanyOfSpeaker: content[j].CompanyOfSpeaker,
                    Pdf: content[j].Pdf
                })
            }
        }
        //console.log(form, newForm)
        return newForm
    }
    function clickEmpty(e, day){ // eslint-disable-line
        e.preventDefault();
        let form = Form
        let i;
        let found = false;
        for(i = 0; i < form.length; i++){
            if('day' in form[i]){
                if(form[i].day === "Day "+day){
                    found = true;
                    break;
                }
            }
        }
        if(found){
            form[i].content.push(
                {
                    Time: "",
                    Location: "",
                    Description: "",
                    NameOfSpeaker: "",
                    TitleOfSpeaker: "",
                    SpecialTitleOfSpeaker: "",
                    CompanyOfSpeaker: "",
                    Pdf: ""
                }
            )
        }
        else{
            form.push(
                {
                    day: "Day "+day,
                    content: [
                        {
                            Time: "",
                            Location: "",
                            Description: "",
                            NameOfSpeaker: "",
                            TitleOfSpeaker: "",
                            SpecialTitleOfSpeaker: "",
                            CompanyOfSpeaker: "",
                            Pdf: ""
                        }
                    ]
                }
            )
        }
        //document.getElementById("form").reset();
        setForm(form)
        props.editForm("programme", form)
        setData(FormToData(form))
    }
    function clickHandler(e){
        e.preventDefault(); //prevents page refresh
        let form = Form;
        
        let i;
        let found = false;
        for(i = 0; i < form.length; i++){
            if('day' in form[i]){
                if(form[i].day === "Day "+e.target.form[0].value){
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
                    CompanyOfSpeaker: e.target.form[7].value,
                    Pdf: (e.target.form[8].value).match(/[^\\/]*$/)[0]
                }
            )
        }
        else{
            form.push(
                {
                    day: "Day "+e.target.form[0].value,
                    content: [
                        {
                            Time: e.target.form[1].value,
                            Location: e.target.form[2].value,
                            Description: e.target.form[3].value,
                            NameOfSpeaker: e.target.form[4].value,
                            TitleOfSpeaker: e.target.form[5].value,
                            SpecialTitleOfSpeaker: e.target.form[6].value,
                            CompanyOfSpeaker: e.target.form[7].value,
                            Pdf: (e.target.form[8].value).match(/[^\\/]*$/)[0]
                        }
                    ]
                }
            )
        }
        document.getElementById("form").reset();
        setForm(form)
        props.editForm("programme", form)
        setData(FormToData(form))
    }

    async function fileHandler(e){
        let jsonData = await xlsxToJson(e.target)
        //console.log(jsonData)
        let list = []
        for(let i in jsonData){
            if(i > 0){       
                list.push(
                    {
                        day: jsonData[i][0],
                        Time: jsonData[i][1],
                        Location: jsonData[i][2],
                        Description: jsonData[i][3],
                        NameOfSpeaker: jsonData[i][4],
                        TitleOfSpeaker: jsonData[i][5],
                        SpecialTitleOfSpeaker: jsonData[i][6],
                        CompanyOfSpeaker: jsonData[i][7],
                        Pdf: jsonData[i][8],
                    }
                )
            }   
        }
        dataToForm(list)
        document.getElementById("fileform").reset();
    }
    // https://imgur.com/a/XiuemMT
    function getHighestDay(){
        let data = Data;
        let day = 0;
        for(let i in data){
            if(data[i].day > day){
                day = parseInt(data[i].day);
            }
        }
        return day;
    }
    function dayHandler(e){
        if(e.target.name === "plus"){
            clickEmpty(e, getHighestDay()+1)
        }
        else if(e.target.name === "minus"){
            let data = Data;
            let highest = getHighestDay();
            let loop = true;
            while(loop){
                loop = false
                for(let i in data){
                    if(parseInt(data[i].day) === highest){
                        data.splice(i,1)
                        loop = true
                        break;
                    }
                }
            }
            dataToForm(data)
        }
        else if(e.target.name === "day"){
            setActiveDay(e.target.id)
        }
        else{
            clickEmpty(e, ActiveDay)
        }
    }
    let dayButtons = [];
    let takenDays = [];
    dayButtons = Data.map((item, index)=>{
        //console.log(index, item)
        
        if(!takenDays.includes(item.day)){
            takenDays.push(item.day)
            return(<Button key={index} name="day" id={item.day} onClick={dayHandler} className={ActiveDay === item.day ? "active" : "inactive"} disabled={ActiveDay === item.day ? true : false}>Day {item.day}</Button>)
        }
        else{
            return null
        }
    })

    let dataContainer;
    dataContainer = Data.slice(0).reverse().map((item, index)=>{
        //console.log(item.day, ActiveDay)
        if(Form.length > 0){
            if(item.day === ActiveDay || ActiveDay == null){
                return(<ProgrammeCard key={index} index={index} form={item} data={Data} editForm={(data) => dataToForm(data)} fileToUpload={(e)=>props.fileToUpload(e)}/>)
            }
            else{
                return(null)
            }
        }
        else{
            return null
        }
    })
    
    return(
        <>
        <form id="fileform" style={{display:'flex',justifyContent:'center',alignContent:'center'}}>
            <label htmlFor="hidden-input" className="labelForHidden">Choose Excel File</label>
            <input id="hidden-input" type="file" className="hidden" onChange={fileHandler}/>
        </form>
        <div style={{display:'flex',justifyContent:'center',alignContent:'center'}}>
            <a href='/Excel/Programme.xlsx' download>Click to download base Excel Form</a>
        </div>        
        <form autoComplete="off" id="form" style={{display:'none'}}>
            <label >Day:</label>
            <input type="number" name="Date" min="0" defaultValue="1"/>
            <input type="text" name="time" placeholder="Time"/>
            <input type="text" name="location" placeholder="Event Location"/>
            {/* <input type="text" name="description" placeholder="Event Description"/> */}
            <textarea name="description" placeholder="Event Description"/>
            <input  type="text" name="speakerName" placeholder="Speaker Name"/>
            <input  type="text" name="speakerTitle" placeholder="Speaker Title"/>
            <input  type="text" name="speakerSpecialTitle" placeholder="Speaker Special Title"/>
            <input  type="text" name="speakerCompany" placeholder="Speaker Company"/>
            <input  type="file" name="test" id="test" 
            onChange={(e)=>{props.fileToUpload(e)}}/>
            <button onClick={clickHandler}>Add Programme</button>
            {/* <Button onClick={clickEmpty} style={
                {
                    height: '50px',
                    width: '50px',
                    backgroundColor: "#32CD32"
                }}><span className="deleteButtonText">+</span></Button> */}
        </form>
        {/* <Card style={{width:"300px", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
            <BsForm style={{width:'50%'}}>
                <BsForm.Group>
                    <BsForm.Label>Day</BsForm.Label>
                    <BsForm.Control type="number" name="Date" min="0" defaultValue="1" id="Date"/>
                    <AddButton onClick={clickEmpty} style={{display: 'flex', justifyContent: 'center', alignItems:'center'}}/>
                </BsForm.Group>
            </BsForm>
        </Card> */}
        {/* style={{width:'300px', display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'flex-end'}} */}
        <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
            <div>
                <ButtonGroup className="navbarButtons">
                    {dayButtons}
                </ButtonGroup>
                {/* <Button>Day 1</Button>
                <Button>Day 2</Button>
                <Button>Day 3</Button> */}
            </div>
            <div>
                <ButtonGroup vertical style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                    <Button className="dayAddButton" name="plus" onClick={dayHandler} disabled={dayButtons.length >= 5 ? true : false}>+</Button>
                    <OverlayTrigger
                        placement="bottom"
                        delay={{show: 250, hide: 250}}
                        overlay={<Tooltip>WARNING! Pressing this deletes the most recent day and all its contents!</Tooltip>}
                        >
                    <Button className="dayDeleteButton" name="minus" onClick={dayHandler}>-</Button>
                    </OverlayTrigger>
                </ButtonGroup>
                {/* <Button name="test" onClick={dayHandler}>test</Button> */}
            </div>
        </div>
        <div>
            {Form.length > 0 ? <AddButton onClick={dayHandler}/> : null}
            
        </div>
        {/* <ProgrammeCard/> */}
        <div style={{marginTop: '20px', display: 'flex', justifyContent:'center', alignItems:'center'}}>
            
        </div>
        {Data.length > 0 ? dataContainer : null}
        {/* {Form.length > 0 ? 
            <FormTable 
                form={FormToData(Form)} 
                setForm={(data) => dataToForm(data)} 
                fileToUpload={(e)=>{props.fileToUpload(e)}}
            /> : 
        null} */}
        
        </>
    )
}

export default ProgrammeForm