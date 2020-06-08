import React, {useState, useEffect} from 'react'

import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

const FormTable = (props) => {
    const [Refresh, setRefresh] = useState(false) // does nothing except makes react refresh the component. Feels hacky but hey if it works it works. Who am i to judge the fate that has been decended upon me. For my actions are righteous and pure. Not even warnings plague thy code. It is raining on Mount Fuji, Mogami River. 
    let form = props.form
    let keys;
    if(form && form.length > 0){
        keys = Object.keys(form[0])

        if(props.programme){
            let newForm = []
            for(let i in form){
                let day = form[i].day
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
                            CompanyOfSpeaker: content[j].CompanyOfSpeaker,
                            Pdf: content[j].Pdf
                        }
                    )
                }
            }
            form = newForm;
        }
    }
    else{
        form = []
        keys = null
    }
    if(props.keys){
        keys = props.keys
    }
    function clickHandler(e){
        //console.log(e.target.id)
        let newForm = form;
        newForm.splice(e.target.id, 1)
        //console.log(newForm)
        form = newForm
        props.setForm(form)
        setRefresh(true)
    }
    useEffect(() => {
        setRefresh(false)
    }, [Refresh])
    return (
        <>
        <Table striped bordered>
            <thead>
                <tr>
                    {keys ? keys.map((item, index)=>{
                        return(<th key={index}>{item}</th>)
                    }) : null}
                    {keys ? <th>Remove</th> : null}
                </tr>
            </thead>

            <tbody>
                {
                    form.map((item,index)=>{
                        let values = [];
                        for(let key in item){
                            if(typeof(item[key]) == "object"){

                            }
                            else{
                                let cell = <td key={key}>{item[key]}</td>
                                values.push(cell)
                            }
                        }
                        values.push(
                            <td key={index}> 
                                <Button 
                                    id={index} 
                                    onClick={clickHandler}
                                    >Remove
                                    </Button>
                            </td>
                        )
                        
                        return(
                            <tr key={index}>
                                {values}
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
        </>
    )
}

export default FormTable
