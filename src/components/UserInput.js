import React, { Component } from 'react';

export default class UserInput extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event && event.preventDefault();
        const username = event.target.gistUser.value;
        this.props.fetchGists(username);
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="gistUser" id="gistUser" placeholder="Insert username to search public gists" />
                <input type="submit" name="submitGistUser" id="submitGistUser" value="Search User" />
            </form>
        )
    }
}
