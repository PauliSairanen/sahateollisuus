import React, {useEffect} from 'react'
import {Card, FormGroup, FormLabel, FormControl, FormText} from 'react-bootstrap'
import {Form} from 'react-bootstrap'
import {Row, Col} from 'react-bootstrap'
import {Image} from 'react-bootstrap'
import './GeneralCard.css';

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
      <Form onChange={(e)=> props.editForm(e)}>
        <FormGroup className="file">
          <FormLabel><Image className="filePrev" src={formObject.generalImgsrc} fluid onError={errorHandler}/></FormLabel>
          <label htmlFor={'hidden'} className="labelForHidden">Choose file</label>
          <FormControl size="sm" onChange={(e)=>{fileHandler(e); changeImage(e)}} id={'hidden'} className="hidden" type='file' name="eventImage"></FormControl>
        </FormGroup>
        <Row>
          <Col>
            <FormGroup>
              <FormLabel>Event name</FormLabel>
              <FormControl size="sm" name="eventName" defaultValue={formObject.eventName}></FormControl>
              <FormText>Required</FormText>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <FormLabel>Event password</FormLabel>
              <FormControl size="sm" name="eventPass" defaultValue={formObject.eventPass}></FormControl>
              <FormText>Required</FormText>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <FormLabel>Event color scheme</FormLabel>
              <FormControl size="sm" maxLength="7" name="eventColor" defaultValue={formObject.eventColor}></FormControl>
            </FormGroup>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Event visiblity</Form.Label>
              <Form.Check className="checkbox" type={'radio'} name="visibility" label={'visible'} value="visible" defaultChecked={props.FO.visibility == "visible" ? true : false}/> {/*eslint-disable-line*/}
              <Form.Check className="checkbox" type={'radio'} name="visibility" label={'hidden'} value="hidden" defaultChecked={props.FO.visibility == "hidden" ? true : false}/> {/*eslint-disable-line*/}
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Card>
  )
}

export default GeneralCard;