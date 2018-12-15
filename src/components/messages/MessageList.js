import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import MessageListItem from './MessageListItem';

const styles = theme => ({
  container: {
    marginBottom: theme.spacing.unit * 7,
  },
});

const MessageList = (props) => {
  const { classes, messages, userId } = props;
  return messages && messages.length !== 0 ? (
    <List className={classes.container} component="nav">
      {messages.map(message => (
        <MessageListItem key={message._id} message={message} userId={userId} />
      ))}
    </List>
  ) : (
    <Typography variant="display1">There is no messages yet...</Typography>
  );
};
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
      }).isRequired,
    }),
  ).isRequired,
  userId: PropTypes.string.isRequired,
};

export default withStyles(styles)(MessageList);
