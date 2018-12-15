import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Route, Switch, Redirect, withRouter,
} from 'react-router-dom';
import WelcomePage from './WelcomePage';
import MainPage from './MainPage';
import SnackbarPage from './snackbar/SnackbarPage';
import { authCheck } from '../store/actions';

class App extends React.Component {
  componentDidMount() {
    const { onAuthCheck } = this.props;
    onAuthCheck();
  }

  render() {
    const { isAuthenticated, notice } = this.props;
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
    return (
      <Fragment>
        {routes}
        {notice && <SnackbarPage notice={notice} />}
      </Fragment>
    );
  }
}

App.defaultProps = {
  notice: null,
};

App.propTypes = {
  onAuthCheck: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  notice: PropTypes.shape({
    type: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }),
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  notice: state.auth.notice,
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
