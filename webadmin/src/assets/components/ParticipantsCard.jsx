import React from 'react';
import {Card, FormGroup, FormLabel, FormControl} from 'react-bootstrap'
import {Form} from 'react-bootstrap'
import {Row, Col} from 'react-bootstrap'
import {Image} from 'react-bootstrap'
import { useState } from 'react';
import DeleteButton from './DeleteButton';
import './ParticipantsCard.css';


const SponsorCard = props => {

  const fname = props.fname;
  const lname = props.lname;
  const email = props.email;
  const phone = props.phone;
  const company = props.company;
  const country = props.country;

  const [fnameState, setFname] = useState(fname);
  const [lnameUrlState, setLname] = useState(lname);
  const [emailState, setEmail] = useState(email);
  const [phoneState, setPhone] = useState(phone);
  const [companyState, setCompany] = useState(company);
  const [countryState, setCountry] = useState(country);

  return (
    
    <Card>
      <Form>
        <Row>
          <Col>
            <FormGroup controlId="formBasicFname">
              <FormLabel>First name</FormLabel>
              <FormControl value={fnameState} onChange={(e) => setFname(e.target.value)} placeholder="First name"></FormControl>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup controlId="formBasicLname">
              <FormLabel>Last name</FormLabel>
              <FormControl value={lnameUrlState} onChange={(e) => setLname(e.target.value)} placeholder="Last name"></FormControl>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup controlId="formBasicEmail">
              <FormLabel>Email</FormLabel>
              <FormControl value={emailState} onChange={(e) => setEmail(e.target.value)} placeholder="Email"></FormControl>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup controlId="formBasicPhone">
              <FormLabel>Phone</FormLabel>
              <FormControl value={phoneState} onChange={(e) => setPhone(e.target.value)} placeholder="Phone"></FormControl>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup controlId="formBasicCompany">
              <FormLabel>Company</FormLabel>
              <FormControl value={companyState} onChange={(e) => setCompany(e.target.value)} placeholder="Company"></FormControl>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup controlId="formBasicCountry">
              <FormLabel>Country</FormLabel>
              <FormControl value={countryState} onChange={(e) => setCountry(e.target.value)} placeholder="Country"></FormControl>
            </FormGroup>
          </Col>
        </Row>
      </Form>
      <DeleteButton></DeleteButton>
    </Card>
  )
}

export default SponsorCard;