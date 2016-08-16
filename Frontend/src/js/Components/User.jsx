import React from 'react'

var User = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired
    },

    render: function() {
        const { name } = this.props;
        return (
            <div>
                <p>Привет, {name}!</p>
            </div>
        );
    }
});

export default User