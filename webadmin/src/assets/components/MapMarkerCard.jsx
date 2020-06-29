import React, {useEffect} from 'react'
import {Card, FormGroup, FormLabel, FormControl} from 'react-bootstrap'
import {Form} from 'react-bootstrap'
import {Row, Col} from 'react-bootstrap'
import {Image} from 'react-bootstrap'
import DeleteButton from './DeleteButton';
import './MapMarkerCard.css';

//import Button from 'react-bootstrap/Button';

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
    data[props.index][e.target.name] = e.target.value.match(/[^\\/]*$/)[0]
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

  let secondRow;
  if (props.markerType === "restaurants"){
    secondRow =
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
          <FormControl size="sm" value={formObject.category} onChange={(e) => {changeHandler(e)}} name="category"></FormControl>
        </FormGroup>
      </Col>
      <Col>
        <FormGroup>
          <FormLabel>Rating</FormLabel>
          <FormControl size="sm" value={formObject.rating} onChange={(e) => {changeHandler(e)}} name="rating"></FormControl>
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
    secondRow =
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
          <FormControl size="sm" value={formObject.rating} onChange={(e) => {changeHandler(e)}} name="rating"></FormControl>
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
  else if (props.markerType === "others"){
    secondRow = 
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
          <FormControl size="sm" value={formObject.category} onChange={(e) => {changeHandler(e)}} name="category"></FormControl>
        </FormGroup>
      </Col>
      <Col>
        <FormGroup>
          <FormLabel>Web URL</FormLabel>
          <FormControl size="sm" value={formObject.webURL} onChange={(e) => {changeHandler(e)}} name="webURL"></FormControl>
        </FormGroup>
      </Col>
    </Row>
  }
  //Kuvat https://sahat.lamk.fi/public/{EventID}/{FileName}
  return (
    
    <Card>
      {props.markerType === "restaurants" ? <p>Restaurant</p>: null}
      {props.markerType === "hotels" ? <p>Hotel</p> : null}
      {props.markerType === "others" ? <p>Other</p> : null}
      <Form>
        <FormGroup className="file">
          <FormLabel><Image className="filePrev" src={formObject.markerImgsrc}/></FormLabel>
          <label htmlFor={'hidden-'+props.index} id="lableForHidden">Choose file</label>
          <FormControl size="sm" onChange={(e) => {changeImage(e);changeHandler(e); fileHandler(e)}} id={'hidden-'+props.index} className="hidden" type='file' name="image"></FormControl>
          {/* <Form.File size="sm" onChange={(e) => {changeHandler(e); fileHandler(e); changeImage(e)}} name="ImageID"/> */}
        </FormGroup>
        <Row>
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
          <Col>
            <FormGroup>
              <FormLabel>Name</FormLabel>
              <FormControl size="sm" value={formObject.name} onChange={(e) => {changeHandler(e)}} name="name"></FormControl>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <FormLabel>Address</FormLabel>
              <FormControl size="sm" value={formObject.address} onChange={(e) => {changeHandler(e)}} name="address"></FormControl>
            </FormGroup>
            {/* <Button>Geocode lat and long</Button> */}
          </Col>
        </Row>
        {secondRow}
      </Form>
      <DeleteButton onClick={deleteHandler}></DeleteButton>
    </Card>
  )
}

export default MapMarkerCard;