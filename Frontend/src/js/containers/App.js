import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Header from "../components/Header";
import RegisterModal from "../components/RegisterModal";
import * as pageActions from "../actions/PageActions";


var App = React.createClass({
  render() {
    const { user, page } = this.props;
    const { getPhotos } = this.props.pageActions;

    return <div>
      <Header handleClick={ () => $('.ui.modal').modal({blurring: true}).modal('show') }/>
      <RegisterModal/>
    </div>
  }
});


function mapStateToProps(state) {
  return {
    user: state.user,
    page: state.page
  }
}

function mapDispatchToProps(dispatch) {
  return {
    pageActions: bindActionCreators(pageActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
