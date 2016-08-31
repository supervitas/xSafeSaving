import React from "react";
var Header = React.createClass({
    render: function () {
        var Header = <LogedOutHeader handleRegisterClick={this.props.handleRegisterClick}
        handleLoginClick={this.props.handleLoginClick}/>;
        if (this.props.user) {
           Header = <LogedHeader user={this.props.user}/>;
        }
        return( Header )
    },
});
var LogedOutHeader = React.createClass({
    render: function () {
        return (
            <div className="ui borderless menu">
                <a className="item">
                    <i className="blue cloud icon"></i> xSafeSaving</a>
                <div className="right menu">
                    <a className="item" onClick={this.props.handleRegisterClick}>
                        <i className="add user icon"></i>Sign-up</a>
                    <a className="item" onClick={this.props.handleLoginClick}>
                        <i className="sign in icon "></i>Sign-in</a>
                </div>
            </div>
        )
    }
});
var LogedHeader = React.createClass({
    render: function () {
        return (
            <div className="ui borderless menu">
                <a className="item">
                    <i className="blue cloud icon"></i> xSafeSaving</a>
                <div className="right menu">
                    <a className="item">
                        <i className="cloud upload icon"></i>Upload</a>
                    <a className="item">
                        <i className="user icon"></i>{this.props.user}</a>
                    <a className="item">
                        <i className="sign out icon "></i>Logout</a>
                </div>
            </div>
        )
    }
});
export default Header