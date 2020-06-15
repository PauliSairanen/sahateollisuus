import React, {useState} from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import FormTable from '../components/FormTable'
import axios from 'axios';

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
            "webURL": "",
            "image": "",
            "rating": ""
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
            "webURL": "",
            "image": "",
            "type": ""
        }
    ]
}
*/
const MapMarkerForm = (props) =>{
    const [Form, setForm] = useState(props.subForm)
    const [ActiveForm, setActiveForm] = useState()
    const keys = [
        "Marker Category",
        "Latitude",
        "Longitude",
        "Name",
        "Address",
        "Description",
        "WebURL",
        "(Restaurant) category",
        "(Hotel) rating",
        "(Other) type",
        "Image"
    ]

    function clickHandler(e){
        e.preventDefault(); //prevents page refresh
        let i;
        let marker = {}
        for(i = 0; i < e.target.form.length - 1; i++){
            marker[e.target.form[i].name] = e.target.form[i].value.match(/[^\\/]*$/)[0]
        }
        Form[ActiveForm].push(marker)
        // console.log(Form[ActiveForm])
        
        // let form = Form;
        
        // //Todo, Form data to json

        document.getElementById("form").reset();
        setForm(Form)
        props.editForm("mapmarkers", Form)
    }
    function dataToForm(data){
        let newForm = {
            restaurant: [],
            hotel: [],
            other: []
        }
        for(let item in data){
            let newObj = {}
            let destination;
            for(let key in data[item]){
                if(key === "markcat"){
                    destination = data[item][key]
                }
                else{
                    console.log(data[item][key], key)
                    newObj[key] = data[item][key]
                }
                
            }
            console.log(newObj)
            newForm[destination].push(newObj)
        }
        console.log(newForm)
        setForm(newForm)
        props.editForm("mapmarkers", newForm)
    }
    let container;
    if(ActiveForm === "restaurant"){
        container = 
        <>
            <input type="text" name="lat" id="lat" placeholder="Latitude"/>
            <input type="text" name="lng" id="lng" placeholder="Longitude"/>
            <input type="text" name="name" placeholder="Name"/>
            <input type="text" name="address" id="address" placeholder="Address"/>
            <input type="text" name="description" placeholder="Description"/>
            <input type="text" name="category" placeholder="Category"/>
            <input type="text" name="webURL" placeholder="Website URL"/>
            <input type="file" name="image" onChange={(e)=>{props.fileToUpload(e)}}/>
            <button onClick={clickHandler}>Add Restaurant Map Marker</button>
        </>

    }
    else if(ActiveForm === "hotel"){
        container =
        <>
            <input type="text" name="lat" id="lat" placeholder="Latitude"/>
            <input type="text" name="lng" id="lng" placeholder="Longitude"/>
            <input type="text" name="name" placeholder="Name"/>
            <input type="text" name="address" id="address" placeholder="Address"/>
            <input type="text" name="description" placeholder="Description"/>
            <input type="text" name="rating" placeholder="Rating"/>
            <input type="text" name="webURL" placeholder="Website URL"/>
            <input type="file" name="image" onChange={(e)=>{props.fileToUpload(e)}}/>
            <button onClick={clickHandler}>Add Hotel Map Marker</button>
        
        </>

    }
    else if(ActiveForm === "other"){
        container = 
        <>
            <input type="text" name="lat" id="lat" placeholder="Latitude"/>
            <input type="text" name="lng" id="lng" placeholder="Longitude"/>
            <input type="text" name="name" placeholder="Name"/>
            <input type="text" name="address" id="address" placeholder="Address"/>
            <input type="text" name="description" placeholder="Description"/>
            <input type="text" name="type" placeholder="Type"/>
            <input type="text" name="webURL" placeholder="Website URL"/>
            <input type="file" name="image" onChange={(e)=>{props.fileToUpload(e)}}/>
            <button onClick={clickHandler}>Add Other Map Marker</button>
        
        </>

    }
    else{
        container = null;
    }
    return(
        <>
        <Dropdown>
        <Dropdown.Toggle>
            Marker Categories
        </Dropdown.Toggle>
        <Dropdown.Menu>
            <Dropdown.Item href="#" onClick={(e)=>{setActiveForm(e.target.name); document.getElementById("form").reset();}} name="restaurant">Restaurant</Dropdown.Item>
            <Dropdown.Item href="#" onClick={(e)=>{setActiveForm(e.target.name); document.getElementById("form").reset();}} name="hotel">Hotel</Dropdown.Item>
            <Dropdown.Item href="#" onClick={(e)=>{setActiveForm(e.target.name); document.getElementById("form").reset();}} name="other">Other</Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
        {container ? <Nominatim/> : null}
        <form id="form" autoComplete="off">
            {container}
        </form>
        {Form.restaurant.length > 0 || Form.hotel.length > 0 || Form.other.length > 0 ? 
            <FormTable 
                form={Form} 
                setForm={(data)=>{dataToForm(data)}} 
                keys={keys}
                mapMarkers={true}
                fileToUpload={(e)=>{props.fileToUpload(e)}}
            /> : 
        null}
        </>
    )
}

//OpenStreetMap Geocoding
const Nominatim = (props) => {
    const [Msg, setMsg] = useState()
    let query = "";
    let apiurl = `https://nominatim.openstreetmap.org/search/${query}?format=json&limit=1`
    async function clickHandler(e){
        e.preventDefault(); //prevents page refresh
        //document.getElementById("lat").value = ""
        //console.log(e.target.form[0].value)
        query = e.target.form[0].value
        if(query){
            console.log("query is set")
            //console.log(query)
            let modquery = query.replace(" ","%20")
            //console.log("query modified")
            //console.log(query)
            apiurl = `https://nominatim.openstreetmap.org/search/${modquery}?format=json&limit=1`
            //console.log(apiurl)
            axios.get(apiurl)
            .then(function (res) {
                //console.log(res.data);
                document.getElementById("lat").value = res.data[0].lat;
                document.getElementById("lng").value = res.data[0].lon;
                document.getElementById("address").value = query
            })
            .catch(function (error) {
                //console.log(error);
                setMsg(error)
            })
        }
        else{
            console.log("query is not set")
        }
    }
    return(
        <>
        <form>
            <input type="text" placeholder="Address"/>
            <button onClick={clickHandler}>Get lat and lng</button>
            <label>Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright</label>
            {Msg}
        </form>
        </>
    )
}
export default MapMarkerForm