import React, {useState, useEffect} from 'react'
//import FormTable from '../components/FormTable'
import xlsxToJson from '../components/XlsxConverter'
//import Card from 'react-bootstrap/Card'
import AddButton from '../components/AddButton'
import ParticipantsCard from '../components/ParticipantsCard'

import Button from 'react-bootstrap/Button'
//import { ButtonGroup } from 'react-bootstrap'

//import FormTable from '../components/FormTable'
import LazyLoad from 'react-lazyload';
import { forceCheck } from 'react-lazyload';
import { InputGroup, FormControl } from 'react-bootstrap';
//import FormTable from '../components/FormTable'
/*
participants: [
    {
        Country: "Test",
        FirstName: "Test",
        LastName: "Test",
        Email: "Test",
        Phone: "Test",
        Company: "Test"
    }
],
*/
/**
 * @param editForm - evoke appendForm
 * @param subForm - get formObject data to Form
 */
const ParticipantsForm = (props) => {
    const [Form, setForm] = useState(props.subForm)
    
    // function clickHandler(e){
    //     e.preventDefault(); //prevents page refresh
    //     let form = Form;
    //     form.push({
    //         Country: e.target.form[0].value,
    //         FirstName: e.target.form[1].value,
    //         LastName: e.target.form[2].value,
    //         Email: e.target.form[3].value,
    //         Phone: e.target.form[4].value,
    //         Company: e.target.form[5].value
    //     })
    //     document.getElementById("form").reset();
    //     setForm(form)
    //     props.editForm("participants", Form)
    // }
    function clickEmpty(e){
        e.preventDefault(); //prevents page refresh
        let form = Form;
        form.push({
            Country: "",
            FirstName: "",
            LastName: "",
            Email: "",
            Phone: "",
            Company: ""
        })
        setForm(form)
        props.editForm("participants", Form)
    }
    async function fileHandler(e){
        e.preventDefault();
        let jsonData = await xlsxToJson(e.target)
        console.log(jsonData)
        let form = []
        for(let i in jsonData){
            console.log(jsonData[i])
            if(i > 0){
                form.push(
                    {
                        Country: jsonData[i][0],
                        FirstName: jsonData[i][1],
                        LastName: jsonData[i][2],
                        Email: jsonData[i][3],
                        Phone: jsonData[i][4],
                        Company: jsonData[i][5]
                    }
                )
            }
        }
        setForm(form)
        props.editForm("participants", Form)
        document.getElementById("fileform").reset();
    }
    const [Search, setSearch] = useState("")
    useEffect(() => {
        if(Search !== ""){
            forceCheck();
        }
    }, [Search])
    let dataContainer;
    function cardHandler(e){
        // if(parseInt(Page) === Math.ceil(e.length/CardsPerPage) && Page !== "0"){
        //     setPage((parseInt(Page)-1).toString())
        // }
        setForm(e)
        props.editForm("participants", e)
    }
    dataContainer = Form.slice(0).reverse().map((item, index)=>{
        if((item.Company).includes(Search) || 
            (item.Country).includes(Search) || 
            (item.Email).includes(Search) || 
            (item.FirstName).includes(Search) || 
            (item.LastName).includes(Search) || 
            (item.Phone).includes(Search)||
            Search === ""){
            return(
                <LazyLoad key={index} height={200}>
                    <ParticipantsCard 
                        key={index} 
                        index={index} 
                        form={item} 
                        data={Form} 
                        editForm={cardHandler}
                        fileToUpload={(e)=>props.fileToUpload(e)}
                    />
                </LazyLoad>
            )
        }
        else{
            return null
        }
    })
    // const [Page, setPage] = useState("0")
    // const [CardsPerPage, setCardsPerPage] = useState(20)
    // let totalPages = Math.ceil(dataContainer.length/CardsPerPage)

    // let pageButtons = []
    // if(totalPages > 1){
    //     for(let i = 0; i < totalPages; i++){
    //         pageButtons.push(
    //             <Button key={i} name={i} onClick={(e)=>{setPage(e.target.name)}} disabled={Page === i.toString() ? true : false }>Page {i}</Button>
    //         )
    //     }
    // }
    // let cardContainer = dataContainer.splice(CardsPerPage*Page, CardsPerPage)

    return(
        <>
        <form id="fileform" style={{display:'flex',justifyContent:'center',alignContent:'center'}}>
            <label htmlFor="hidden-input" className="labelForHidden">Choose Excel File</label>
            <input id="hidden-input" type="file" className="hidden" onChange={fileHandler}/>
        </form>
        <div style={{display:'flex',justifyContent:'center',alignContent:'center'}}>
            <a href='/Excel/Participants.xlsx' download>Click to download base Excel Form</a>
        </div>
        <div style={
            {
                marginRight:'20px', marginLeft:'20px', display:'flex',justifyContent:'center', 
                alignItems:'center', flexDirection:'column', flexWrap:'wrap'
            }}>
            {/* <label>Cards per Page: </label>
            <input type="number" min="1" defaultValue={CardsPerPage} onKeyDown={(e)=>{if(e.keyCode === 13 && e.target.value > 0){setCardsPerPage(e.target.value)}}}/>
            {totalPages > 1 ? <h5>Current Page: {Page}</h5> : null}
            <ButtonGroup style={{display:'flex', flexWrap:'wrap'}}>
                {pageButtons}
            </ButtonGroup> */}
            <InputGroup style={{width:'50%'}}>
                <FormControl style={{marginRight:'10px'}} onKeyDown={(e)=>{if(e.keyCode === 13) setSearch(e.target.value)}}/>
                <Button className="otherButtons" onClick={(e)=>{setSearch(e.currentTarget.parentNode.childNodes[0].value)}}>Search</Button>
            </InputGroup>
        </div>
        <form autoComplete="off" id="form">
            {/* <input type="text" name="country" placeholder="Country"/>
            <input type="text" name="firstName" placeholder="First Name"/>
            <input type="text" name="lastName" placeholder="Last Name"/>
            <input type="text" name="email" placeholder="Email"/>
            <input type="text" name="phone" placeholder="Phone"/>
            <input type="text" name="company" placeholder="Company"/>
            <button onClick={clickHandler}>Add Participant</button> */}
            <AddButton onClick={clickEmpty}/>
        </form>
        <div className="list">
            {dataContainer}
            {/* {cardContainer} */}
        </div>

        {/* <div className="footer" style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', backgroundColor:'white', position:'fixed', bottom:'0', width:'100%'}}>
            <p>This software uses react-lazyload - see library-license.txt</p>
        </div> */}
        {/* <label>.xlsx file input</label>
        <input type="file" onChange={fileHandler}/> */}
        {/* {Form.length > 0 ? <FormTable form={Form} setForm={setForm}/> : null} */}
        </>
    )
}

export default ParticipantsForm