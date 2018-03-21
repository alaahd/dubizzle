import React, { Component } from 'react';
import axios from 'axios';

/* import all required components */
import UserInput from './components/UserInput';
import ListGists from './components/ListGists';

import ToggleDisplay from 'react-toggle-display';

import './App.css';
import * as constants from './utils/constants';


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
    const targetUrl = constants.API_GISTS_URL.replace('{username}', username);

    this.setState({
      isLoading: true
    });

    axios.get(targetUrl)
      .then(res => {

        //early detection of any response which is not 200
        if (res.status && res.status !== 200) {
          this.setState({
            isLoading: false,
            info: 'Request failed with status code ' + res.status
          });
          return;
        }

        const gists = res.data;
        const info = gists.length ? username : 'Request failed with status code 404';

        //update state with the fetched gists
        this.setState({
          isLoading: false,
          info,
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
  }

  componentDidMount() {
    this.setState({
      isLoading: false
    });
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
              <ListGists gists={this.state.gists} />
            </section>
          </ToggleDisplay>
        </main>
        {this.state.isLoading && <div id="ui-blocker"></div>}
      </div>
    );
  }
}

export default App;
