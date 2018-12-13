import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { stringToChar, stringToColor } from '../../utils';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  link: {
    textDecoration: 'none',
  },
});

const ChatListItem = (props) => {
  const {
    classes, selectedIndex, handleListItemClick, chat,
  } = props;

  return (
    <Link className={classes.link} to={`/chat/${chat._id}`}>
      <ListItem
        button
        selected={selectedIndex === chat._id}
        onClick={event => handleListItemClick(event, chat._id)}
      >
        <ListItemAvatar>
          <Avatar
            style={{
              backgroundColor: stringToColor(chat.title || 'Anonymous'),
            }}
          >
            {stringToChar(chat.title || 'Anonymous')}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={chat.title} />
      </ListItem>
    </Link>
  );
};

ChatListItem.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }).isRequired,
  selectedIndex: PropTypes.string.isRequired,
  handleListItemClick: PropTypes.func.isRequired,
  chat: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    creator: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
    }),
    title: PropTypes.string.isRequired,
    members: PropTypes.arrayOf(PropTypes.string.isRequired),
  }).isRequired,
};

export default withStyles(styles)(ChatListItem);
