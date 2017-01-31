import React from "react";
import {Link} from "react-router";

const Header = React.createClass({
    render: function () {
	    let Header = this.props.user ? <LogedHeader authActions={this.props.authActions}
                                 user={this.props.user}
                                 tag={this.props.tag}
                                 getFiles={this.props.getFiles}
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
                    <Link to={"/"}>
                    <i className='blue cloud icon'/>xSafeSaving</Link>

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
    getInitialState(){
      return {tagField: ''}
    },
    logout () {
      this.props.authActions('LOGOUT')
    },
    onTagFormChange(e) {
        this.setState({tagField: e.target.value.substr(0, 12)})
    },
    searchTag(e) {
        e.preventDefault();
        this.state.tagField.length > 0 ? this.props.getFiles({skip: 0, tag: this.state.tagField}) : this.getAllFiles();
    },
    getAllFiles(){
	    this.props.getFiles({skip: 0});
    },
    render: function () {
        return (
            <div className='ui secondary borderless menu'>
                <a className='item' onClick={this.getAllFiles}>
                    <i className='blue cloud icon'/> xSafeSaving</a>

                <div className='right menu'>
                    <div className="ui category search_bar search">
                        <div className="ui icon input">
                            <form onSubmit={this.searchTag}>
                                <input onChange={this.onTagFormChange} className="prompt" type="text"
                                       value={this.props.tag}
                                       placeholder="Search files by tags..."/>
                            </form>
                            <i className="search icon"/>
                        </div>
                        <div className="results"></div>
                    </div>

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