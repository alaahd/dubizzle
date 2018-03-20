import React, { Component } from 'react';
import axios from 'axios';

import UserInput from './components/UserInput';
import ToggleDisplay from 'react-toggle-display';
import './App.css';

const API_BASE_URL = 'https://api.github.com';
const API_GISTS_URL = `${API_BASE_URL}/users/{username}/gists`;

class App extends Component {
  constructor(props) {
      super(props);
      this.fetchGists = this.fetchGists.bind(this);
      this.state = {
        info: '',
        gists: [],
        isLoading: true
      }
  }

  fetchGists(username) {
    const targetUrl = API_GISTS_URL.replace('{username}', username);

    this.setState({
      isLoading: true
    });

    axios.get(targetUrl)
      .then(res => {
        console.log(res);

        const gists = res.data;
        //update state with the fetched gists
        this.setState({
          isLoading: false,
          info: username,
          gists
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({
          isLoading: false,
          gists: [],
          info: err.message
        });
      })

    //this.setState({
    //  username,
    //  gists
    //});
  }

  componentDidMount() {
    this.setState({
      isLoading: false
    });
  }

  renderGists(gist, index) {
    return (
        <li key={gist.id}>
          <h3>{gist.id}</h3>
          <p>{gist.description && gist.description}</p>
        </li>
    )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <UserInput fetchGists={this.fetchGists} />
        </header>
        <main className="App-intro">
          <ToggleDisplay show={!!this.state.info}>
            <section className="head">
              Request to fetch all public gists for user: <strong>{this.state.info}</strong>
            </section>
          </ToggleDisplay>

          <ToggleDisplay show={!!this.state.gists.length}>
            <section className="body">
              <ul className="gists">
                {this.state.gists.map(this.renderGists)}
              </ul>
            </section>
          </ToggleDisplay>
        </main>
        {this.state.isLoading && <div id="ui-blocker"></div>}
      </div>
    );
  }
}

export default App;
