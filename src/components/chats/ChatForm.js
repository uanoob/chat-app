import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Send from '@material-ui/icons/Send';
import { checkValidityLength } from '../../utils/validator.utils';
import { createChat } from '../../store/actions';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

class ChatForm extends Component {
  state = {
    chatTitle: '',
    chatInputTouched: false,
    chatInputValid: false,
  };

  handleTextInput = (e) => {
    this.setState({
      chatTitle: e.target.value,
      chatInputTouched: true,
      chatInputValid: checkValidityLength('title', e.target.value),
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { onCreateChat, handleDialogClick } = this.props;
    const { chatTitle } = this.state;
    onCreateChat(chatTitle);
    this.clearTextField();
    handleDialogClick();
  };

  handleCancelClick = () => {
    const { handleDialogClick } = this.props;
    this.clearTextField();
    handleDialogClick();
  };

  clearTextField = () => {
    this.setState({
      chatTitle: '',
      chatInputTouched: false,
      chatInputValid: false,
    });
  };

  render() {
    const {
      classes,
      dialog,
      handleDialogClick,
      title,
      description,
    } = this.props;
    const { chatTitle, chatInputTouched, chatInputValid } = this.state;

    return (
      <Dialog
        open={dialog}
        onClose={handleDialogClick}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
          <TextField
            autoFocus
            id="chat-title-input"
            label="Your chat title here"
            value={chatTitle}
            onChange={event => this.handleTextInput(event)}
            className={classes.textField}
            margin="normal"
            error={!chatInputValid && chatInputTouched}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancelClick} color="primary">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            type="submit"
            onClick={this.handleSubmit}
            disabled={!chatInputValid}
          >
            Create
            <Send className={classes.rightIcon}>send</Send>
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ChatForm.propTypes = {
  classes: PropTypes.shape({
    container: PropTypes.string.isRequired,
    textField: PropTypes.string.isRequired,
  }).isRequired,
  onCreateChat: PropTypes.func.isRequired,
  dialog: PropTypes.bool.isRequired,
  handleDialogClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const mapDispatchToProps = {
  onCreateChat: createChat,
};

export default connect(
  null,
  mapDispatchToProps,
)(withStyles(styles)(ChatForm));
