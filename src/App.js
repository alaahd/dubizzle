import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UserInput from './components/UserInput'

class App extends Component {
  constructor(props) {
      super(props);
      this.fetchGists = this.fetchGists.bind(this);
      this.state = {
        username: ''
      }
  }

  fetchGists(username) {
    this.setState({
      username
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <UserInput fetchGists={this.fetchGists} />
        </header>
        <div className="App-intro">
          You are looking to fetch all public gists for the user:
          <strong>{this.state.username}</strong>
        </div>
      </div>
    );
  }
}

export default App;
