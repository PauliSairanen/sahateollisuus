import React, {useEffect} from 'react'
import {Card, FormGroup, FormLabel, FormControl, FormText} from 'react-bootstrap'
import {Form} from 'react-bootstrap'
import {Row, Col} from 'react-bootstrap'
import {Image} from 'react-bootstrap'
import {OverlayTrigger, Tooltip} from 'react-bootstrap'
import './GeneralCard.css'

const GeneralCard = props => {
  let formObject = props.FO

  if(formObject.eventImage && props.ID && !formObject.generalImgsrc){
    formObject.generalImgsrc = `https://sahat.lamk.fi/public/${props.ID}/${formObject.eventImage}`
    if((formObject.eventImage).includes("https://")){
      formObject.generalImgsrc = formObject.eventImage
    }
  }
  useEffect(() => {
    //console.log(ImgSrc)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    formObject = props.form
  })
  function fileHandler(e){
    props.fileToUpload(e)
  }
  function changeImage(e) {
    formObject = props.FO
    
    if (e.target.files && e.target.files[0]) {
      //setImgSrc(URL.createObjectURL(e.target.files[0]))
      formObject["generalImgsrc"] = URL.createObjectURL(e.target.files[0])
    }
  }
  function errorHandler(e){

  }
  //Kuvat https://sahat.lamk.fi/public/{EventID}/{FileName}
  return (
    <Card>
      <div className="wrapper">
        <div className="bigDiv">
          <Form onChange={(e)=> props.editForm(e)}>
            <Row>
              <Col>
                <FormGroup>
                  <FormLabel>Event Name</FormLabel>
                  <FormControl size="sm" name="eventName" defaultValue={formObject.eventName}></FormControl>
                  <FormText>Required</FormText>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <FormLabel>Event Password</FormLabel>
                  <FormControl size="sm" name="eventPass" defaultValue={formObject.eventPass}></FormControl>
                  <FormText>Required</FormText>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <FormLabel>Event Color Scheme</FormLabel>
                  <OverlayTrigger 
                  placement="bottom" 
                  delay={{show: 250, hide: 250}}
                  overlay={<Tooltip>Hexadecimal Value. Example: "#FFFFFF"</Tooltip>}
                  >
                    <FormControl size="sm" maxLength="7" name="eventColor" defaultValue={formObject.eventColor}></FormControl>
                  </OverlayTrigger>
                </FormGroup>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Event Visiblity</Form.Label>
                  <Form.Check className="checkbox" type={'radio'} name="visibility" label={'visible'} value="visible" onChange={()=>{}} checked={props.FO.visibility == "visible" ? true : false}/> {/*eslint-disable-line*/}
                  <Form.Check className="checkbox" type={'radio'} name="visibility" label={'hidden'} value="hidden" onChange={()=>{}} checked={props.FO.visibility == "hidden" ? true : false}/> {/*eslint-disable-line*/}
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </div>
        <div className="smallDiv">
            <FormLabel><Image className="filePrev" src={formObject.generalImgsrc} fluid onError={errorHandler}/></FormLabel>
              <label htmlFor={'hidden'} className="labelForHidden">Choose image</label>
            <FormControl size="sm" onChange={(e)=>{fileHandler(e); changeImage(e)}} id={'hidden'} className="hidden" type='file' name="eventImage"></FormControl>
        </div>
      </div>
    </Card>
  )
}

export default GeneralCard;