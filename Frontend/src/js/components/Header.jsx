import React from "react";
var Header = React.createClass({
    render: function () {
        const {assets} = this.props;
        return(
            <div className="ui borderless menu">
                <a className="item">
                    <i className="blue cloud icon"></i> xSafeSaving</a>
                <div className="right menu">
                    <a className="item" onClick={this.props.handleClick}>
                        <i className="add user icon"></i>Sign-up</a>
                    <a className="item" onClick={this.props.getFiles}>
                        <i className="sign in icon "></i>Sign-in</a>
                </div>
                У тебя {assets.files.length} фото.
            </div>
        )
    },
});
export default Header