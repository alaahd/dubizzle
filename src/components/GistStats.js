import React, { Component } from 'react';
import axios from 'axios';

export default class GistStats extends Component {

    constructor(props) {
        super(props);
        this.state = {
            forks: 0,
            comments: 0,
            stars: 0,
            forks_users: []
        }
    }

    getStatsInfo(url) {
        return axios.get(url);
    }

    componentDidMount() {
        const that = this;

        //this is a good example to demo how we can perform multiple async concurrent requests and update the state once all requests are fulfilled.
        axios.all([this.getStatsInfo(this.props.forksUrl), this.getStatsInfo(this.props.commentsUrl)])
          .then(axios.spread(function (_forks, _comments) {
            // All requests are now completed
                const forks = _forks.data.length;
                const comments = _comments.data.length;
                //const stars = c.data.length;
            if (forks || comments) {
                console.log(_forks.data);
                //since we will update the local state, then it is recommended to update all values
                that.setState({
                    forks,
                    comments
                });

                if (forks) {
                    const forks_users = _forks.data.map(f => {
                        return {login: f.owner.login, avatar: f.owner.avatar_url, url: f.forks_url}
                    }).slice(0,3);
                    that.setState({
                        forks_users: forks_users
                    });
                }
            }
           }));
    }

    render() {
        let forks_users;
        if (this.state.forks_users.length) {

            forks_users = this.state.forks_users.map((fuser, index) => {
                return (
                    <li key={index}>
                        <a href={fuser.url} target="_blank">
                            <img className="avatar" src={fuser.avatar} width="50" height="50" alt="" />
                            <h3>{fuser.login}</h3>
                        </a>
                    </li>
                )
            })
        }
        return (
            <div className="stats_forks">
                <ul className="stats">
                    <li>{this.props.files} files</li>
                    <li>{this.state.forks} forks</li>
                    <li>{this.state.comments} comments</li>
                    <li>{this.state.stars} stars</li>
                </ul>
                <ul className="forks">
                    {forks_users}
                </ul>
            </div>
        )
    }
}
