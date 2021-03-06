import React, {useState} from 'react'
//import FormTable from '../components/FormTable'
import xlsxToJson from '../components/XlsxConverter'
import SpeakerCard from '../components/SpeakerCard'
//import Card from 'react-bootstrap/Card'
import AddButton from '../components/AddButton'
import SortButton from '../components/SortButton'
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
    function clickHandler(e){ //deprecated
        e.preventDefault(); //prevents page refresh
        let form = Form;
        form.unshift({
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
    function clickEmpty(e){
        e.preventDefault(); //prevents page refresh
        let form = Form;
        form.unshift({
            Speaker: "",
            Title: "",
            SpecialTitle: "",
            Company: "",
            ImageID: "",
            Description: ""
        })
        setForm(form)
        props.editForm("speakers", Form)
    }
    async function fileHandler(e){
        let jsonData = await xlsxToJson(e.target)
        let form = []
        for(let i in jsonData){
            //console.log(jsonData[i])
            if(i > 0){
                form.push(
                    {
                        Speaker: jsonData[i][0],
                        Title: jsonData[i][1],
                        SpecialTitle: jsonData[i][2],
                        Company: jsonData[i][3],
                        ImageID: jsonData[i][4],
                        Description: jsonData[i][5],
                    }
                )
            }
        }
        setForm(form)
        props.editForm("speakers", Form)
        document.getElementById("fileform").reset();
    }
    let dataContainer;
    function cardHandler(e){
        setForm(e)
        props.editForm("speakers", e)
    }

    function sortSpeakers (list) {
        let unsortedList = list;
        let sortedList = unsortedList.sort((a, b) => 
        ((a.Speaker.split(' '))[1] < (b.Speaker.split(' '))[1])
        ? 1 :
        ((a.Speaker.split(' '))[1] === (b.Speaker.split(' '))[1])
        ?
        (((a.Speaker.split(' '))[0] < (b.Speaker.split(' '))[0]) ? 1 : -1) : -1)
        sortedList.reverse();
        setForm(sortedList);
        props.editForm("speakers", sortedList)
        console.log(sortedList);
    }

    dataContainer = Form.slice(0).map((item, index)=>{
        return(
        <SpeakerCard 
            key={index} 
            index={index} 
            form={item} 
            data={Form} 
            editForm={cardHandler}
            ID={props.EditID}  
            fileToUpload={(e)=>props.fileToUpload(e)}
        />)
    })
    return(
        <>
        <div style={{height:'48px',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
        <div id="fileform" style={{display:'flex', flex:'1', justifyContent:'flex-end',alignContent:'center'}}>
            <label htmlFor="hidden-input" className="excelButton">Choose Excel File</label>
            <input id="hidden-input" type="file" className="hidden" onChange={fileHandler}/>
        </div>
        <div style={{display:'flex',flex:'1',justifyContent:'flex-start',alignContent:'center'}}>
            <a className="excelButton" href='/Excel/Speakers.xlsx' download>Download Excel Template</a>
        </div>
        </div>
        <form autoComplete="off" id="form"> 
            <input style={{display: 'none'}} type="text" name="speaker" placeholder="Speaker"/>
            <input style={{display: 'none'}} type="text" name="speakerTitle" placeholder="Speaker Title"/>
            <input style={{display: 'none'}} type="text" name="speakerSpecialTitle" placeholder="Speaker Special Title"/>
            <input style={{display: 'none'}} type="text" name="speakersCompany" placeholder="Speakers Company"/>
            <input style={{display: 'none'}} type="file" name="speakerImage" id="test" 
            onChange={(e)=>{props.fileToUpload(e)}}/>
            <button style={{display: 'none'}} onClick={clickHandler}>Add Speaker</button>
            <AddButton onClick={clickEmpty}/>
        </form>
        <SortButton content="Sort" onClick={() => {sortSpeakers(Form)}}></SortButton>
        {dataContainer}
        {/* {Form.length > 0 ? <FormTable form={Form} setForm={setForm} fileToUpload={(e)=>{props.fileToUpload(e)}}/> : null} */}
        </>
    )
}
export default SpeakersForm