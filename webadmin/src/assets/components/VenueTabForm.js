import React, {useState} from 'react'
import FormTable from '../components/FormTable'
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

export default VenueTabForm