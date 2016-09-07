import React from "react";
var Header = React.createClass({
    render: function () {
        var Header;

        if (this.props.user) {
           Header = <LogedHeader authActions={this.props.authActions}
                                 user={this.props.user}
                                 uploadFile={this.props.handleUploadClick}/>
        } else {
            Header = <LogedOutHeader handleRegisterClick={this.props.handleRegisterClick}
                                     handleLoginClick={this.props.handleLoginClick}/>
        }
        return( Header )
    },
});
var LogedOutHeader = React.createClass({
    render: function () {
        return (
            <div className="ui secondary borderless menu">
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
    componentDidMount: function () {
        $('.ui.dropdown.item').dropdown();
    },
    logout: function () {
      this.props.authActions('LOGOUT')
    },
    render: function () {
        return (
            <div className="ui secondary fixed  borderless menu">
                <a className="item">
                    <i className="blue cloud icon"></i> xSafeSaving</a>
                <div className="right menu">
                    <a className="item" onClick={this.props.uploadFile}>
                        <i className="cloud upload icon"></i>Upload</a>

                    <div className="ui dropdown item">
                        <i className="user icon"></i>
                        {this.props.user}
                        <i className="dropdown icon"></i>
                        <div className="menu">
                            <a className="item" onClick={this.logout}>
                                <i className="sign out icon "></i>Logout</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});
export default Header