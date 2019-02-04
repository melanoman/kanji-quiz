import React, { Component } from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt,faChalkboardTeacher,faReply, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

library.add(faPencilAlt);
library.add(faChalkboardTeacher);
library.add(faReply);
library.add(faArrowLeft);
library.add(faArrowRight);

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
                <button className="inline" onClick={() => this.edit_mode()}><FontAwesomeIcon icon="pencil-alt" size = "8x" /></button>
                <button className="inline" onClick={() => this.quiz_mode()}><FontAwesomeIcon icon="chalkboard-teacher" size = "8x" /></button>
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
    if (!isNaN(val) && val > 0) { this.setState({lesson: val}); }
  }

  render() {
    return (<div>
      <LessonChooser parent={this} />
      <p>Table goes here</p>
    </div>);
  }
}

class LessonChooser extends Component {

  incr() {
    this.props.parent.setState({lesson: (this.props.parent.state.lesson + 1)});
  }
  decr(){
    if (this.props.parent.state.lesson > 1) {
      this.props.parent.setState({lesson: (this.props.parent.state.lesson - 1)});
    }
  }

  render() {
    return (<div>
      <button className="inline" onClick={()=>this.decr()}><FontAwesomeIcon icon="arrow-left" size = "4x" /></button>
      <span className="inline">
        <div>Lesson <input size="3" type="text"
           placeholder={this.props.parent.state.lesson}
           value={this.props.parent.state.lesson}
           onInput={(event)=>{this.props.parent.newLesson(event)}}
        / ></div>
        <div>Editing lesson {this.props.parent.state.lesson}</div>
      </span>
      <button className="inline" onClick={()=>this.incr()}><FontAwesomeIcon icon="arrow-right" size = "4x" /></button>
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
