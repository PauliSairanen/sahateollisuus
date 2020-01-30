import React from 'react';
import { Jumbotron } from 'reactstrap';
import './App.css';

export default class App extends React.Component {

  // Tästä kaikki alkaa

  render() {

    // Support library for legacy browsers - added to public/index.html
    // add this to not trigger eslint no-undef
    /* global Modernizr */
    console.log(Modernizr);
    // do your checking with Modernizr
    if (Modernizr.awesomeNewFeature) {
      // do your stuff here
    } 

    return (
      <div>
        <Jumbotron>
          <FormLogin />
          <br />
        </Jumbotron>
      </div>
    );

  }

};
class FormLogin extends React.Component {

  // Tämä pitää saada ensimmäisenä toimimaan https://react-hook-form.com/

	render() {
  	return (
    	<form autocomplete="off">
        <div class="centered">
          <div id="formLogin">
            <input 
              type="text" 
              placeholder="Login" 
              required 
            />
          </div>
          <div id="formPw">
            <input 
              type="text" 
              placeholder="Password" 
              required 
            />
          </div>
          <div id="btnLogin">
            <input type="submit" value="Login"></input>
          </div>
          <br/>
        </div>
    	  
    	</form>
    );
  }
}

class FormParticipant extends React.Component {

  // Tämä pitää saada heti toisena toimimaan

  render() {
    return (
      <div>
        <h1>Create or modify event participant data:</h1>
        Form, johon voi myös ladata tietokannasta arvot:
        Nimi: etu (required), suku (required) ja toinen nimi
        sähköposti (array, required)
        puhelinnumero (array, required, muodon pakotus)
        firma
        osallistuu aterialle (checkbox ja ruokarajoitukset)

        Dropbox, johon voi pudottaa Excelin (Excelin poistaminen, vaihtaminen)
      </div>
    )
  }
}

// Nämä loput voi toistaiseksi jättää tekemättä

class FormSponsors extends React.Component {

  render() {
    return (
      <div>
        <h1>Create and modify event sponsor data:</h1>
        Form, johon voi myös ladata tietokannasta arvot:
        nettiosoite
        sähköposti

        Tekstieditori, johon voi kirjoittaa tai kopioida esittelyn

        Dropbox, johon voi pudottaa logon (kuva x1080px, kuvan poistaminen/vaihtaminen)

        taustavärin muokkaustyökalu
      </div>
    )
  }

}

class FormSpeakers extends React.Component {

  render() {
    return (
      <div>
        <h1>Create and modify event speaker data:</h1>
        Form, johon voi myös ladata tietokannasta arvot:
        Nimi: etu (required), suku (required) ja toinen nimi
        rooli/asema (agentti/toimitusjohtaja tms)
        firma

        Tekstieditori, johon voi kirjoittaa tai kopioida esittelyn

        Dropbox, johon voi pudottaa logon (kuva x1080px, kuvan poistaminen/vaihtaminen)
        Dropbox, johon voi pudottaa puhujan materiaalit (materiaalien poistaminen/vaihtaminen)

        ViewPresentation, johon liitetään ViewPresentation-luokan sisältö

      </div>
    )
  }

}

class ImagesVenue extends React.Component {

  render() {
    return (
      <div>
        <h1>Create and modify event venue data:</h1>
        Dropbox, johon voi pudottaa kuvan (kuvan poistaminen/vaihtaminen)
        Form, johon voi myös ladata tietokannasta arvot:
        kuvan otsikko
        kuvan esitysjärjestyksen numero
      </div>
    )
  }

}

class DataMaps extends React.Component {

  render() {
    return (
      <div>
        <h1>Create and modify event maps data:</h1>
        Form, johon voi myös ladata tietokannasta arvot: 
        (näistä kaikista ehkä omat luokat ja venue menee samaan luokkaan venuen kuvien lisäämisen kanssa)

        Ravintola:
        sähköposti
        nettiosoite
        osoitetiedot
        avoinnaolotiedot
        tyyppitiedot (pieni esittely, ehkä tarvii tekstieditorin taas, ehkä halutaan liittää kuvakin)

        Venue:
        sähköposti
        nettiosoite
        osoitetiedot
        avoinnaolotiedot
        tyyppitiedot (pieni esittely, ehkä tarvii tekstieditorin taas, ehkä halutaan liittää kuvakin)

        Hotellit:
        sähköposti
        nettiosoite
        osoitetiedot
        avoinnaolotiedot
        tyyppitiedot (pieni esittely, ehkä tarvii tekstieditorin taas, ehkä halutaan liittää kuvakin)
      </div>
    )
  }

}

class EditorInfo extends React.Component {

  render() {
    return(
      <div>
        <h1>Create and modify event info data:</h1>
        Tekstieditori
      </div>
    )
  }

}

class EventMaterials extends React.Component {

  render() {
    return (
      <div>
        <h1>Create and modify general materials:</h1>
        Dropbox, johon voi pudottaa materiaalit (materiaalien poistaminen/vaihtaminen)
      </div>
    );
  }

}

class Feedback extends React.Component {

  render() {
    return (
      <div>
        <h1>Feedback for the event manager:</h1>
          sisältää jotain
      </div>
    );
  }

}

class ListEvents extends React.Component {
  render() {
    return (
      <div>
        <h1>Create an event or modify an existing:</h1>
      </div>
    );
  }
}

class FormPresenter extends React.Component {
  render() {
    return (
      <div>
        <h1>Create or modify presenter data:</h1>
      </div>
    )
  }
}

class FormScheduleEntry extends React.Component {
  render() {
    return (
      <div>
        <h1>Create or modify a schedule entry:</h1>
      </div>
    )
  }
}

class DropBox extends React.Component {

}

class DateTimeEditor extends React.Component {
  
}

class TextEditor extends React.Component {
  
}

class DatabaseAccess extends React.Component {

}