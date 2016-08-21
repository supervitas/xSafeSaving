import React from "react";

var Header = React.createClass({
    render: function () {
        return(
            <div className="ui massive borderless menu">
                <a className="item">
                    <i className="blue cloud icon"></i> xSafeSaving
                </a>
                <div className="right menu">
                    <a className="item">Login</a>
                    <a className="item">Sign-in</a>
                </div>
            </div>
        )
    }
});
export default Header