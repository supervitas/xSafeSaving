import React from "react";

var AuthModal = React.createClass({
    getInitialState: function () {
        return {username: '', password: ''};
    },
    handleUsernameChange: function(e) {
        this.setState({username: e.target.value.substr(0, 12)});
    },
    handlePasswordChange: function(e) {
        this.setState({password: e.target.value.substr(0, 12)});
    },
    checkProps: function () {
        let that = this;
        let $form = $('.ui.form');
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
            },
            onSuccess: function (evt, fields) {
                evt.preventDefault();
                that.props.authAction(that.props.action, fields);
            }
        };
       $form.form(validationRules)
    },
    addError: function (err) {
        let that = this;
        let $formError = $('.ui.error.message');
        let $form = $('#' + that.props.modalId).find('.ui.form');
        $form.addClass('error');
        $formError.html(err);
    },
    render: function () {
        let that = this;
        let $modal = $('#' + that.props.modalId);
        let $form = $modal.find('.ui.form');
        this.checkProps();

        this.props.error ? this.addError(this.props.error.status): $form.removeClass('error');
        this.props.fetching ? $form.addClass('loading'): $form.removeClass('loading');
        if (this.props.user) {
            $modal.modal('hide');
            this.state.username = '';
            this.state.password = '';
        }
        return (
            <div className='ui small modal' id={this.props.modalId}>
                <div className='header'>{this.props.headerName}</div>
                <div className='content'>
                        <form className='ui form'>
                            <div className='field'>
                                <div className='ui left icon input'>
                                    <input
                                        type='text'
                                        placeholder='Username'
                                        name='username'
                                        value={this.state.username}
                                        onChange={this.handleUsernameChange}
                                    />
                                    <i className='user icon'/>
                                </div>
                            </div>
                            <div className='field'>
                                <div className='ui left icon input'>
                                    <input
                                        type='password'
                                        name='password'
                                        placeholder='Password'
                                        value={this.state.password }
                                        onChange={this.handlePasswordChange}
                                    />
                                    <i className='lock icon'/>
                                </div>
                            </div>
                            <div className='ui error message'></div>
                            <div className='actions'>
                                <div className='ui primary submit button'>Submit</div>
                                <div className='ui cancel button'>Cancel</div>
                            </div>
                        </form>
                </div>
            </div>
        );
    }
});
export default AuthModal