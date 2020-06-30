import React, {useState} from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
//import axios from 'axios';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import MapMarkerCard from './MapMarkerCard'
//import BsForm from 'react-bootstrap/Form'
import { Button, ButtonGroup } from 'react-bootstrap';

//import Overlay from 'react-bootstrap/Overlay'
//import Tooltip from 'react-bootstrap/Tooltip'
/*
"mapMarkers":
{
    "restaurant":
    [
        {
            "lat": "",
            "lng": "",
            "name": "",
            "address": "",
            "description": "",
            "category": "",
            "rating": "",
            "webURL": "",
            "image": ""
        }
    ],
    "hotel":
    [
        {
            "lat": "",
            "lng": "",
            "name": "",
            "address": "",
            "description": "",
            "rating": "",
            "webURL": "",
            "image": "",
        }
    ],
    "other":
    [
        {
            "lat": "",
            "lng": "",
            "name": "",
            "address": "",
            "description": "",
            "category": "",
            "webURL": "",
            "image": ""
        }
    ]
}
*/
const MapMarkerForm = (props) =>{
    const [Form, setForm] = useState(props.subForm ? props.subForm : 
        {
            restaurants: [],
            hotels: [],
            others: []
        })
    const [Data, setData] = useState(formToData(Form))

    function dataToForm(data){
        let newForm = {
            restaurants: [],
            hotels: [],
            others: []
        }
        for(let item in data){
            let newObj = {}
            let destination;
            for(let key in data[item]){
                if(key === "key"){
                    destination = data[item][key]
                }
                else{
                    newObj[key] = data[item][key]
                }
                
            }
            newForm[destination].push(newObj)
        }
        setForm(newForm)
        props.editForm("mapmarkers", newForm)
    }
    function formToData(form){
        let data = []
        //console.log(form)
        for(let key in form){
            for(let i in form[key]){
                //console.log(key, form[key][i])
                let item = form[key][i];
                item["key"] = key
                data.push(item)
            }
        }

        return data
    }
    function clickHandler(e){
        let newForm = Form;
        if(e.target.name === "restaurant"){
            newForm.restaurants.push({
                lat: "",
                long: "",
                name: "",
                address: "",
                description: "",
                category: "",
                rating: "",
                webURL: "",
                image: "",
            })
        }
        else if(e.target.name === "hotel"){
            newForm.hotels.push({
                lat: "",
                long: "",
                name: "",
                address: "",
                description: "",
                rating: "",
                webURL: "",
                image: "",
            })
        }
        else if(e.target.name === "other"){
            newForm.others.push({
                lat: "",
                long: "",
                name: "",
                address: "",
                description: "",
                category: "",
                webURL: "",
                image: "",
            })
        }
        else{

        }
        setForm(newForm)
        setData(formToData(newForm))
    }
    
    const [ActiveCat, setActiveCat] = useState(null)
    function catHandler(e){
        e.preventDefault();
        if(ActiveCat !== e.target.name){
            setActiveCat(e.target.name)
        }
        else{
            setActiveCat(null)
        }
    }

    let dataContainer = null;
    if(Data){
        dataContainer = Data.map((item, index)=>{
            //console.log(item.key)
            if(item.key === ActiveCat || ActiveCat === null){
                return(
                <MapMarkerCard 
                    key={index} 
                    index={index} 
                    form={item} 
                    data={Data} 
                    editForm={(data)=>dataToForm(data)}
                    ID={props.EditID}
                    markerType={item.key}  
                    fileToUpload={(e)=>props.fileToUpload(e)}
                />)
            }
            else{
                return null
            }
        })
    }

    return(
        <>
        {/* <Col className="cols" style={{display: 'flex', justifyContent: 'center'}}>
            <Dropdown style={{display: 'flex', flexWrap: 'wrap'}}>
                <Dropdown.Toggle>
                    Marker Categories
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="#" onClick={(e)=>{setActiveForm(e.target.name); document.getElementById("form").reset();}} name="restaurant">Restaurant</Dropdown.Item>
                    <Dropdown.Item href="#" onClick={(e)=>{setActiveForm(e.target.name); document.getElementById("form").reset();}} name="hotel">Hotel</Dropdown.Item>
                    <Dropdown.Item href="#" onClick={(e)=>{setActiveForm(e.target.name); document.getElementById("form").reset();}} name="other">Other</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Col> */}

        {/* <Card style={{width: '50rem'}}>
            <p>Geocoder</p>
            <Nominatim/>
        </Card> */}
        <Row>
            <Card className="cols" style={{width: '20rem', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                <Row>
                    <ButtonGroup style={{display: 'flex', flexWrap: 'wrap'}}>
                        <Button name="restaurants" onClick={catHandler}>Restaurants</Button>
                        <Button name="hotels" onClick={catHandler}>Hotels</Button>
                        <Button name="others" onClick={catHandler}>Others</Button>
                    </ButtonGroup>
                </Row>
                <Row>
                    <Dropdown style={{display: 'flex', flexWrap: 'wrap', marginTop: '10px'}}>
                        <Dropdown.Toggle>
                            Add Marker
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={(e)=>{clickHandler(e)}} name="restaurant">Restaurant</Dropdown.Item>
                            <Dropdown.Item onClick={(e)=>{clickHandler(e)}} name="hotel">Hotel</Dropdown.Item>
                            <Dropdown.Item onClick={(e)=>{clickHandler(e)}} name="other">Other</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Row>
            </Card>
        </Row>
        <Col>
            {dataContainer}
        </Col>
        </>
    )
}

//OpenStreetMap Geocoding
// const Nominatim = (props) => {
//     const [Address, setAddress] = useState()
//     const [Lat, setLat] = useState()
//     const [Lng, setLng] = useState()
//     const [Msg, setMsg] = useState()
//     const latref = useRef()
//     const lngref = useRef()

//     const [Show, setShow] = useState(false)
//     const [Target, setTarget] = useState()
//     let query = "";
//     let apiurl = `https://nominatim.openstreetmap.org/search/${query}?format=json&limit=1`
//     async function clickHandler(e){
//         setMsg(null)
//         e.preventDefault(); //prevents page refresh
//         //document.getElementById("lat").value = ""
//         //console.log(e.target.form[0].value)
//         query = Address
//         if(query){
//             console.log("query is set")
//             console.log(query)
//             let modquery = query.replace(" ","%20")
//             console.log("query modified")
//             console.log(modquery)
//             apiurl = `https://nominatim.openstreetmap.org/search/${modquery}?format=json&limit=1`
//             //console.log(apiurl)
//             axios.get(apiurl)
//             .then(function (res) {
//                 //console.log(res.data[0].lat, res.data[0].lon);
//                 setLat(res.data[0].lat)
//                 setLng(res.data[0].lon)
//                 // document.getElementById("lat").value = res.data[0].lat;
//                 // document.getElementById("lng").value = res.data[0].lon;
//                 // document.getElementById("address").value = query
//             })
//             .catch(function (error) {
//                 console.log(error);
//                 setMsg("Cannot find lat and lng of address")
//             })
//         }
//         else{
//             console.log("query is not set")
//         }
//     }
//     function sleep(ms) {
//         return new Promise(resolve => setTimeout(resolve, ms));
//     }
//     async function clipboard(e){
//         if(e.target.name === "lat"){
//             latref.current.select();
//             setTarget(latref)
//         }
//         else if(e.target.name === "lng"){
//             lngref.current.select();
//             setTarget(lngref)
//         }
//         else{
//             return null
//         }
//         setShow(true)
//         document.execCommand('copy');
//         await sleep(5000) // tooltip flickers if inputs are rapidly pressed. Too bad!
//         setShow(false)
//     }
//     return(
//         <>
//         {/* <form>
//             <input type="text" placeholder="Address"/>
//             <button onClick={clickHandler}>Get lat and lng</button>
//             <label>Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright</label>
//             {Msg}
//         </form> */}
//         <Row>
//             <Col>
//                 <BsForm>
//                     <BsForm.Group>
//                         <BsForm.Label>Address</BsForm.Label>
//                         <BsForm.Control type="text" onChange={e => {setAddress(e.target.value)}}/>
//                         <BsForm.Text className="text-muted">Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright</BsForm.Text>
//                     </BsForm.Group>
//                     <BsForm.Group>
//                         <Button onClick={clickHandler}>Get lat and lng</Button>
//                     </BsForm.Group>
//                 </BsForm>
//             </Col>
//             <Col>
//                 <Row>
//                     <Col>
//                         <BsForm.Group>
//                             <BsForm.Label>Latitude</BsForm.Label>
//                             <BsForm.Control ref={latref} type="text" name="lat" onClick={clipboard} value={Lat || ''} readOnly/>
//                             {Msg ? <BsForm.Text className="text-danger">{Msg}</BsForm.Text>:null}
//                         </BsForm.Group>
//                     </Col>
//                     <Col>
//                         <BsForm.Group>
//                             <BsForm.Label>Longitude</BsForm.Label>
//                             <BsForm.Control ref={lngref} type="text" name="lng" onClick={clipboard} value={Lng || ''} readOnly/>
//                         </BsForm.Group>
//                     </Col>
//                     <Overlay target={Target} show={Show} placement="bottom">
//                         {(props)=>(
//                             <Tooltip {...props}>
//                                 Copied to clipboard!
//                             </Tooltip>
//                         )}
//                     </Overlay>
//                 </Row>
//             </Col>
//         </Row>
//         </>
//     )
// }
export default MapMarkerForm