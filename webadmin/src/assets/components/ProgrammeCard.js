import React from 'react';
import {Card, FormGroup, FormLabel, FormControl} from 'react-bootstrap'
//import {Button} from 'react-bootstrap'
import {Form} from 'react-bootstrap'
import {Row, Col} from 'react-bootstrap'
//import {Image} from 'react-bootstrap'
import DeleteButton from '../components/DeleteButton'
import { useEffect } from 'react';
import './ProgrammeCard.css'

const ProgrammeCard = props => {
    let formObject = props.form
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        formObject = props.form
    })
    function changeHandler(e){
        let data = props.data;
        data = data.slice(0).reverse()
        data[props.index][e.target.name] = e.target.value.match(/[^\\/]*$/)[0]
        data = data.slice(0).reverse()
        props.editForm(data)
    }
    function deleteHandler(){
        let data = props.data;
        data = data.slice(0).reverse()
        data.splice(props.index, 1)
        data = data.slice(0).reverse()
        props.editForm(data)
    }
    function fileHandler(e){
        props.fileToUpload(e)
    }
    return (
        <Card>
            {/* <p>{props.index}</p> */}
            <Form>
                <FormGroup className="pdf">
                    {/* <FormLabel><Image className="imgPrev" src={???}></Image></FormLabel> */}
                    <FormLabel>{props.form.Pdf ? "PDF: " + props.form.Pdf : "No PDF"}</FormLabel>
                    <label htmlFor={"hidden-"+props.index} id="lableForHidden">Choose PDF</label>
                    <FormControl size="sm" onChange={(e)=>{changeHandler(e); fileHandler(e)}} className="hidden" name="Pdf" type='file' id={'hidden-'+props.index}></FormControl>
                    {/* <Form.File size="sm" onChange={(e) => {changeHandler(e); fileHandler(e)}} name="Pdf"/> */}
                </FormGroup>
                <Row>
                    <Col>
                        <FormGroup>
                            <FormLabel>Name of speaker</FormLabel>
                            <FormControl size="sm" onChange={changeHandler} name="NameOfSpeaker" value={formObject.NameOfSpeaker} placeholder="Name of speaker"></FormControl>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <FormLabel>Title of speaker</FormLabel>
                            <FormControl size="sm" onChange={changeHandler} name="TitleOfSpeaker" value={formObject.TitleOfSpeaker} placeholder="Title of speaker"></FormControl>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <FormLabel>Special title of speaker</FormLabel>
                            <FormControl size="sm" onChange={changeHandler} name="SpecialTitleOfSpeaker" value={formObject.SpecialTitleOfSpeaker} placeholder="Special title of speaker"></FormControl>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <FormLabel>Company of speaker</FormLabel>
                            <FormControl size="sm" onChange={changeHandler} name="Company" value={formObject.Company} placeholder="Company of speaker"></FormControl>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <FormLabel>Day</FormLabel>
                            <FormControl size="sm" type="number" min="0" name="day" value={formObject.day} onChange={changeHandler}></FormControl>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <FormLabel>Time</FormLabel>
                            <FormControl size="sm" name="Time" onChange={changeHandler} value={formObject.Time} placeholder="Time"></FormControl>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <FormLabel>Location</FormLabel>
                            <FormControl size="sm" name="Location" onChange={changeHandler} value={formObject.Location} placeholder="Location"></FormControl>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <FormLabel>Description</FormLabel>
                            <FormControl size="sm" name="Description" as="textarea" rows="1" value={formObject.Description} onChange={changeHandler} placeholder="Description"></FormControl>
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
            {/* <Button className="deleteButton" onClick={deleteHandler}>
                <span className="deleteButtonText">-</span>
            </Button> */}
            <DeleteButton onClick={deleteHandler}/>
        </Card>
    )
}

export default ProgrammeCard;