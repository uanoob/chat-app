import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import List from '@material-ui/core/List';
import MessageListItem from './MessageListItem';

const styles = theme => ({
  container: {
    marginBottom: theme.spacing.unit * 7,
  },
});

const MessageList = ({ classes, messages, userId }) => messages
  && messages.length !== 0 && (
    <List className={classes.container} component="nav">
      {messages.map(message => (
        <MessageListItem key={message._id} message={message} userId={userId} />
      ))}
    </List>
);

MessageList.propTypes = {
  classes: PropTypes.shape({
    container: PropTypes.string.isRequired,
  }).isRequired,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      chatId: PropTypes.string.isRequired,
      sender: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
      }),
    }),
  ),
};

export default withStyles(styles)(MessageList);
