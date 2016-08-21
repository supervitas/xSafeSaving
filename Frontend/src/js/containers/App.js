import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Header from "../components/Header";
import * as pageActions from "../actions/PageActions";


var App = React.createClass({
  render() {
    const { user, page } = this.props
    const { getPhotos } = this.props.pageActions

    return <div>
      <Header/>
      {/*<Page photos={page.photos} year={page.year} getPhotos={getPhotos} fetching={page.fetching}/>*/}
      {/*<User name={user.name} />*/}
      {/*go to <Link to={`/register`}>reg</Link>*/}
      <div className="ui stackable four column grid">
        <div className="column">123</div>
        <div className="column">123</div>
        <div className="column">123</div>
        <div className="column">123</div>
      </div>
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
