import React, { Component } from 'react';
import axios from 'axios';

export default class GistStats extends Component {

    constructor(props) {
        super(props);
        this.state = {
            forks: 0,
            comments: 0,
            stars: 0
        }
    }

    getStatsInfo(url) {
        return axios.get(url);
    }

    componentDidMount() {
        const that = this;

        //this is just an example how to perform multiple concurrent requests and update the state once all requests are fulfilled.
        axios.all([this.getStatsInfo(this.props.forksUrl), this.getStatsInfo(this.props.commentsUrl)])
          .then(axios.spread(function (_forks, _comments) {
            // All requests are now completed
                const forks = _forks.data.length;
                const comments = _comments.data.length;
                //const stars = c.data.length;
            if (forks || comments) {
                //since we will update the local state, then it is recommended to update all values
                that.setState({
                    forks,
                    comments
                })
            }
           }));
    }

    render() {
        return (
            <ul className="stats">
                <li>{this.props.files} files</li>
                <li>{this.state.forks} forks</li>
                <li>{this.state.comments} comments</li>
                <li>{this.state.stars} stars</li>
            </ul>
        )
    }
}
