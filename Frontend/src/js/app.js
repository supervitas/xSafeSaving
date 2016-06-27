var Router = require('react-router').Router;
var Route = require('react-router').Router;
var Link = require('react-router').Link;
import React from 'react';
import ReactDOM from 'react-dom';
// import {CommentForm, CommentList} from './Components/Regiser'

var CommentList = React.createClass({
    render: function() {
        return (
            <div className="commentList">
                Hello, world! I am a CommentList.
            </div>
        );
    }
});

var CommentForm = React.createClass({
    render: function() {
        return (
            <div className="commentForm">
                Hello, world! I am a CommentForm.
            </div>
        );
    }
});




var CommentBox = React.createClass({
    render: function() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList />
                <CommentForm />
            </div>
        );
    }
});
ReactDOM.render(<CommentBox />, document.getElementById('app'));