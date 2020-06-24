import React, {useState} from 'react'
import FormTable from '../components/FormTable'
import xlsxToJson from '../components/XlsxConverter'
import SpeakerCard from '../components/SpeakerCard'
import Card from 'react-bootstrap/Card'
import AddButton from '../components/AddButton'
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
    function clickEmpty(e){
        e.preventDefault(); //prevents page refresh
        let form = Form;
        form.push({
            Speaker: "",
            Title: "",
            SpecialTitle: "",
            Company: "",
            ImageID: ""
        })
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
    let dataContainer;
    dataContainer = Form.slice(0).reverse().map((item, index)=>{
        return(
        <SpeakerCard 
            key={index} 
            index={index} 
            form={item} 
            data={Form} 
            editForm={setForm}
            ID={props.EditID}  
            fileToUpload={(e)=>props.fileToUpload(e)}
        />)
    })
    return(
        <>
        <Card>
            <label>.xlsx file input</label>
            <input type="file" onChange={fileHandler}/>
        </Card>
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
        {dataContainer}
        {Form.length > 0 ? <FormTable form={Form} setForm={setForm} fileToUpload={(e)=>{props.fileToUpload(e)}}/> : null}
        </>
    )
}
export default SpeakersForm