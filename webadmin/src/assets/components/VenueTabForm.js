import React, {useState, useEffect} from 'react'
import FormTable from '../components/FormTable'
import VenueCard from '../components/VenueCard'
import AddButton from '../components/AddButton'
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
    function clickEmpty(e){
        e.preventDefault(); //prevents page refresh
        let form = Form;
        form.push({
            title: "",
            image: ""
        })
        document.getElementById("form").reset();
        setForm(form)
        props.editForm("venue", Form)
    }
    let dataContainer;
    function cardHandler(e){
        setForm(e)
        props.editForm("venue", e)
    }
    dataContainer = Form.slice(0).reverse().map((item, index)=>{
        return(
        <VenueCard 
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
        <form autoComplete="off" id="form">
            <input style={{display: 'none'}} type="text" name="title" placeholder="Venue Title"/>
            <input style={{display: 'none'}} type="file" name="venueImg" id="test" 
            onChange={(e)=>{props.fileToUpload(e)}}/>
            <button style={{display: 'none'}} onClick={clickHandler}>Add Venue</button>
            <AddButton onClick={clickEmpty}/>
        </form>
        {dataContainer}
        {Form.length > 0 ? <FormTable form={Form} setForm={setForm} fileToUpload={(e)=>{props.fileToUpload(e)}}/> : null}
        </>
    )
}

export default VenueTabForm