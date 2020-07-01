import React, {useState} from 'react'
//import FormTable from '../components/FormTable'
import xlsxToJson from '../components/XlsxConverter'
import Card from 'react-bootstrap/Card'
import AddButton from '../components/AddButton'
import ParticipantsCard from '../components/ParticipantsCard'
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
        //console.log(e.target.files[0])
        let jsonData = await xlsxToJson(e.target)
        //console.log(jsonData)
        for(let i in jsonData){
            console.log(jsonData[i])
            if(i > 0){
                let form = Form
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
                setForm(form)
                props.editForm("participants", Form)
            }
        }
    }
    let dataContainer;
    function cardHandler(e){
        setForm(e)
        props.editForm("participants", e)
    }
    dataContainer = Form.slice(0).reverse().map((item, index)=>{
        return(
        <ParticipantsCard 
            key={index} 
            index={index} 
            form={item} 
            data={Form} 
            editForm={cardHandler}
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
            {/* <input type="text" name="country" placeholder="Country"/>
            <input type="text" name="firstName" placeholder="First Name"/>
            <input type="text" name="lastName" placeholder="Last Name"/>
            <input type="text" name="email" placeholder="Email"/>
            <input type="text" name="phone" placeholder="Phone"/>
            <input type="text" name="company" placeholder="Company"/>
            <button onClick={clickHandler}>Add Participant</button> */}
            <AddButton onClick={clickEmpty}/>
        </form>
        {dataContainer}
        {/* <label>.xlsx file input</label>
        <input type="file" onChange={fileHandler}/> */}
        {/* {Form.length > 0 ? <FormTable form={Form} setForm={setForm}/> : null} */}
        
        </>
    )
}

export default ParticipantsForm