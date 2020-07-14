import React, {useState} from 'react'
//import FormTable from '../components/FormTable'
import VenueCard from '../components/VenueCard'
import AddButton from '../components/AddButton'
import SortButton from '../components/SortButton'
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

    function sortVenue (list) {
        let unsortedList = list;
        console.log(unsortedList);
        let sortedList = unsortedList.sort((a, b) => 
        (a.title < b.title)
        ? 1 :
        (a.title === b.title)
        ?
        ((a.title < b.title) ? 1 : -1) : -1)
        setForm(sortedList);
        props.editForm("venue", sortedList)
        console.log(sortedList);
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
        <SortButton content="Sort" onClick={() => {sortVenue(Form)}}></SortButton>
        {dataContainer}
        {/* {Form.length > 0 ? <FormTable form={Form} setForm={setForm} fileToUpload={(e)=>{props.fileToUpload(e)}}/> : null} */}
        </>
    )
}

export default VenueTabForm