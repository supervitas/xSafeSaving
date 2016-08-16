import React from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux'
import User from './User'

var Layout = React.createClass({

    render: function() {
        const { user, page } = this.props;
        return (
            <div className="commentBox">
                <h1>xSafeSaving</h1>
                <div>
                <User name={user.name}/>

            </div>
                <ul>
                    <li><Link to='/register'>Register</Link></li>
                </ul>
            </div>
        );
    }
});
function mapStateToProps (state) {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(Layout)