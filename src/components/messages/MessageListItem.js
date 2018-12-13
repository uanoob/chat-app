import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import { stringToChar, stringToColor } from '../../utils';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    ...theme.mixins.gutters(),
    padding: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
  },
  color: {
    backgroundColor: '#e6dcff',
    marginLeft: 'auto',
  },
  right: {},
});

const MessageListItem = (props) => {
  const { classes, message, userId } = props;
  return (
    <ListItem>
      {userId !== message.sender._id && (
        <ListItemAvatar>
          <Avatar
            style={{
              backgroundColor: stringToColor(
                message.sender.username || 'Anonymous',
              ),
            }}
          >
            {stringToChar(message.sender.username || 'Anonymous')}
          </Avatar>
        </ListItemAvatar>
      )}

      <Paper
        className={classnames(
          classes.paper,
          userId === message.sender._id && classes.color,
        )}
        elevation={5}
      >
        <ListItemText primary={message.content} />
        <Typography variant="caption" component="span">
          {moment(message.createdAt).fromNow()}
        </Typography>
      </Paper>
    </ListItem>
  );
};

MessageListItem.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    paper: PropTypes.string.isRequired,
  }).isRequired,
  message: PropTypes.shape({
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
  }).isRequired,
  userId: PropTypes.string.isRequired,
};

export default withStyles(styles)(MessageListItem);
