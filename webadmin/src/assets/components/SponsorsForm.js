import React, {useState} from 'react'
import FormTable from '../components/FormTable'

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

export default SponsorsForm