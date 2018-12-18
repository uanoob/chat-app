import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import NavBar from './Navbar';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';

const styles = theme => ({
  container: {
    margin: 'auto',
    marginTop: 20,
    maxWidth: 500,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
  },
});

export class WelcomePageComponent extends Component {
  state = {
    current: 0,
  };

  handleChange = (event, current) => {
    this.setState({ current });
  };

  handleChangeIndex = (index) => {
    this.setState({ current: index });
  };

  render() {
    const { classes, theme } = this.props;
    const { current } = this.state;
    return (
      <Fragment>
        <AppBar position="static">
          <NavBar title="Chat App" username="anonymous" />
        </AppBar>
        <div className={classes.container}>
          <AppBar position="static" color="default">
            <Tabs
              value={current}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              fullWidth
            >
              <Tab label="Login" />
              <Tab label="Sign Up" />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={current}
            onChangeIndex={this.handleChangeIndex}
          >
            <LoginPage dir={theme.direction} />
            <SignupPage dir={theme.direction} />
          </SwipeableViews>
        </div>
      </Fragment>
    );
  }
}

WelcomePageComponent.propTypes = {
  classes: PropTypes.shape({
    container: PropTypes.string.isRequired,
  }).isRequired,
  theme: PropTypes.shape({
    direction: PropTypes.string.isRequired,
  }).isRequired,
};

const WelcomePage = withStyles(styles, { withTheme: true })(
  WelcomePageComponent,
);

export default WelcomePage;
