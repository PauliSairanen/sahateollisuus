import React, {useEffect} from 'react'

import Table from 'react-bootstrap/Table'

const FormTable = (props) => {
    let form = props.form
    let keys = Object.keys(form[0])
    return (
        <>
        <Table striped bordered>
            <thead>
                <tr>
                    {keys.map((item, index)=>{
                        return(<th key={index}>{item}</th>)
                    })}
                    <th>Remove</th>
                </tr>
            </thead>

            <tbody>
                {form.map((item,index)=>{
                    let values = [];
                    for(let key in item){
                        let line = <td key={key}>{item[key]}</td>
                        values.push(line)
                    }
                    return(
                        <tr key={index}>
                            {values}
                        </tr>
                    )
                })}
            </tbody>
        </Table>
        </>
    )
}

export default FormTable
