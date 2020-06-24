import React from 'react';
import {Card, FormGroup, FormLabel, FormControl} from 'react-bootstrap'
import {Form} from 'react-bootstrap'
import {Row, Col} from 'react-bootstrap'
import {Image} from 'react-bootstrap'
import { useState } from 'react';
import DeleteButton from './DeleteButton';
import './ParticipantsCard.css';


const SponsorCard = props => {

  let formObject = props.form

  if(formObject.ImageID && props.ID){
    formObject.imgsrc = `https://sahat.lamk.fi/public/${props.ID}/${formObject.ImageID}`
  }
  useEffect(() => {
    //console.log(ImgSrc)
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
  function changeImage(e) {
    if (e.target.files && e.target.files[0]) {
      //setImgSrc(URL.createObjectURL(e.target.files[0]))
      formObject["imgsrc"] = URL.createObjectURL(e.target.files[0])
    }
  }

  return (
    
    <Card>
      <Form>
        <Row>
          <Col>
            <FormGroup controlId="formBasicFname">
              <FormLabel>First name</FormLabel>
              <FormControl size="sm" value={formObject.FirstName} onChange={(e) => {changeHandler(e)}} name="FirstName" placeholder="First name"></FormControl>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup controlId="formBasicLname">
              <FormLabel>Last name</FormLabel>
              <FormControl size="sm" value={formObject.LastName} onChange={(e) => {changeHandler(e)}} name="LastName" placeholder="Last name"></FormControl>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup controlId="formBasicEmail">
              <FormLabel>Email</FormLabel>
              <FormControl size="sm" value={formObject.Email} onChange={(e) => {changeHandler(e)}} name="Email" placeholder="Email"></FormControl>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup controlId="formBasicPhone">
              <FormLabel>Phone</FormLabel>
              <FormControl size="sm" value={formObject.Phone} onChange={(e) => {changeHandler(e)}} name="Phone" placeholder="Phone"></FormControl>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup controlId="formBasicCompany">
              <FormLabel>Company</FormLabel>
              <FormControl size="sm" value={formObject.Company} onChange={(e) => {changeHandler(e)}} name="Company" placeholder="Company"></FormControl>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup controlId="formBasicCountry">
              <FormLabel>Country</FormLabel>
              <FormControl size="sm" value={formObject.Country} onChange={(e) => {changeHandler(e)}} name="Country" placeholder="Country"></FormControl>
            </FormGroup>
          </Col>
        </Row>
      </Form>
      <DeleteButton></DeleteButton>
    </Card>
  )
}

export default SponsorCard;