import React, {useState, useEffect} from 'react'
import FormTable from '../components/FormTable'
import xlsxToJson from '../components/XlsxConverter'

import ProgrammeCard from '../components/ProgrammeCard'
import { ButtonGroup, Button, Col } from 'react-bootstrap'
/*Esim
[
    {
        "day": "Päivä 0",
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
]
Todo make function to convert ^^^ to vvv
[
    {day: "Päivä 0", jne},
    {day: "Päivä 0", jne},
    {day: "Päivä 0", jne},
    {day: "Päivä 1", jne},
    {day: "Päivä 1, jne},
    {day: "Päivä 2", jne},
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
                    if(form[i].day === 'Päivä '+data[key].day){
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
                        day: 'Päivä '+data[key].day,
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
            day = day.replace("Päivä ", "")
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
        setData(FormToData(form))
    }

    async function fileHandler(e){
        let jsonData = await xlsxToJson(e.target)
        console.log(jsonData)
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
            buttons.push(<Button key={i} name={Form[i].day.replace("Päivä ", "")} onClick={dayHandler}>{Form[i].day}</Button>)
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
        {/* <ProgrammeCard/> */}
        {dayButtons}
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