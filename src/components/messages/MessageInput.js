import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { checkValidityLength } from '../../utils/validator.utils';
import { socketsSendMessage } from '../../store/actions';

const styles = theme => ({
  messageInputComponentWrapper: {
    position: 'fixed',
    left: 'auto',
    right: 0,
    bottom: 0,
    width: 'calc(100% - 300px)',
    padding: theme.spacing.unit * 2,
  },
  root: {
    ...theme.mixins.gutters(),
  },
  textField: {
    width: '100%',
  },
});

class MessageInputComponent extends React.Component {
  state = {
    message: '',
    messageTouched: false,
    messageIsValid: false,
  };

  componentWillReceiveProps() {
    this.clearInput();
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    const touched = `${name}Touched`;
    const isValid = `${name}IsValid`;
    const checkValidity = () => checkValidityLength(name, value);
    this.setState({
      [name]: value,
      [touched]: true,
      [isValid]: checkValidity(),
    });
  };

  clearInput = () => {
    this.setState({
      message: '',
      messageTouched: false,
      messageIsValid: false,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { message } = this.state;
    const { onSocketsSendMessage, chatId } = this.props;
    onSocketsSendMessage(message, chatId);
    this.clearInput();
  };

  clearInput = () => {
    this.setState({
      message: '',
      messageTouched: false,
      messageIsValid: false,
    });
  };

  render() {
    const { classes } = this.props;
    const { message, messageIsValid, messageTouched } = this.state;

    return (
      <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
        <div className={classes.messageInputComponentWrapper}>
          <Paper className={classes.root} elevation={5}>
            <TextField
              id="chat-input-message"
              label="Type your message"
              className={classes.textField}
              name="message"
              value={message}
              onChange={e => this.handleChange(e)}
              margin="normal"
              error={!messageIsValid && messageTouched}
            />
          </Paper>
        </div>
      </form>
    );
  }
}

MessageInputComponent.propTypes = {
  classes: PropTypes.shape({
    messageInputComponentWrapper: PropTypes.string.isRequired,
    root: PropTypes.string.isRequired,
    textField: PropTypes.string.isRequired,
  }).isRequired,
  onSocketsSendMessage: PropTypes.func.isRequired,
  chatId: PropTypes.string.isRequired,
};

const mapDispatchToProps = {
  onSocketsSendMessage: socketsSendMessage,
};

const MessageInput = connect(
  null,
  mapDispatchToProps,
)(withStyles(styles)(MessageInputComponent));

export default MessageInput;
