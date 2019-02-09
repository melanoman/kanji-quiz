import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt,faChalkboardTeacher,faReply, faCaretLeft, faCaretRight, faCaretUp, faCaretDown }
  from '@fortawesome/free-solid-svg-icons'

library.add(faPencilAlt);
library.add(faChalkboardTeacher);
library.add(faReply);
library.add(faCaretLeft);
library.add(faCaretRight);
library.add(faCaretUp);
library.add(faCaretDown);

var server = axios.create({
  baseURL: 'http://localhost:3123/',
  timeout: 10000,
});

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
        <div>
          {
            this.state.mode === start_mode ? (
              <div className="center">
                <button className="inline" onClick={() => this.edit_mode()}><FontAwesomeIcon icon="pencil-alt" size = "8x" /></button>
                <button className="inline" onClick={() => this.quiz_mode()}><FontAwesomeIcon icon="chalkboard-teacher" size = "8x" /></button>
              </div>
            ) : (this.state.mode === edit_mode) ? (
              <div>
                <button onClick={() => this.start_mode()}><FontAwesomeIcon icon="reply" size = "4x" /></button>
                <EditScreen />
              </div>
            ) : (
              <div>
                <button onClick={() => this.start_mode()}><FontAwesomeIcon icon="reply" size = "4x" /></button>
                <QuizScreen />
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

class EditScreen extends Component {
  constructor() {
    super();
    this.state = {
      lesson: 1,
      live: false
    }
  }

  newLesson(event) {
    var val = parseInt(event.target.value);
    if (!isNaN(val) && val > 0) { this.setState({lesson: val, live: false}); }
  }

  showTable() {
    this.setState({ live: true });
  }

  hideTable() {
    this.setState({ live: false });
  }

  render() {
    return (<div className="center">
      <LessonChooser parent={this} />
      { (this.state.live === false) ?
        <button onClick={()=>this.showTable()}><FontAwesomeIcon icon="caret-down" size="2x" /><FontAwesomeIcon icon="caret-down" size="2x" /><FontAwesomeIcon icon="caret-down" size="2x" /><FontAwesomeIcon icon="caret-down" size="2x" /><FontAwesomeIcon icon="caret-down" size="2x" /></button> :
        <button onClick={()=>this.hideTable()}><FontAwesomeIcon icon="caret-up" size="2x" /><FontAwesomeIcon icon="caret-up" size="2x" /><FontAwesomeIcon icon="caret-up" size="2x" /><FontAwesomeIcon icon="caret-up" size="2x" /><FontAwesomeIcon icon="caret-up" size="2x" /></button>
      }
      <LessonTable parent={this} />
    </div>);
  }
}

class LessonChooser extends Component {

  incr() {
    this.props.parent.setState({lesson: (this.props.parent.state.lesson + 1), live: false });
  }
  decr(){
    if (this.props.parent.state.lesson > 1) {
      this.props.parent.setState({lesson: (this.props.parent.state.lesson - 1), live: false });
    }
  }

  render() {
    return (<div>
      <button className="inline" onClick={()=>this.decr()}><FontAwesomeIcon icon="caret-left" size = "2x" /></button>
      <span className="inline">
        <div><input size="3" type="text"
           placeholder={this.props.parent.state.lesson}
           onInput={(event)=>{this.props.parent.newLesson(event)}}
        / ></div>
      </span>
      <button className="inline" onClick={()=>this.incr()}><FontAwesomeIcon icon="caret-right" size = "2x" /></button>
    </div>);
  }
}

class LessonTable extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false
    }
  }

  render() {
    if(this.props.parent.state.live) {
      server.get('/words/lesson/'+this.props.parent.state.lesson).then(res=> {
        this.setState({loaded: true, data: res.data.words });
      }).catch(err => {
        console.error(err);
      });
      return (<div>
        { this.state.loaded ?
          <table>
            <thead>
              <tr><th>English</th><th>Kanji</th><th>reading</th></tr>
            </thead>
            <tbody>
              {this.state.data.map((word)=><tr key={word.ID}><td>{word.Word}</td><td>{word.Kanji}</td><td>{word.reading}</td></tr>)}
            </tbody>
          </table>
          : <p>Loading</p>
        }
      </div>);
    } else {
      return <p />;
    }
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
