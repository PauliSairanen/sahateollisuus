import React, {useEffect} from 'react'
import {Card, FormGroup, FormLabel, FormControl} from 'react-bootstrap'
import {Form} from 'react-bootstrap'
import {Row, Col} from 'react-bootstrap'
import './AboutCard.css';

const AboutCard = props => {
  let form = props.form
  
  useEffect(() => {
    //console.log(ImgSrc)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    form = props.form
  })
  // function changeHandler(e){
  //   let data = props.data;
  //   data = data.slice(0).reverse()
  //   data[props.index][e.target.name] = e.target.value.match(/[^\\/]*$/)[0]
  //   data = data.slice(0).reverse()
  //   props.editForm(data)
  // }

  //Kuvat https://sahat.lamk.fi/public/{EventID}/{FileName}
  return (
    <div>
      <Form onChange={(e)=> props.onChange(e)}>
        <Card>
          <FormLabel>Welcome text</FormLabel>
          <Row>
            <Col>
              <FormGroup>
                <FormLabel>Chapter 1</FormLabel>
                <FormControl as="textarea" size="sm" name="bodyText1" defaultValue={form.bodyText1}></FormControl>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <FormLabel>Chapter 2</FormLabel>
                <FormControl as="textarea" size="sm" name="bodyText2" defaultValue={form.bodyText2}></FormControl>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <FormLabel>Chapter 3</FormLabel>
                <FormControl as="textarea" size="sm" name="bodyText3" defaultValue={form.bodyText3}></FormControl>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <FormLabel>Chapter 4</FormLabel>
                <FormControl as="textarea" size="sm" name="bodyText4" defaultValue={form.bodyText4}></FormControl>
              </FormGroup>
            </Col>
          </Row>
        </Card>
        <Card>
          <FormLabel>Venue information</FormLabel>
          <Row>
            <Col>
              <FormGroup>
                <FormLabel>Event Place Name</FormLabel>
                <FormControl size="sm" name="placeName" defaultValue={form.placeName}></FormControl>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <FormLabel>Event Address</FormLabel>
                <FormControl size="sm" name="placeAddress" defaultValue={form.placeAddress}></FormControl>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <FormLabel>Email</FormLabel>
                <FormControl size="sm" name="placeEmail" defaultValue={form.placeEmail}></FormControl>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <FormLabel>Phone</FormLabel>
                <FormControl size="sm" name="placePhone" defaultValue={form.placePhone}></FormControl>
              </FormGroup>
            </Col>
          </Row>
        </Card>
        <Card>
          <FormLabel>More information</FormLabel>
          <Row>
            <Col>
              <FormGroup>
                <FormLabel>Event Website</FormLabel>
                <FormControl size="sm" name="MiWebsite" defaultValue={form.MiWebsite}></FormControl>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <FormLabel>Organizer</FormLabel>
                <FormControl size="sm" name="MiOrg" defaultValue={form.MiOrg}></FormControl>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <FormLabel>Email</FormLabel>
                <FormControl size="sm" name="MiEmail" defaultValue={form.MiEmail}></FormControl>
              </FormGroup>
            </Col>
          </Row>
        </Card>
        <Card>
          <Row>
            <Col>
              <FormGroup>
                <FormLabel>Disclaimers</FormLabel>
                <FormControl as="textarea" size="sm" name="disclaimer1" defaultValue={form.disclaimer1}></FormControl>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <FormControl as="textarea" size="sm" name="disclaimer2" defaultValue={form.disclaimer2}></FormControl>
              </FormGroup>
            </Col>
          </Row>
        </Card>
      </Form>
    </div>
  )
}

export default AboutCard;