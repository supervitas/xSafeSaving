import React from "react";

var RegisterModal = React.createClass({
    getInitialState: function() {
        return {username: '', password: ''};
    },
    handleUsernameChange: function(e) {
        this.setState({username: e.target.value.substr(0, 12)});
    },
    handlePasswordChange: function(e) {
        this.setState({password: e.target.value.substr(0, 12)});
    },
    handleSubmitForm: function (e) {
        e.preventDefault();
        console.log(123);
    },
    checkProps: function () {
        const validationRules = {
            fields: {
                username: {
                    identifier: 'username',
                    rules: [
                        {
                            type   : 'empty',
                            prompt : 'Please enter a username'
                        }
                    ]
                },
                password: {
                    identifier: 'password',
                    rules: [
                        {
                            type   : 'empty',
                            prompt : 'Please enter a password'
                        },
                        {
                            type   : 'minLength[3]',
                            prompt : 'Your password must be at least {ruleValue} characters'
                        }
                    ]
                },
            }
        };
        $('.ui.form').form(validationRules,this.handleSubmitForm);
    },
    render: function () {
        this.checkProps();
        return (
            <div className="ui small modal">
                <div className="header">New User</div>
                <div className="content">
                        <form className="ui form">
                            <div className="field">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    name="username"
                                    value={ this.state.username }
                                    onChange={this.handleUsernameChange}
                                />
                            </div>
                            <div className="field">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={ this.state.password }
                                    onChange={this.handlePasswordChange}
                                />
                            </div>
                            <div className="ui error message"></div>
                            <div className="actions">
                                <div className="ui primary submit button">Submit</div>
                                <div className="ui cancel button">Cancel</div>
                            </div>
                        </form>
                </div>
            </div>
        )
    }
});
export default RegisterModal