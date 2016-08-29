import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Header from "../components/Header";
import RegisterModal from "../components/RegisterModal";
import Layout from "../components/Layout";
import * as pageActions from "../actions/PageActions";
import * as authActions from "../actions/AuthActions";


var App = React.createClass({
  render() {
    const { user, assets } = this.props;

    const { getFiles } = this.props.pageActions;
    const  { authAction }  = this.props.authActions;
    return <div>
      <Header handleClick={ () => $('.ui.modal').modal({blurring: true}).modal('show') }/>
      <RegisterModal register={authAction} fetching={user.fetching}/>
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
