import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Route, Switch, Redirect, withRouter,
} from 'react-router-dom';
import WelcomePage from './WelcomePage';
import MainPage from './MainPage';
import { authCheck } from '../store/actions';

class App extends React.Component {
  componentDidMount() {
    const { onAuthCheck } = this.props;
    onAuthCheck();
  }

  render() {
    const { isAuthenticated } = this.props;
    let routes = (
      <Switch>
        <Route exact path="/welcome" component={WelcomePage} />
        <Redirect to="/welcome" />
      </Switch>
    );
    if (isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/chat/:id?" component={MainPage} />
          <Redirect to="/chat" />
        </Switch>
      );
    }
    return <Fragment>{routes}</Fragment>;
  }
}
App.propTypes = {
  onAuthCheck: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
  onAuthCheck: authCheck,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(App),
);
