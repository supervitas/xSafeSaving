import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Header from "../components/Header";
import AuthModal from "../components/AuthModal";
import Layout from "../components/Layout";
import * as pageActions from "../actions/PageActions";
import * as authActions from "../actions/AuthActions";


var App = React.createClass({
  componentWillMount: function () {
    const  { authAction }  = this.props.authActions;
    authAction("AUTHCHECK")
  },
  render() {
    const { user, assets } = this.props;
    const { getFiles, uploadFile } = this.props.pageActions;
    const  { authAction }  = this.props.authActions;

    return <div>
      <Header handleRegisterClick={ () => $('#register').modal({blurring: true})
          .modal({onHidden: function () {authAction('REMOVE_ERROR')}}).modal('show')}

              handleLoginClick={ () => $('#login').modal({blurring: true})
                  .modal({onHidden: function () {authAction('REMOVE_ERROR')}}).modal('show')}

              authActions={authAction}
              user={user.login}
              uploadFile={uploadFile}
              />

      <AuthModal headerName={"New User"}
                 modalId={"register"}
                 authAction={authAction}
                 fetching={user.fetching}
                 error={user.error}
                 action={"REGISTER"}
                 user={user.login}/>

      <AuthModal headerName={"Sign-in"}
                 modalId={"login"}
                 authAction={authAction}
                 action={"LOGIN"}
                 fetching={user.fetching}
                 error={user.error}
                 user={user.login}/>
      <Layout/>
    </div>
  }
});


function mapStateToProps(state) {
  return {
    user: state.user,
    assets: state.files
  }
}

function mapDispatchToProps(dispatch) {
  return {
    pageActions: bindActionCreators(pageActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
