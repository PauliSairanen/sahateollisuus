import React from 'react';
import {Card, FormGroup, FormLabel, FormControl} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import {Form} from 'react-bootstrap'
import {Row, Col} from 'react-bootstrap'
import {Image} from 'react-bootstrap'
import { useState } from 'react';


const ProgrammeCard = props => {

  const time = props.time;
  const location = props.location;
  const description = props.description;
  const speaker = props.speaker;
  const titleOfSpeaker = props.titleOfSpeaker;
  const specialTitleOfSpeaker = props.specialTitleOfSpeaker;
  const companyOfSpeaker = props.companyOfSpeaker;
  const pdf = props.pdf;
  const deleteFunction = props.deleteFunction;

  const [timeState, setTime] = useState(time);
  const [locationState, setLocation] = useState(location);
  const [descriptionState, setDescription] = useState(description);
  const [speakerState, setSpeaker] = useState(speaker);
  const [titleState, setTitle] = useState(titleOfSpeaker);
  const [speacialTitleState, setSpecialTitle] = useState(specialTitleOfSpeaker);
  const [companyState, setCompany] = useState(companyOfSpeaker);
  const [pdfState, setPdf] = useState(pdf);

  return (
    
    <Card>
      <Form>
        <FormGroup className="pdf" controlId="formBasicPdf">
          <FormLabel><Image className="imgPrev" src={pdfState}></Image></FormLabel>
          <label htmlFor="hidden" id="lableForHidden">Choose PDF</label>
          <FormControl size="sm" onChange={(e) => setPdf(e.target.value)} type='file' id="hidden"></FormControl>
        </FormGroup>
        <Row>
          <Col>
            <FormGroup controlId="formBasicSpeakerName">
              <FormLabel>Name of speaker</FormLabel>
              <FormControl size="sm" value={speakerState} onChange={(e) => setSpeaker(e.target.value)} placeholder="Name of speaker"></FormControl>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup controlId="formBasicSpeakerTitle">
              <FormLabel>Title of speaker</FormLabel>
              <FormControl size="sm" value={titleState} onChange={(e) => setTitle(e.target.value)} placeholder="Title of speaker"></FormControl>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup controlId="formBasicSpeakerSpecialTitle">
              <FormLabel>Special title of speaker</FormLabel>
              <FormControl size="sm" value={speacialTitleState} onChange={(e) => setSpecialTitle(e.target.value)} placeholder="Special title of speaker"></FormControl>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup controlId="formBasicSpeakerCompany">
              <FormLabel>Company of speaker</FormLabel>
              <FormControl size="sm" value={companyState} onChange={(e) => setCompany(e.target.value)} placeholder="Company of speaker"></FormControl>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
          <FormGroup controlId="formBasicTime">
              <FormLabel>Time</FormLabel>
              <FormControl size="sm" value={timeState} onChange={(e) => setTime(e.target.value)} placeholder="Time"></FormControl>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup controlId="formBasicLocation">
              <FormLabel>Location</FormLabel>
              <FormControl size="sm" value={locationState} onChange={(e) => setLocation(e.target.value)} placeholder="Location"></FormControl>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup controlId="formBasicDescription">
              <FormLabel>Description</FormLabel>
              <FormControl size="sm" as="textarea" rows="1" value={descriptionState} onChange={(e) => setDescription(e.target.value)} placeholder="Description"></FormControl>
            </FormGroup>
          </Col>
        </Row>
      </Form>
      <Button className="deleteButton" onClick={deleteFunction}>
        <span className="deleteButtonText">-</span>
      </Button>
    </Card>
  )
}

export default ProgrammeCard;