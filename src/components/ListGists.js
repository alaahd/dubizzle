import React, { Component } from 'react';
import * as constants from '../utils/constants';
import GistStats from './GistStats';
import Moment from 'react-moment';

//using react stateless functional component whenever it is applicable
const ListGists = ({gists}) => {
    const renderdGists = gists.map((gist, index) => {
        const forksUrl = gist.forks_url + constants.API_OAUTH;
        const commentsUrl = gist.comments_url + constants.API_OAUTH;
        const labels = [];

        for (var ftype in gist.files) {
            if (gist.files.hasOwnProperty(ftype)) {
                //console.log(gist.files[ftype]);
                if (gist.files[ftype] && typeof gist.files[ftype].language !== 'undefined' && gist.files[ftype].language) {
                    labels.push(gist.files[ftype].language);
                }

            }
        }

        //console.log('------');

        return (
            <li key={gist.id}>
                <ul className="gist">
                    <li>
                        <img className="avatar" src={gist.owner && gist.owner.avatar_url} width="50" height="50"
                             alt={gist.owner && gist.owner.login}/>

                        <p>
                            <a href="/">{gist.owner && gist.owner.login}</a> / <a
                            href="/">{gist.files[Object.keys(gist.files)[0]].filename}
                            </a>
                            <span className="cratedAt">
                              <Moment>
                                  {gist.created_at && gist.created_at}
                              </Moment>
                            </span>
                            <div>
                                <ul className="labels">
                                    {labels.map(label => <li>{label}</li>)}
                                </ul>
                            </div>
                        </p>
                    </li>
                    <li>
                        <GistStats files={Object.keys(gist.files).length} forksUrl={forksUrl}
                                   commentsUrl={commentsUrl}/>
                    </li>
                    <li>
                        <h3>{gist.id && gist.id}</h3>

                        <p>{gist.description && gist.description}</p>
                    </li>
                </ul>
            </li>
        )
    })


    return (
        <ul className="gists">
            {renderdGists}
        </ul>
    )
}

export default ListGists;