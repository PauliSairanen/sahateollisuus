import React, {useEffect, useState} from 'react'
import {Card, FormGroup, FormLabel, FormControl, FormText, OverlayTrigger, Tooltip, Button} from 'react-bootstrap'
import {Form} from 'react-bootstrap'
import {Row, Col} from 'react-bootstrap'
import {Image} from 'react-bootstrap'
import './GeneralCard.css'
import axios from 'axios'
import AddLocationIcon from '@material-ui/icons/AddLocation';

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
    console.log(e)
  }

  const [ErrorMsg, setErrorMsg] = useState("")
  async function geocodeHandler(){
    setErrorMsg("")
    if(props.FO && props.FO.address){
      let query = (props.FO.address).toString().replace(" ", "%20")
      let apiurl = `https://nominatim.openstreetmap.org/search/${query}?format=json&limit=1`
      await axios.get(apiurl)
      .then(function (res) {
        // data[props.index]["lat"] = res.data[0].lat;
        // data[props.index]["long"] = res.data[0].lon;
        //props.appendForm("lat", res.data[0].lat)
        //props.appendForm("long", res.data[0].lon)
        props.latlongForm(res.data[0].lat, res.data[0].lon)
      })
      .catch(function (error) {
        console.log(error)
        setErrorMsg("Unable to find lat and long")
      })
    }
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
                  <FormLabel>Address</FormLabel>
                  <OverlayTrigger 
                    placement="bottom" 
                    delay={{show: 250, hide: 250}}
                    overlay={<Tooltip>Street address, Postcode and City. Example: "Mukkulankatu 19, 15210 Lahti"</Tooltip>}
                    >
                  <FormControl size="sm" defaultValue={formObject.address} onChange={(e)=> props.editForm(e)} name="address"></FormControl>
                  </OverlayTrigger>
                  <FormText className="text-danger">{ErrorMsg}</FormText>
                </FormGroup>
              </Col>
              <Col sm={1}>
                <br></br>
                <OverlayTrigger
                  placement="bottom"
                  delay={{show: 250, hide: 250}}
                  overlay={<Tooltip>Converts address to latitude and longitude. Resulting values can be inaccurate and require checking.</Tooltip>}
                  >
                <Button className="latlongButtons" onClick={geocodeHandler}><AddLocationIcon/></Button>
                </OverlayTrigger>
              </Col>
              <Col sm={3}>
                <FormGroup>
                  <FormLabel>Latitude</FormLabel>
                  <FormControl size="sm" defaultValue={formObject.lat} onChange={(e)=> props.editForm(e)} name="lat"></FormControl>
                  <FormText>Required</FormText>
                </FormGroup>
              </Col>
              <Col sm={3}>
                <FormGroup>
                  <FormLabel>Longitude</FormLabel>
                  <FormControl size="sm" defaultValue={formObject.long} onChange={(e)=> props.editForm(e)} name="long"></FormControl>
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
              <OverlayTrigger 
                placement="bottom" 
                delay={{show: 250, hide: 250}}
                overlay={<Tooltip>Image size: 1080px</Tooltip>}
                >
              <label htmlFor={'hidden'} className="labelForHidden">Choose image</label>
              </OverlayTrigger>
            <FormControl size="sm" onChange={(e)=>{fileHandler(e); changeImage(e); props.editForm(e);}} id={'hidden'} className="hidden" type='file' name="eventImage"></FormControl>
        </div>
      </div>
      <label>Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright</label>
    </Card>
  )
}

export default GeneralCard;