import React, {useState, useEffect} from 'react'

import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

/**
 * 
 * @param form - form to render
 * @param setForm - form to change
 * @param file - OPTIONAL file button for file inputting
 * @param programme - OPTIONAL if form in question is a programme which requires additional parsing.
 * @param keys - OPTIONAL for programme because screw writing algorithm to get keys from that.
 */
const FormTable = (props) => {
    const [Refresh, setRefresh] = useState(false) // does nothing except makes react refresh the component. Feels hacky but hey if it works it works. Who am i to judge the fate that has been decended upon me. For my actions are righteous and pure. Not even warnings plague thy code. It is raining on Mount Fuji, Mogami River. 
    let form = props.form
    let keys;
    if(form && form.length > 0){
        keys = Object.keys(form[0])
        //console.log(form, keys)
        if(keys.includes("_id")){
            keys = keys.filter(e => e !== '_id') //one-line string remove from array
            let i;
            for(i = 0; i < form.length; i++){
                delete form[i]["_id"]
            }
            //console.log(keys, form)
        }
    }
    else if(props.mapMarkers){
        let newForm = []
        for(let key in form){
            if(form[key].length > 0){
                for(let i in form[key]){
                    let newObj = {
                        markcat: key,
                        lat: "",
                        lng: "",
                        name: "",
                        address: "",
                        description: "",
                        webURL: "",
                        category: "",
                        rating: "",
                        type: "",
                        image: ""
                    }
                    for(let subkey in form[key][i]){
                        newObj[subkey] = form[key][i][subkey]
                    }
                    newForm.push(newObj)
                }
            }
        }
        form = newForm
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
    function fileHandler(e, key){
        let id = (e.target.id).replace('input-','')
        let fileName = e.target.files[0].name
        let newForm = form;
        props.fileToUpload(e.target.files[0])
        newForm[id][key] = fileName
        console.log(newForm, newForm[id][key])
        form = newForm;
        props.setForm(form)
        setRefresh(true)
    }

    useEffect(() => {
        setRefresh(false)
    }, [Refresh])
    return (
        <>
        {props.file}
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
                        let i = 1;
                        for(let key in item){
                            if(i === Object.keys(item).length && props.fileToUpload && (item[key] === null || item[key] === undefined || item[key] === "")){
                                //console.log(key)
                                let cell = <td key={key} id={"file-"+index}>
                                    <input type="file" id={"input-"+index} name="formTableFile" onChange={(e) => {fileHandler(e,key)}}/>
                                </td>
                                values.push(cell)
                            }
                            else{
                                let cell = <td key={key}>{item[key]}</td>
                                values.push(cell)
                            }
                            i++;
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
