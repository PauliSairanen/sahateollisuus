import React from 'react';
import {Card, FormGroup, FormLabel, FormControl} from 'react-bootstrap'
import {Form} from 'react-bootstrap'
import {Row, Col} from 'react-bootstrap'
import {Image} from 'react-bootstrap'
import { useEffect } from 'react';
import DeleteButton from './DeleteButton';
import './SponsorCard.css';


const SponsorCard = props => {
  let formObject = props.form

  if(formObject.ImageID && props.ID && !formObject.sponsorImgsrc){
    formObject.sponsorImgsrc = `https://sahat.lamk.fi/public/${props.ID}/${formObject.ImageID}`
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
      formObject["sponsorImgsrc"] = URL.createObjectURL(e.target.files[0])
    }
  }
  return (
    <Card>
      <Form>
        <FormGroup className="file">
          <FormLabel><Image className="filePrev" src={formObject.sponsorImgsrc}/></FormLabel>
          <label htmlFor={'hidden-'+props.index} id="lableForHidden">Choose file</label>
          <FormControl className="hidden" name="ImageID" onChange={(e) => {changeHandler(e); fileHandler(e); changeImage(e)}} type='file' id={'hidden-'+props.index}/>
        </FormGroup>
        <Row>
          <Col>
            <FormGroup>
              <FormLabel>Name of company</FormLabel>
              <FormControl value={formObject.CompanyName} name="CompanyName" onChange={(e) => changeHandler(e)} placeholder="Name of company"></FormControl>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <FormLabel>Url of company</FormLabel>
              <FormControl value={formObject.CompanyUrl} name="CompanyUrl" onChange={(e) => changeHandler(e)} placeholder="Url of company"></FormControl>
            </FormGroup>
          </Col>
        </Row>
      </Form>
      <DeleteButton onClick={deleteHandler}/>
    </Card>
  )
}

export default SponsorCard;