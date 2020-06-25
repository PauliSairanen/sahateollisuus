import React, {useEffect} from 'react'
import {Card, FormGroup, FormLabel, FormControl} from 'react-bootstrap'
import {Form} from 'react-bootstrap'
import {Row, Col} from 'react-bootstrap'
import {Image} from 'react-bootstrap'
import DeleteButton from './DeleteButton';
import './MapMarkerCard.css';

const MapMarkerCard = props => {
  let formObject = props.form
  let ID = props.ID
  if(formObject.ImageID && ID && !formObject.speakerImgsrc){
    formObject.speakerImgsrc = `https://sahat.lamk.fi/public/${ID}/${formObject.ImageID}`
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
      formObject["speakerImgsrc"] = URL.createObjectURL(e.target.files[0])
    }
  }

  let jotain;

  if (props.markerType == "restaurant"){
    secondRow =
    <Row>
      <Col>
        <FormGroup>
          <FormLabel>Description</FormLabel>
          <FormControl as="textarea" size="sm" value={formObject.Description} onChange={(e) => {changeHandler(e)}} name="Description"></FormControl>
        </FormGroup>
      </Col>
      <Col>
        <FormGroup>
          <FormLabel>Category</FormLabel>
          <FormControl size="sm" value={formObject.Category} onChange={(e) => {changeHandler(e)}} name="Category"></FormControl>
        </FormGroup>
      </Col>
      <Col>
        <FormGroup>
          <FormLabel>Rating</FormLabel>
          <FormControl size="sm" value={formObject.Rating} onChange={(e) => {changeHandler(e)}} name="Rating"></FormControl>
        </FormGroup>
      </Col>
      <Col>
        <FormGroup>
          <FormLabel>Web url</FormLabel>
          <FormControl size="sm" value={formObject.WebURL} onChange={(e) => {changeHandler(e)}} name="WebURL"></FormControl>
        </FormGroup>
      </Col>
    </Row>
  }
  else if (props.markerType == "hotel"){
    secondRow =
    <Row>
      <Col>
        <FormGroup>
          <FormLabel>Description</FormLabel>
          <FormControl as="textarea" size="sm" value={formObject.Description} onChange={(e) => {changeHandler(e)}} name="Description"></FormControl>
        </FormGroup>
      </Col>
      <Col>
        <FormGroup>
          <FormLabel>Rating</FormLabel>
          <FormControl size="sm" value={formObject.Rating} onChange={(e) => {changeHandler(e)}} name="Rating"></FormControl>
        </FormGroup>
      </Col>
      <Col>
        <FormGroup>
          <FormLabel>Web url</FormLabel>
          <FormControl size="sm" value={formObject.WebURL} onChange={(e) => {changeHandler(e)}} name="WebURL"></FormControl>
        </FormGroup>
      </Col>
    </Row>
  }
  else if (props.markerType == "other"){
    secondRow = 
    <Row>
      <Col>
        <FormGroup>
          <FormLabel>Description</FormLabel>
          <FormControl as="textarea" size="sm" value={formObject.Description} onChange={(e) => {changeHandler(e)}} name="Description"></FormControl>
        </FormGroup>
      </Col>
      <Col>
        <FormGroup>
          <FormLabel>Category</FormLabel>
          <FormControl size="sm" value={formObject.Category} onChange={(e) => {changeHandler(e)}} name="Category"></FormControl>
        </FormGroup>
      </Col>
      <Col>
        <FormGroup>
          <FormLabel>Web URL</FormLabel>
          <FormControl size="sm" value={formObject.WebURL} onChange={(e) => {changeHandler(e)}} name="WebURL"></FormControl>
        </FormGroup>
      </Col>
    </Row>
  }

  //Kuvat https://sahat.lamk.fi/public/{EventID}/{FileName}
  return (
    
    <Card>
      <Form>
        <FormGroup className="file">
          <FormLabel><Image className="filePrev" src={formObject.speakerImgsrc}/></FormLabel>
          <label htmlFor={'hidden-'+props.index} id="lableForHidden">Choose file</label>
          <FormControl size="sm" onChange={(e) => {changeHandler(e); fileHandler(e); changeImage(e)}} id={'hidden-'+props.index} className="hidden" type='file' name="ImageID"></FormControl>
          {/* <Form.File size="sm" onChange={(e) => {changeHandler(e); fileHandler(e); changeImage(e)}} name="ImageID"/> */}
        </FormGroup>
        <Row>
          <Col>
            <FormGroup>
              <FormLabel>Latitude</FormLabel>
              <FormControl size="sm" value={formObject.Latitude} onChange={(e) => {changeHandler(e)}} name="Latitude"></FormControl>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <FormLabel>Longitude</FormLabel>
              <FormControl size="sm" value={formObject.Longitude} onChange={(e) => {changeHandler(e)}} name="Longitude"></FormControl>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <FormLabel>Name</FormLabel>
              <FormControl size="sm" value={formObject.Name} onChange={(e) => {changeHandler(e)}} name="Name"></FormControl>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <FormLabel>Address</FormLabel>
              <FormControl size="sm" value={formObject.Address} onChange={(e) => {changeHandler(e)}} name="Address"></FormControl>
            </FormGroup>
          </Col>
        </Row>
        {secondRow}
      </Form>
      <DeleteButton onClick={deleteHandler}></DeleteButton>
    </Card>
  )
}

export default MapMarkerCard;