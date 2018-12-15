import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';
import SnackBarCustom from './SnackbarCustom';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
});

class SnackbarComponent extends React.Component {
  state = {
    open: false,
  };

  componentDidMount() {
    const { notice } = this.props;
    if (notice) {
      this.setState({
        open: true,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const prevProps = this.props;
    if (nextProps.notice !== prevProps.notice) {
      this.setState({
        open: true,
      });
    }
  }

  handleCloseSnackbar = () => {
    this.setState({ open: false });
  };

  render() {
    const { notice } = this.props;
    const { open } = this.state;
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={open}
          autoHideDuration={6000}
          onClose={this.handleCloseSnackbar}
        >
          <SnackBarCustom
            onClose={this.handleCloseSnackbar}
            variant={notice.type}
            message={notice.message}
          />
        </Snackbar>
      </div>
    );
  }
}

SnackbarComponent.propTypes = {
  classes: PropTypes.shape({
    margin: PropTypes.string.isRequired,
  }).isRequired,
  notice: PropTypes.shape({
    type: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
};

const SnackbarPage = withStyles(styles)(SnackbarComponent);

export default SnackbarPage;
