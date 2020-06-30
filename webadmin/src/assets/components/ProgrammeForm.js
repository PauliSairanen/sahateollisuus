import React, {useState, useEffect} from 'react'
import FormTable from '../components/FormTable'
import xlsxToJson from '../components/XlsxConverter'

import ProgrammeCard from '../components/ProgrammeCard'
import AddButton from '../components/AddButton'
import { ButtonGroup, Button, Col, Card } from 'react-bootstrap'
import BsForm from 'react-bootstrap/Form'
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
    const [ActiveDay, setActiveDay] = useState(null)
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
                        Company: data[key].Company,
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
                                Company: data[key].Company,
                                Pdf: data[key].Pdf
                            }
                        ]
                    }
                )
            }
            
            
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
                    Company: content[j].Company,
                    Pdf: content[j].Pdf
                })
            }
        }
        //console.log(newForm)
        return newForm
    }
    function clickEmpty(e){
        e.preventDefault();
        let form = Form
        let i;
        let found = false;
        for(i = 0; i < form.length; i++){
            if('day' in form[i]){
                if(form[i].day === "Day "+document.getElementById("Date").value){
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
                    Company: "",
                    Pdf: ""
                }
            )
        }
        else{
            form.push(
                {
                    day: "Day "+document.getElementById("Date").value,
                    content: [
                        {
                            Time: "",
                            Location: "",
                            Description: "",
                            NameOfSpeaker: "",
                            TitleOfSpeaker: "",
                            SpecialTitleOfSpeaker: "",
                            Company: "",
                            Pdf: ""
                        }
                    ]
                }
            )
        }
        //document.getElementById("form").reset();
        setForm(form)
        props.editForm("programme", Form)
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
                    Company: e.target.form[7].value,
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
                        Company: jsonData[i][7],
                        Pdf: jsonData[i][8],
                    }
                )
            }   
        }
        dataToForm(list)
    }

    let dayButtons;

    function dayHandler(e){
        setActiveDay(e.target.name)
    }
    if(Form.length > 1){
        let i;
        let buttons = []
        for(i = 0; i < Form.length; i++){
            buttons.push(<Button key={i} name={Form[i].day.replace("Day ", "")} onClick={dayHandler}>{Form[i].day}</Button>)
        }
        dayButtons = 
        <Col className="cols" style={{display: 'flex', justifyContent: 'center'}}>
            <ButtonGroup style={{display: 'flex', flexWrap: 'wrap'}}>
                {buttons}
            </ButtonGroup>
        </Col>
    }
    else{

    }

    let dataContainer;
    dataContainer = Data.slice(0).reverse().map((item, index)=>{
        if(Form.length > 1){
            if(item.day === ActiveDay){
                return(<ProgrammeCard key={index} index={index} form={item} data={Data} editForm={(data) => dataToForm(data)} fileToUpload={(e)=>props.fileToUpload(e)}/>)
            }
            else{
                return(null)
            }
        }
        else{
            return(<ProgrammeCard key={index} index={index} form={item} data={Data} editForm={(data) => dataToForm(data)} fileToUpload={(e)=>props.fileToUpload(e)}/>)
        }
    })
    
    return(
        <>
        <Card>
            <label>.xlsx file input</label>
            <input type="file" onChange={fileHandler}/>
        </Card>
        <form autoComplete="off" id="form" >
            <label style={{display: 'none'}}>Day:</label>
            <input style={{display: 'none'}} type="number" name="Date" min="0" defaultValue="0"/>
            <input style={{display: 'none'}} type="text" name="time" placeholder="Time"/>
            <input style={{display: 'none'}} type="text" name="location" placeholder="Event Location"/>
            {/* <input type="text" name="description" placeholder="Event Description"/> */}
            <textarea style={{display: 'none'}} name="description" placeholder="Event Description"/>
            <input style={{display: 'none'}} type="text" name="speakerName" placeholder="Speaker Name"/>
            <input style={{display: 'none'}} type="text" name="speakerTitle" placeholder="Speaker Title"/>
            <input style={{display: 'none'}} type="text" name="speakerSpecialTitle" placeholder="Speaker Special Title"/>
            <input style={{display: 'none'}} type="text" name="speakerCompany" placeholder="Speaker Company"/>
            <input style={{display: 'none'}} type="file" name="test" id="test" 
            onChange={(e)=>{props.fileToUpload(e)}}/>
            <button style={{display: 'none'}} onClick={clickHandler}>Add Programme</button>
            {/* <Button onClick={clickEmpty} style={
                {
                    height: '50px',
                    width: '50px',
                    backgroundColor: "#32CD32"
                }}><span className="deleteButtonText">+</span></Button> */}
        </form>
        <Card style={{width:"300px", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
            <BsForm style={{width:'50%'}}>
                <BsForm.Group>
                    <BsForm.Label>Day</BsForm.Label>
                    <BsForm.Control type="number" name="Date" min="0" defaultValue="0" id="Date"/>
                    <AddButton onClick={clickEmpty} style={{display: 'flex', justifyContent: 'center', alignItems:'center'}}/>
                </BsForm.Group>
            </BsForm>
        </Card>
        
        {/* <ProgrammeCard/> */}
        <div style={{marginTop: '20px', display: 'flex', justifyContent:'center', alignItems:'center'}}>
            {dayButtons}
        </div>
        {Data.length > 0 ? dataContainer : null}
        {Form.length > 0 ? 
            <FormTable 
                form={FormToData(Form)} 
                setForm={(data) => dataToForm(data)} 
                fileToUpload={(e)=>{props.fileToUpload(e)}}
            /> : 
        null}
        
        </>
    )
}

export default ProgrammeForm