import React, {useState} from 'react'
//import FormTable from '../components/FormTable'
import SponsorCard from '../components/SponsorCard'
import AddButton from '../components/AddButton'
import SortButton from '../components/SortButton'
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
        form.unshift({
            CompanyName: e.target.form[0].value,
            CompanyUrl: e.target.form[1].value,
            ImageID: (e.target.form[2].value).match(/[^\\/]*$/)[0]
        })
        document.getElementById("form").reset();
        setForm(form)
        props.editForm("sponsors", Form)
    }
    function clickEmpty(e){
        e.preventDefault();
        let form = Form;
        form.unshift({
            CompanyName: "",
            CompanyUrl: "",
            ImageID: ""
        })
        document.getElementById("form").reset();
        setForm(form)
        props.editForm("sponsors", Form)
    }
    let dataContainer;
    function cardHandler(e){
        setForm(e)
        props.editForm("sponsors", e)
    }

    function sortSponsors (list) {
        let unsortedList = list;
        let sortedList = unsortedList.sort((a, b) => 
        (a.CompanyName < b.CompanyName)
        ? 1 :
        (a.CompanyName === b.CompanyName)
        ?
        ((a.Speaker < b.CompanyName) ? 1 : -1) : -1)
        sortedList.reverse();
        setForm(sortedList);
        props.editForm("sponsors", sortedList)
        console.log(sortedList);
    }

    dataContainer = Form.slice(0).map((item, index)=>{
        return(
        <SponsorCard 
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
            <input style={{display: 'none'}} type="text" name="sponsorCompany" placeholder="Company Name"/>
            <input style={{display: 'none'}} type="text" name="sponsorURL" placeholder="Company URL"/>
            <input style={{display: 'none'}} type="file" name="sponsorImg" id="test" 
            onChange={(e)=>{props.fileToUpload(e)}}/>
            <button style={{display: 'none'}} onClick={clickHandler}>Add Sponsor</button>
            <AddButton onClick={clickEmpty}/>
        </form>
        <SortButton content="Sort" onClick={() => {sortSponsors(Form)}}></SortButton>
        {dataContainer}
        {/* {Form.length > 0 ? <FormTable form={Form} setForm={setForm} fileToUpload={(e)=>{props.fileToUpload(e)}}/> : null} */}
        </>
    )
}

export default SponsorsForm