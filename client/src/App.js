import React, { Component } from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt,faChalkboardTeacher,faReply } from '@fortawesome/free-solid-svg-icons'

library.add(faPencilAlt);
library.add(faChalkboardTeacher);
library.add(faReply);

const start_mode = 0;
const edit_mode = 1;
const quiz_mode = 2;

class App extends Component {

  constructor() {
    super();
    this.state = {
      mode: start_mode
    }
  }

  edit_mode () { this.setState({mode: edit_mode}); }
  quiz_mode () { this.setState({mode: quiz_mode}); }
  start_mode () { this.setState({mode: start_mode}); }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Kanji Quiz by Mel Nicholson
          </p>
        </header>
        <body>
          {
            this.state.mode === start_mode ? (
              <div>
                <button onClick={() => this.edit_mode()}><FontAwesomeIcon icon="pencil-alt" size = "8x" /></button>
                <button onClick={() => this.quiz_mode()}><FontAwesomeIcon icon="chalkboard-teacher" size = "8x" /></button>
              </div>
            ) : (this.state.mode === edit_mode) ? (
              <div>
                <button className="topLeft" onClick={() => this.start_mode()}><FontAwesomeIcon icon="reply" size = "4x" /></button>
                <EditScreen />
              </div>
            ) : (
              <div>
                <button className="topLeft" onClick={() => this.start_mode()}><FontAwesomeIcon icon="reply" size = "4x" /></button>
                <QuizScreen />
              </div>
            )
          }
        </body>
      </div>
    );
  }
}

class EditScreen extends Component {
  constructor() {
    super();
    this.state = {
      lesson: 1
    }
  }

  newLesson(event) {
    var val = parseInt(event.target.value);
    if (!isNaN(val)) { this.setState({lesson: val}); }
  }

  render() {
    return (<div>
      <div> Lesson <input
        type="text" placeholder={this.props.lesson} size="3"
        value={this.props.lesson} onInput={(event)=>{this.newLesson(event)}}
      / ></div>
      <div>Editing lesson {this.state.lesson}</div>
      <p>Table goes here</p>
    </div>);
  }
}

class QuizScreen extends Component {
  render () {
    return (
      <p>Quizzy stuff goes here </p>
    );
  }
}

export default App;
