import React, { Component } from 'react';
import axios from 'axios';

/* import all required components */
import UserInput from './components/UserInput';
import GistStats from './components/GistStats';

import ToggleDisplay from 'react-toggle-display';
import Moment from 'react-moment';

import './App.css';

//To increase rate limits you can provide client-id and client-secret
const CLIENT_ID = 'e7d3f4ff49e37a4037d2';
const CLIENT_SECRET = '3194e739dd98743fed8ec3ae160bf9ee8f6db6df';
const API_OAUTH = `?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;
const API_BASE_URL = 'https://api.github.com';
const API_GISTS_URL = `${API_BASE_URL}/users/{username}/gists${API_OAUTH}`;

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

  renderGists(gist, index) {
    const forksUrl = gist.forks_url + API_OAUTH;
    const commentsUrl = gist.comments_url + API_OAUTH;
    return (
        <li key={gist.id}>
          <ul className="gist">
            <li>
              <img className="avatar" src={gist.owner && gist.owner.avatar_url} width="50" height="50" alt={gist.owner && gist.owner.login} />
              <p>
                <a href="/">{gist.owner && gist.owner.login}</a> / <a href="/">{gist.files[Object.keys(gist.files)[0]].filename}</a>
                <span className="cratedAt">
                  <Moment>
                    {gist.created_at && gist.created_at}
                  </Moment>
                </span>
              </p>
            </li>
            <li>
              <GistStats files={Object.keys(gist.files).length} forksUrl={forksUrl} commentsUrl={commentsUrl} />
            </li>
            <li>
              <h3>{gist.id && gist.id}</h3>
              <p>{gist.description && gist.description}</p>
            </li>
          </ul>
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
