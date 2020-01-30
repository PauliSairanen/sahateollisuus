import React from 'react';
import { Jumbotron } from 'reactstrap';
import './App.css';

// Componenets imports

import EditingNavi from './assets/components/editingnavi/EditingNavi';
import EventMaterials from './assets/components/eventmaterials/EventMaterials';
import EventsNavi from './assets/components/eventsnavi/EventsNavi';
import Info from './assets/components/info/InfoEdit';
import Login from './assets/components/login/Login';
import FormParticipant from './assets/components/participants/FormParticipant';
import FormSpeaker from './assets/components/speakers/FormSpeaker';
import FormSponsor from './assets/components/sponsors/FormSponsor';

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
        </Jumbotron>
      </div>
    );

  }

};