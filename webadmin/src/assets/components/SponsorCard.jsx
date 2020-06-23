import React from 'react';
import {Card, FormGroup, FormLabel, FormControl} from 'react-bootstrap'
import {Form} from 'react-bootstrap'
import {Row, Col} from 'react-bootstrap'
import {Image} from 'react-bootstrap'
import { useState } from 'react';
import DeleteButton from './DeleteButton';
import './SponsorCard.css';


const SponsorCard = props => {

  const company = props.company;
  const companyUrl = props.companyUrl;
  const file = props.file;

  const [companyState, setCompany] = useState(company);
  const [companyUrlState, setCompanyUrl] = useState(companyUrl);
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
            <FormGroup controlId="formBasicCompany">
              <FormLabel>Name of company</FormLabel>
              <FormControl value={companyState} onChange={(e) => setCompany(e.target.value)} placeholder="Name of company"></FormControl>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup controlId="formBasicCompanyUrl">
              <FormLabel>Url of company</FormLabel>
              <FormControl value={companyUrlState} onChange={(e) => setCompanyUrl(e.target.value)} placeholder="Url of company"></FormControl>
            </FormGroup>
          </Col>
        </Row>
      </Form>
      <DeleteButton></DeleteButton>
    </Card>
  )
}

export default SponsorCard;