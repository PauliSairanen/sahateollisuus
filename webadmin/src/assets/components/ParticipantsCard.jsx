import React from 'react';
import {Card, FormGroup, FormLabel, FormControl, OverlayTrigger, Tooltip} from 'react-bootstrap'
import {Form} from 'react-bootstrap'
import {Row, Col} from 'react-bootstrap'
import { useEffect } from 'react';
import DeleteButton from './DeleteButton';
import './ParticipantsCard.css';

const SponsorCard = props => {

  let formObject = props.form

  if(formObject.ImageID && props.ID){
    formObject.imgsrc = `https://sahat.lab.fi/public/${props.ID}/${formObject.ImageID}`
  }
  useEffect(() => {
    //console.log(ImgSrc)
    //eslint-disable-next-line react-hooks/exhaustive-deps
    formObject = props.form
  })
  function changeHandler(e){
    let data = props.data;
    //data = data.slice(0).reverse()
    data[props.index][e.target.name] = e.target.value;
    //data = data.slice(0).reverse()
    props.editForm(data)
  }
  function deleteHandler(){
    let data = props.data;
    //data = data.slice(0).reverse()
    data.splice(props.index, 1)
    //data = data.slice(0).reverse()
    props.editForm(data)
  }
  return (
    <Card>
      <div className="bigDiv">
        <Form>
          <Row>
            <Col>
              <FormGroup>
                <FormLabel>First Name</FormLabel>
                <FormControl size="sm" value={formObject.FirstName} onChange={(e) => {changeHandler(e)}} name="FirstName"></FormControl>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <FormLabel>Last Name</FormLabel>
                <FormControl size="sm" value={formObject.LastName} onChange={(e) => {changeHandler(e)}} name="LastName"></FormControl>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <FormLabel>Email</FormLabel>
                <FormControl size="sm" value={formObject.Email} onChange={(e) => {changeHandler(e)}} name="Email"></FormControl>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <FormLabel>Phone</FormLabel>
                <OverlayTrigger 
                  placement="bottom" 
                  delay={{show: 250, hide: 250}}
                  overlay={<Tooltip>Include area code. Example: "+358 12345678"</Tooltip>}
                  >
                  <FormControl size="sm" value={formObject.Phone} onChange={(e) => {changeHandler(e)}} name="Phone"></FormControl>
                </OverlayTrigger>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <FormLabel>Company</FormLabel>
                <FormControl size="sm" value={formObject.Company} onChange={(e) => {changeHandler(e)}} name="Company"></FormControl>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <FormLabel>Country ISO Code</FormLabel>
                <OverlayTrigger 
                  placement="bottom" 
                  delay={{show: 250, hide: 250}}
                  overlay={<Tooltip>Example: "FI", "SE", "FR"</Tooltip>}
                  >
                  <FormControl size="sm" value={formObject.Country} onChange={(e) => {changeHandler(e)}} name="Country"></FormControl>
                </OverlayTrigger>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </div>
      <DeleteButton onClick={deleteHandler}/>
    </Card>
  )
}

export default SponsorCard;