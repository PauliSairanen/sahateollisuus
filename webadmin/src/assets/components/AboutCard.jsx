import React, {useEffect} from 'react'
import {Card, FormGroup, FormLabel, FormControl} from 'react-bootstrap'
import {Form} from 'react-bootstrap'
import {Row, Col} from 'react-bootstrap'
import './AboutCard.css';

const AboutCard = props => {
  let formObject = props.form
  
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

  //Kuvat https://sahat.lamk.fi/public/{EventID}/{FileName}
  return (
    <div>
      <Form>
        <Card>
          <Row>
            <Col>
              <FormGroup>
                <FormLabel>Welcome text</FormLabel>
                <FormControl as="textarea" size="sm" value={formObject.Speaker} onChange={(e) => {changeHandler(e)}} name="Speaker"></FormControl>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <FormControl as="textarea" size="sm" value={formObject.Company} onChange={(e) => {changeHandler(e)}} name="Company"></FormControl>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <FormControl as="textarea" size="sm" value={formObject.Company} onChange={(e) => {changeHandler(e)}} name="Company"></FormControl>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <FormControl as="textarea" size="sm" value={formObject.Company} onChange={(e) => {changeHandler(e)}} name="Company"></FormControl>
              </FormGroup>
            </Col>
          </Row>
        </Card>
        <Card>
          <Row>
            <Col>
              <FormGroup>
                <FormLabel>Venue information</FormLabel>
                <FormControl size="sm" value={formObject.Speaker} onChange={(e) => {changeHandler(e)}} name="Speaker"></FormControl>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <FormControl size="sm" value={formObject.Company} onChange={(e) => {changeHandler(e)}} name="Company"></FormControl>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <FormControl size="sm" value={formObject.Company} onChange={(e) => {changeHandler(e)}} name="Company"></FormControl>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <FormControl size="sm" value={formObject.Company} onChange={(e) => {changeHandler(e)}} name="Company"></FormControl>
              </FormGroup>
            </Col>
          </Row>
        </Card>
        <Card>
          <Row>
            <Col>
              <FormGroup>
                <FormLabel>More information</FormLabel>
                <FormControl size="sm" value={formObject.Speaker} onChange={(e) => {changeHandler(e)}} name="Speaker"></FormControl>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <FormControl size="sm" value={formObject.Company} onChange={(e) => {changeHandler(e)}} name="Company"></FormControl>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <FormControl size="sm" value={formObject.Company} onChange={(e) => {changeHandler(e)}} name="Company"></FormControl>
              </FormGroup>
            </Col>
          </Row>
        </Card>
        <Card>
          <Row>
            <Col>
              <FormGroup>
                <FormLabel>Disclaimers</FormLabel>
                <FormControl as="textarea" size="sm" value={formObject.Company} onChange={(e) => {changeHandler(e)}} name="Company"></FormControl>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <FormControl as="textarea" size="sm" value={formObject.Company} onChange={(e) => {changeHandler(e)}} name="Company"></FormControl>
              </FormGroup>
            </Col>
          </Row>
        </Card>
      </Form>
    </div>
  )
}

export default AboutCard;