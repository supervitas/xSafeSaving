import React from 'react';
import { Link } from 'react-router'
var Layout = React.createClass({
    render: function() {
        return (
            <div className="commentBox">
                <h1>xSafeSaving</h1>
                <ul>
                    <li><Link to='/register'>Register</Link></li>
                </ul>
                { this.props.children }
            </div>
        );
    }
});
export { Layout }