import React from "react";
const Header = React.createClass({
    render: function () {
	    let Header = this.props.user ? <LogedHeader authActions={this.props.authActions}
                                 user={this.props.user}
                                 uploadFile={this.props.handleUploadClick}/>
            :
            <LogedOutHeader handleRegisterClick={this.props.handleRegisterClick}
                                     handleLoginClick={this.props.handleLoginClick}/>;

        return( Header )
    },
});
const LogedOutHeader = React.createClass({
    render: function () {
        return (
            <div className='ui secondary borderless menu'>
                <a className='item'>
                    <i className='blue cloud icon'/>xSafeSaving</a>
                <div className='right menu'>
                    <a className='item' onClick={this.props.handleRegisterClick}>
                        <i className='add user icon'/>Register</a>
                    <a className='item' onClick={this.props.handleLoginClick}>
                        <i className='sign in icon '/>Sign-in</a>
                </div>
            </div>
        )
    }
});
const LogedHeader = React.createClass({
    componentDidMount: function () {
        $('.ui.dropdown.item').dropdown();
    },
    logout: function () {
      this.props.authActions('LOGOUT')
    },
    render: function () {
        return (
            <div className='ui secondary borderless menu'>
                <a className='item'>
                    <i className='blue cloud icon'/> xSafeSaving</a>
                <div className='right menu'>
                    <a className='item' onClick={this.props.uploadFile}>
                        <i className='cloud upload icon'/>Upload</a>

                    <div className='ui dropdown item'>
                        <i className='user icon'/>
                        {this.props.user}
                        <i className='dropdown icon'/>
                        <div className='menu'>
                            <a className='item' onClick={this.logout}>
                                <i className='sign out icon'/>Logout</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});
export default Header