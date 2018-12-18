import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ChatListItem from './ChatListItem';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

export class ChatListComponent extends React.Component {
  state = {
    selectedIndex: '',
  };

  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
  };

  render() {
    const { classes, chats } = this.props;
    const { selectedIndex } = this.state;

    return (
      chats
      && chats.length !== 0 && (
        <div className={classes.root}>
          <List component="nav">
            {chats.map(chat => (
              <ChatListItem
                key={chat._id}
                chat={chat}
                selectedIndex={selectedIndex}
                handleListItemClick={this.handleListItemClick}
              />
            ))}
          </List>
        </div>
      )
    );
  }
}

ChatListComponent.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
  }).isRequired,
  chats: PropTypes.arrayOf(
    PropTypes.shape({
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
    }),
  ).isRequired,
};

const ChatList = withStyles(styles)(ChatListComponent);

export default ChatList;
