import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import ChatList from './chats/ChatList';
import Navbar from './Navbar';
import MessageContainer from './messages/MessageContainer';
import {
  getChatById,
  socketsConnect,
  socketsMountChat,
  socketsUnmountChat,
} from '../store/actions';

const drawerWidth = 300;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

export class MainPageComponent extends React.Component {
  state = {};

  componentDidMount() {
    const { onSocketsConnect } = this.props;
    onSocketsConnect();
  }

  componentWillReceiveProps(nextProps) {
    const nextId = nextProps.match.params.id;
    const {
      match,
      onGetChatById,
      onSocketsMountChat,
      onSocketsUnmountChat,
    } = this.props;
    onSocketsMountChat(nextId);
    const prevId = match.params.id;
    if (nextId !== prevId) {
      onSocketsUnmountChat(prevId);
      onSocketsMountChat(nextId);
      onGetChatById(nextId);
    }
  }

  render() {
    const {
      classes, chat, messages, match, userId,
    } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Navbar title={(chat && chat.title) || 'Chat App'} />
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <div className={classes.toolbar} />
          <Divider />
          <ChatList />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {messages && messages.length !== 0 && (
            <MessageContainer
              messages={messages}
              chatId={match.params.id}
              userId={userId}
            />
          )}
        </main>
      </div>
    );
  }
}

MainPageComponent.defaultProps = {
  chat: null,
};

MainPageComponent.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    appBar: PropTypes.string.isRequired,
    drawer: PropTypes.string.isRequired,
    toolbar: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    isExact: PropTypes.bool.isRequired,
    params: PropTypes.shape({ id: PropTypes.string }).isRequired,
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
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
  }),
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
  onGetChatById: PropTypes.func.isRequired,
  onSocketsConnect: PropTypes.func.isRequired,
  onSocketsMountChat: PropTypes.func.isRequired,
  onSocketsUnmountChat: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  chat: state.chat.chat,
  messages: state.chat.messages,
  userId: state.auth.user._id,
});

const mapDispatchToProps = {
  onGetChatById: getChatById,
  onSocketsConnect: socketsConnect,
  onSocketsMountChat: socketsMountChat,
  onSocketsUnmountChat: socketsUnmountChat,
};

const MainPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(MainPageComponent));

export default MainPage;
