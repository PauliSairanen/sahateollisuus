import React from 'react';
import {Card, FormGroup, FormLabel, FormControl} from 'react-bootstrap'
import {Form} from 'react-bootstrap'
import {Row, Col} from 'react-bootstrap'
import {Image} from 'react-bootstrap'
import { useState } from 'react';
import DeleteButton from './DeleteButton';
import './SpeakerCard.css';


const SpeakerCard = props => {

  const speaker = props.speaker;
  const titleOfSpeaker = props.titleOfSpeaker;
  const specialTitleOfSpeaker = props.specialTitleOfSpeaker;
  const companyOfSpeaker = props.companyOfSpeaker;
  const file = props.file;

  const [speakerState, setSpeaker] = useState(speaker);
  const [titleState, setTitle] = useState(titleOfSpeaker);
  const [speacialTitleState, setSpecialTitle] = useState(specialTitleOfSpeaker);
  const [companyState, setCompany] = useState(companyOfSpeaker);
  const [fileState, setFile] = useState(file);

  return (
    
    <Card>
      <Form>
        <FormGroup className="file" controlId="formBasicFile">
          <FormLabel><Image className="filePrev" src={fileState}/></FormLabel>
          <label htmlFor="hidden" id="lableForHidden">Choose file</label>
          <FormControl onChange={(e) => setFile(e.target.value)} type='file' id="hidden"></FormControl>
        </FormGroup>
        <Row>
          <Col>
            <FormGroup controlId="formBasicSpeakerName">
              <FormLabel>Name of speaker</FormLabel>
              <FormControl value={speakerState} onChange={(e) => setSpeaker(e.target.value)} placeholder="Name of speaker"></FormControl>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup controlId="formBasicSpeakerTitle">
              <FormLabel>Title of speaker</FormLabel>
              <FormControl value={titleState} onChange={(e) => setTitle(e.target.value)} placeholder="Title of speaker"></FormControl>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup controlId="formBasicSpeakerSpecialTitle">
              <FormLabel>Special title of speaker</FormLabel>
              <FormControl value={speacialTitleState} onChange={(e) => setSpecialTitle(e.target.value)} placeholder="Special title of speaker"></FormControl>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup controlId="formBasicSpeakerCompany">
              <FormLabel>Company of speaker</FormLabel>
              <FormControl value={companyState} onChange={(e) => setCompany(e.target.value)} placeholder="Company of speaker"></FormControl>
            </FormGroup>
          </Col>
        </Row>
      </Form>
      {/* <Button className="deleteButton" onClick={deleteFunction}>
        <span className="deleteButtonText">-</span>
      </Button> */}
      <DeleteButton></DeleteButton>
    </Card>
  )
}

export default SpeakerCard;