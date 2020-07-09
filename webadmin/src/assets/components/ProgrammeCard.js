import React from 'react';
import {Card, FormGroup, FormLabel, FormControl, OverlayTrigger, Tooltip} from 'react-bootstrap'
//import {Button} from 'react-bootstrap'
import {Form} from 'react-bootstrap'
import {Row, Col} from 'react-bootstrap'
//import {Image} from 'react-bootstrap'
import DeleteButton from '../components/DeleteButton'
import { useEffect } from 'react';
import './ProgrammeCard.css'
import PdfIcon from '@material-ui/icons/PictureAsPdfOutlined'
import NoPdfIcon from '@material-ui/icons/NoSim'

const ProgrammeCard = props => {
    let formObject = props.form
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        formObject = props.form
    })
    function changeHandler(e){
        let data = props.data;
        data = data.slice(0).reverse()
        if(e.target.type === "file"){
            data[props.index][e.target.name] = e.target.value.match(/[^\\/]*$/)[0]
          }
          else{
            data[props.index][e.target.name] = e.target.value
          }
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

    let PdfIconElement
    if (props.form.Pdf){
        PdfIconElement = <PdfIcon className="pdfIcon" style={{color: '#ff0000'}}></PdfIcon>
    }
    else {
        PdfIconElement = <NoPdfIcon className="pdfIcon"></NoPdfIcon>
    }

    let counter = 0;
    for(let i = 0; i < props.data.length; i++){
        if(props.data[i].day === formObject.day){
            counter++;
        }
    }

    return (
      <Card>
            <div className="wrapper">
                <div className="bigDiv">
                    <Form>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <FormLabel>Name of the Speaker</FormLabel>
                                    <FormControl size="sm" onChange={changeHandler} name="NameOfSpeaker" defaultValue={formObject.NameOfSpeaker}></FormControl>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <FormLabel>Title of the Speaker</FormLabel>
                                    <FormControl size="sm" onChange={changeHandler} name="TitleOfSpeaker" defaultValue={formObject.TitleOfSpeaker}></FormControl>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <FormLabel>Special Title of the Speaker</FormLabel>
                                    <FormControl size="sm" onChange={changeHandler} name="SpecialTitleOfSpeaker" defaultValue={formObject.SpecialTitleOfSpeaker}></FormControl>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <FormLabel>Company of the Speaker</FormLabel>
                                    <FormControl size="sm" onChange={changeHandler} name="CompanyOfSpeaker" defaultValue={formObject.CompanyOfSpeaker}></FormControl>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            {/* <Col>
                                <FormGroup>
                                    <FormLabel>Day</FormLabel>
                                    <FormControl size="sm" type="number" min="0" name="day" value={formObject.day} onChange={changeHandler}></FormControl>
                                </FormGroup>
                            </Col> */}
                            <Col>
                                <FormGroup>
                                    <FormLabel>Time</FormLabel>
                                    <OverlayTrigger 
                                      placement="bottom" 
                                      delay={{show: 250, hide: 250}}
                                      overlay={<Tooltip>Example "15:00-15:30"</Tooltip>}
                                      >
                                    <FormControl size="sm" name="Time" onChange={changeHandler} defaultValue={formObject.Time}></FormControl>
                                    </OverlayTrigger>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <FormLabel>Location</FormLabel>
                                    <FormControl size="sm" name="Location" onChange={changeHandler} defaultValue={formObject.Location}></FormControl>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl size="sm" name="Description" as="textarea" rows="1" defaultValue={formObject.Description} onChange={changeHandler}></FormControl>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <div className="smallDiv">
                    {/* <FormGroup className="file"> */}
                                <FormLabel>{PdfIconElement}</FormLabel>
                                <label htmlFor={"hidden-"+props.index} className="labelForHidden" style={{width: "111.25px"}}>Choose PDF</label>
                                <FormControl size="sm" onChange={(e)=>{changeHandler(e); fileHandler(e)}} className="hidden" name="Pdf" type='file' id={'hidden-'+props.index}></FormControl>
                    {/* </FormGroup> */}
                </div>
            </div>
            {/* <Button className="deleteButton" onClick={deleteHandler}>
                <span className="deleteButtonText">-</span>
            </Button> */}
            {counter > 1 ? <DeleteButton onClick={deleteHandler}/> : null}
        </Card>
    )
}

export default ProgrammeCard;