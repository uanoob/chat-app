import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import MessageContainer from './messages/MessageContainer';
import {
  clearChat,
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
    const prevId = match.params.id;
    if (nextId !== prevId) {
      if (prevId) {
        onSocketsUnmountChat(prevId);
      }
      onSocketsMountChat(nextId);
      onGetChatById(nextId);
    }
  }

  componentWillUnmount() {
    const { onClearChat } = this.props;
    onClearChat();
  }

  render() {
    const {
      classes, chat, messages, userId,
    } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Navbar title={(chat && chat.title) || 'Chat App'} />
        </AppBar>
        <Sidebar />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {chat
            && chat._id && (
              <MessageContainer
                messages={messages}
                chatId={chat._id}
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
  messages: [],
};

MainPageComponent.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    appBar: PropTypes.string.isRequired,
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
  ),
  onClearChat: PropTypes.func.isRequired,
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
  onClearChat: clearChat,
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
