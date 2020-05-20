//Component for handling event creation
import React from 'react'

const CreateEventForm = (props) => {
    const [Form, setForm] = useState({});
    const updateField = e => { //When form data is updated
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };
    async function clickHandler(e){ // When button is clicked

    }
    return (
        <div id="CEF">
            
        </div>
    )
}

export default CreateEventForm

/*
JSON payload:
{
        "eventPass": "eventin passu",
          "metadata": {
              "eventName": "eventin nimi", // required
              "eventImage": "Test"
          },
          "about": {
              "eventWebUrl": "Test",
              "eventPlace": {
                  "name": "Test",
                  "address": "Test",
                  "phone": "Test",
                  "email": "Test"
              },
              "title": "Test",
              "bodyText1": "Test",
              "bodyText2": "Test",
              "bodyText3": "Test",
              "bodyText4": "Test",
              "moreInformation": {
                  "eventWebsite": "Test",
                  "organizer": "Test",
                  "email": "Test"
              },
              "disclaimer1": "Test",
              "disclaimer2": "Test"
          },
          "participants": [
              {
                  "Country": "Test",
                  "FirstName": "Test",
                  "LastName": "Test",
                  "Email": "Test",
                  "Phone": "Test",
                  "Company": "Test"
              }
          ],
          "programme": [
              {
                  "Time": "Test",
                  "Location": "Test",
                  "Description": "Test",
                  "NameOfSpeaker": "Test",
                  "TitleOfSpeaker": "Test",
                  "SpecialTitleOfSpeaker": "Test",
                  "CompanyOfSpeaker": "Test"
              }
          ],
          "speakers": [
              {
                  "Speaker": "Test",
                  "Title": "Test",
                  "SpecialTitle": "Test",
                  "Company": "Test",
                  "ImageID": "Test"
              }
          ],
          "sponsors": [
              {
                  "CompanyName": "Test",
                  "CompanyUrl": "Test",
                  "ImageID": "Test"
              }
          ]
      }
*/