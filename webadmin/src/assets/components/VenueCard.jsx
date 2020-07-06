import React, {useEffect} from 'react'
import {Card, FormGroup, FormLabel, FormControl, OverlayTrigger, Tooltip} from 'react-bootstrap'
import {Form} from 'react-bootstrap'
import {Row, Col} from 'react-bootstrap'
import {Image} from 'react-bootstrap'
import DeleteButton from './DeleteButton';
import './VenueCard.css';

const VenueCard = props => {
  let formObject = props.form

  if(formObject.image && props.ID && !formObject.venueImgsrc){
    formObject.venueImgsrc = `https://sahat.lamk.fi/public/${props.ID}/${formObject.image}`
  }
  useEffect(() => {
    //console.log(ImgSrc)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    formObject = props.form
  })
  function changeHandler(e){
    let data = props.data;
    data = data.slice(0).reverse()
    if(e.target.type === "file"){
      data[props.index][e.target.name] = e.target.value.match(/[^\\/]*$/)[0]
    }
    else{
      data[props.index][e.target.name] = e.target.value
    }
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
      formObject["venueImgsrc"] = URL.createObjectURL(e.target.files[0])
    }
  }
  //Kuvat https://sahat.lamk.fi/public/{EventID}/{FileName}
  return (
    
    <Card>
      <div className="wrapper">
        <div className="bigDiv">
          <Form>
            <Row>
              <Col>
                <FormGroup>
                  <FormLabel>Title of the Map</FormLabel>
                  <OverlayTrigger 
                    placement="bottom" 
                    delay={{show: 250, hide: 250}}
                    overlay={<Tooltip>Short name for the map. Example: "1. Floor", "2. Floor"</Tooltip>}
                    >
                  <FormControl size="sm" value={formObject.title} onChange={(e) => {changeHandler(e)}} name="title"></FormControl>
                  </OverlayTrigger>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </div>
        <div className="smallDiv">
          <FormLabel><Image className="filePrev" src={formObject.venueImgsrc} fluid/></FormLabel>
          <label htmlFor={'hidden-'+props.index} className="labelForHidden">Choose image</label>
          <FormControl size="sm" onChange={(e) => {changeHandler(e); fileHandler(e); changeImage(e)}} id={'hidden-'+props.index} className="hidden" type='file' name="image"></FormControl>
            {/* <Form.File size="sm" onChange={(e) => {changeHandler(e); fileHandler(e); changeImage(e)}} name="ImageID"/> */}
        </div>
      </div>
      {/* <Button className="deleteButton" onClick={deleteFunction}>
        <span className="deleteButtonText">-</span>
      </Button> */}
      <DeleteButton onClick={deleteHandler}></DeleteButton>
    </Card>
  )
}

export default VenueCard;