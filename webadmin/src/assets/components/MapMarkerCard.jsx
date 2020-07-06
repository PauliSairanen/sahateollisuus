import React, {useEffect, useState} from 'react'
import {Card, FormGroup, FormLabel, FormControl, FormText, OverlayTrigger, Tooltip} from 'react-bootstrap'
import {Form} from 'react-bootstrap'
import {Row, Col} from 'react-bootstrap'
import {Image} from 'react-bootstrap'
import DeleteButton from './DeleteButton';
import './MapMarkerCard.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios'

import AddLocationIcon from '@material-ui/icons/AddLocation';

const MapMarkerCard = props => {
  let formObject = props.form
  let ID = props.ID

  if(formObject.image && ID && !formObject.markerImgsrc){
    formObject.markerImgsrc = `https://sahat.lamk.fi/public/${ID}/${formObject.image}`
    if((formObject.image).includes("https://")){
      formObject.markerImgsrc = formObject.image
    }
  }
  useEffect(() => {
    //console.log(ImgSrc)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    formObject = props.form
  })
  function changeHandler(e){
    let data = props.data;
    //data = data.slice(0).reverse()
    if(e.target.type === "file"){
      data[props.index][e.target.name] = e.target.value.match(/[^\\/]*$/)[0]
    }
    else{
      data[props.index][e.target.name] = e.target.value
    }
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
  function fileHandler(e){
    props.fileToUpload(e)
  }
  function changeImage(e) {
    if (e.target.files && e.target.files[0]) {
      //setImgSrc(URL.createObjectURL(e.target.files[0]))
      formObject["markerImgsrc"] = URL.createObjectURL(e.target.files[0])
    }
  }
  const [ErrorMsg, setErrorMsg] = useState()
  async function geocodeHandler(){
    let data = props.data;
    setErrorMsg("")
    if(formObject.address){
      let query = (formObject.address).replace(" ", "%20")
      let apiurl = `https://nominatim.openstreetmap.org/search/${query}?format=json&limit=1`
      await axios.get(apiurl)
      .then(function (res) {
        data[props.index]["lat"] = res.data[0].lat;
        data[props.index]["long"] = res.data[0].lon;
      })
      .catch(function (error) {
        console.log(error)
        setErrorMsg("Cannot get lat and long")
      })
    }
    

    props.editForm(data)
  }
  let formElement;
  if (props.markerType === "restaurants"){
    formElement =
      <Row>
        <Col>
          <FormGroup>
            <FormLabel>Description</FormLabel>
            <FormControl as="textarea" size="sm" value={formObject.description} onChange={(e) => {changeHandler(e)}} name="description"></FormControl>
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <FormLabel>Category</FormLabel>
            <OverlayTrigger 
              placement="bottom" 
              delay={{show: 250, hide: 250}}
              overlay={<Tooltip>Type of restaurant. Example: "Burger", "Pizza", "Chinese" etc</Tooltip>}
              >
            <FormControl size="sm" value={formObject.category} onChange={(e) => {changeHandler(e)}} name="category"></FormControl>
            </OverlayTrigger>
          </FormGroup>
        </Col>
        <Col sm={1}>
        </Col>
        <Col>
          <FormGroup>
            <FormLabel>Rating</FormLabel>
            <OverlayTrigger 
              placement="bottom" 
              delay={{show: 250, hide: 250}}
              overlay={<Tooltip>Value 1-5</Tooltip>}
              >
            <FormControl size="sm" value={formObject.rating} onChange={(e) => {changeHandler(e)}} name="rating"></FormControl>
            </OverlayTrigger>
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <FormLabel>Web url</FormLabel>
            <FormControl size="sm" value={formObject.webURL} onChange={(e) => {changeHandler(e)}} name="webURL"></FormControl>
          </FormGroup>
        </Col>
      </Row>
  }
  else if (props.markerType === "hotels"){
    formElement =
    <Row>
      <Col>
        <FormGroup>
          <FormLabel>Description</FormLabel>
          <FormControl as="textarea" size="sm" value={formObject.description} onChange={(e) => {changeHandler(e)}} name="description"></FormControl>
        </FormGroup>
      </Col>
      <Col>
        <FormGroup>
          <FormLabel>Rating</FormLabel>
          <OverlayTrigger 
              placement="bottom" 
              delay={{show: 250, hide: 250}}
              overlay={<Tooltip>Value 1-5</Tooltip>}
              >
          <FormControl size="sm" value={formObject.rating} onChange={(e) => {changeHandler(e)}} name="rating"></FormControl>
          </OverlayTrigger>
        </FormGroup>
      </Col>
      <Col sm={1}>
      </Col>
      <Col>
        <FormGroup>
          <FormLabel>Web url</FormLabel>
          <FormControl size="sm" value={formObject.webURL} onChange={(e) => {changeHandler(e)}} name="webURL"></FormControl>
        </FormGroup>
      </Col>
      <Col>
      </Col>
    </Row>
  }
  else if (props.markerType === "others"){
    formElement = 
    <Row>
      <Col>
        <FormGroup>
          <FormLabel>Description</FormLabel>
          <FormControl as="textarea" size="sm" value={formObject.description} onChange={(e) => {changeHandler(e)}} name="description"></FormControl>
        </FormGroup>
      </Col>
      <Col>
        <FormGroup>
          <FormLabel>Category</FormLabel>
          <OverlayTrigger 
              placement="bottom" 
              delay={{show: 250, hide: 250}}
              overlay={<Tooltip>Type of business. Example: "Theatre", "Library", "Shop"</Tooltip>}
              >
          <FormControl size="sm" value={formObject.category} onChange={(e) => {changeHandler(e)}} name="category"></FormControl>
          </OverlayTrigger>
        </FormGroup>
      </Col>
      <Col sm={1}>
      </Col>
      <Col>
        <FormGroup>
          <FormLabel>Web URL</FormLabel>
          <FormControl size="sm" value={formObject.webURL} onChange={(e) => {changeHandler(e)}} name="webURL"></FormControl>
        </FormGroup>
      </Col>
      <Col>
      </Col>
    </Row>
  }
  //Kuvat https://sahat.lamk.fi/public/{EventID}/{FileName}
  return (
    <Card>
      <div className="wrapper">
        <div className="bigDiv">
          {props.markerType === "restaurants" ? <p>Restaurant</p>: null}
          {props.markerType === "hotels" ? <p>Hotel</p> : null}
          {props.markerType === "others" ? <p>Other</p> : null}
          <Form>
            <Row>
              <Col>
                <FormGroup>
                  <FormLabel>Name</FormLabel>
                  <FormControl size="sm" value={formObject.name} onChange={(e) => {changeHandler(e)}} name="name"></FormControl>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <FormLabel>Address</FormLabel>
                  <OverlayTrigger 
                    placement="bottom" 
                    delay={{show: 250, hide: 250}}
                    overlay={<Tooltip>Street address, Postcode and City. Example: "Mukkulankatu 19, 15210 Lahti"</Tooltip>}
                    >
                  <FormControl size="sm" value={formObject.address} onChange={(e) => {changeHandler(e)}} name="address"></FormControl>
                  </OverlayTrigger>
                  <FormText className="text-danger">{ErrorMsg}</FormText>
                </FormGroup>
              </Col>
              <Col sm={1}>
                <br></br>
                <OverlayTrigger
                  placement="bottom"
                  delay={{show: 250, hide: 250}}
                  overlay={<Tooltip>Converts address to latitude and longitude</Tooltip>}
                  >
                <Button className="otherButtons" onClick={geocodeHandler}><AddLocationIcon/></Button>
                </OverlayTrigger>
              </Col>
              <Col>
                <FormGroup>
                  <FormLabel>Latitude</FormLabel>
                  <FormControl size="sm" value={formObject.lat} onChange={(e) => {changeHandler(e)}} name="lat"></FormControl>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <FormLabel>Longitude</FormLabel>
                  <FormControl size="sm" value={formObject.long} onChange={(e) => {changeHandler(e)}} name="long"></FormControl>
                </FormGroup>
              </Col>
            </Row>
          </Form>
          {formElement}
        </div>
        <div className="smallDiv">
          <FormLabel><Image className="filePrev" src={formObject.markerImgsrc} fluid/></FormLabel>
          <label htmlFor={'hidden-'+props.index} className="labelForHidden">Choose image</label>
          <FormControl size="sm" onChange={(e) => {changeImage(e);changeHandler(e); fileHandler(e)}} id={'hidden-'+props.index} className="hidden" type='file' name="image"></FormControl>
          {/* <Form.File size="sm" onChange={(e) => {changeHandler(e); fileHandler(e); changeImage(e)}} name="ImageID"/> */}
        </div>
      </div>
      <label>Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright</label>
      <DeleteButton onClick={deleteHandler}></DeleteButton>
    </Card>
  )
}

export default MapMarkerCard;