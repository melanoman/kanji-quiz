import React, { Component } from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt,faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons'

library.add(faPencilAlt);
library.add(faChalkboardTeacher);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Kanji Quiz by Mel Nicholson
          </p>
        </header>
        <body>
          <button><FontAwesomeIcon icon="pencil-alt" size = "8x" /></button>
          <button><FontAwesomeIcon icon="chalkboard-teacher" size = "8x" /></button>
        </body>
      </div>
    );
  }
}

export default App;
