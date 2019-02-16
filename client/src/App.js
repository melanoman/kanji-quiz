import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faChalkboardTeacher, faReply,
         faCaretLeft, faCaretRight, faCaretUp, faCaretDown,
         faPlusCircle, faTimesCircle, faCheckCircle
} from '@fortawesome/free-solid-svg-icons'

library.add(faPencilAlt);
library.add(faChalkboardTeacher);
library.add(faReply);
library.add(faCaretLeft);
library.add(faCaretRight);
library.add(faCaretUp);
library.add(faCaretDown);
library.add(faPlusCircle);
library.add(faTimesCircle);
library.add(faCheckCircle);

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
      editing: -1, //ID of word to edit
      adding: false
    }
  }

  newLesson(event) {
    var val = parseInt(event.target.value);
    if (!isNaN(val) && val > 0) { this.setState({lesson: val, live: false, adding: false }); }
  }

  newWord() {
    //TODO: clear the editor
    this.setState({adding: true, editing: -1});
  }

  addWord() {
    //TODO: actually add the word
    this.setState({adding: false});
  }

  render() {
    return (<div className="center">
      <LessonChooser parent={this} />
      <LessonTable parent={this} lesson={this.state.lesson} />
      {(this.state.adding) ?
          <NewWord parent={this} lesson={this.state.lesson} /> :
          <button onClick={()=>this.newWord()}><FontAwesomeIcon icon="plus-circle" size="2x" /></button>
      }
    </div>);
  }
}

class WordEditor extends Component {
  render() {
    return (
      <tr>
        <CellEditor name={this.props.word.Word} />
        <CellEditor name={this.props.word.Kanji} />
        <CellEditor name={this.props.word.reading} />
      </tr>
    );
  }
}

class NewWord extends Component {
  render() {
    return (
      <table>
        <tbody><tr>
          <CellEditor />
          <CellEditor />
          <CellEditor />
          <SaveButton />
          <CancelButton />
        </tr></tbody>
      </table>
    );
  }
}

class SaveButton extends Component {
  render() {
    return (<td><button><FontAwesomeIcon icon="check-circle" size = "2x" /></button></td>
    );
  }
}

class CancelButton extends Component {
  render() {
    return (<td><button><FontAwesomeIcon icon="times-circle" size="2x" /></button></td>
    );
  }
}

class LessonChooser extends Component {

  incr() {
    this.props.parent.setState({lesson: (this.props.parent.state.lesson + 1), live: false, adding: false });
  }
  decr(){
    if (this.props.parent.state.lesson > 1) {
      this.props.parent.setState({lesson: (this.props.parent.state.lesson - 1), live: false, adding: false });
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

  edit(id) {
    this.props.parent.setState({editing: id});
    this.props.parent.setState({adding: false});
  }

  render() {
    // eslint-disable-next-line
    { // TODO: modify this to prevent busy-loading
      server.get('/words/lesson/'+this.props.parent.state.lesson).then(res=> {
        this.setState({loaded: true, data: res.data.words });
      }).catch(err => {
        console.error(err);
      });
    }
    return (<div>
      { this.state.loaded ?
        <table>
          <thead>
            <tr><th>English</th><th>Kanji</th><th>reading</th></tr>
          </thead>
          <tbody>
            {this.state.data.map((word)=><WordEditor word={word} parent={this} editing={this.props.parent.state.editing===word.ID}/>)}
          </tbody>
        </table>
      : <p>Loading</p>
      }
    </div>);
  }
}

class CellEditor extends Component {
  constructor() {
    super()
    this.state = {
      editing: false,
      name: ''
    }
  }

  handleSubmit(event, editor) {
    event.preventDefault();
    editor.props.callback(editor.props.thing, editor.state.name)
    editor.setState({editing: false});
  }

  handleChange(event, editor) {
    editor.setState({name: event.target.value});
  }

  render() {
    if (this.state.editing) {
      var editor = this;
      return (
        <td className="cell-editor">
          <form onSubmit={(event) => editor.handleSubmit(event, editor)}>
            <input type="text" placeholder={editor.props.name} value={editor.state.name}
                   onChange={(event)=>{editor.handleChange(event,editor)}}
            />
          </form>
        </td>
      );
    } else {
      var editName = () => this.setState({editing: true, name:''})
      return (
        <td>
          <div onClick={()=>{this.setState({editing: true})}}>
            {this.props.name}
            <FontAwesomeIcon icon="alt-pencil" />
          </div>
        </td>
      );
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
