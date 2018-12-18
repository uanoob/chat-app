import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui//core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ChatList from './chats/ChatList';
import ChatForm from './chats/ChatForm';
import { getAllChats } from '../store/actions';

const drawerWidth = 300;

const styles = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    ...theme.mixins.toolbar,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
  fab: {
    position: 'fixed',
    left: drawerWidth - 75,
    bottom: theme.spacing.unit * 2,
  },
});

export class SidebarComponent extends React.Component {
  state = {
    chatDialog: false,
    searchValue: '',
  };

  componentDidMount() {
    const { onGetAllChats } = this.props;
    onGetAllChats();
  }

  handleChatDialogClick = () => {
    const { chatDialog } = this.state;
    this.setState({
      chatDialog: !chatDialog,
    });
  };

  handleSearchChange = (event) => {
    this.setState({
      searchValue: event.target.value,
    });
  };

  filterChats = (chats) => {
    const { searchValue } = this.state;
    return chats
      .filter(chat => chat.title.toLowerCase()
        .includes(searchValue.toLowerCase()))
      .sort(
        (a, b) => (a.title.toLowerCase() <= b.title.toLowerCase() ? -1 : 1),
      );
  };

  render() {
    const { classes, chats } = this.props;
    const { chatDialog, searchValue } = this.state;
    return (
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.drawerHeader}>
          <TextField
            fullWidth
            margin="normal"
            placeholder="Search chats..."
            value={searchValue}
            onChange={this.handleSearchChange}
          />
        </div>
        <Divider />
        <ChatList chats={this.filterChats(chats)} />
        <Fab
          className={classes.fab}
          color="primary"
          onClick={this.handleChatDialogClick}
        >
          <AddIcon />
        </Fab>
        <ChatForm
          dialog={chatDialog}
          handleDialogClick={this.handleChatDialogClick}
          title="Create new chat"
          description="Please add your chat title."
        />
      </Drawer>
    );
  }
}

SidebarComponent.defaultProps = {
  chats: [],
};

SidebarComponent.propTypes = {
  classes: PropTypes.shape({
    drawer: PropTypes.string.isRequired,
    drawerPaper: PropTypes.string.isRequired,
    drawerHeader: PropTypes.string.isRequired,
    toolbar: PropTypes.string.isRequired,
    fab: PropTypes.string.isRequired,
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
  ),
  onGetAllChats: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  chats: state.chats.chats,
});

const mapDispatchToProps = {
  onGetAllChats: getAllChats,
};

const Sidebar = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(SidebarComponent));

export default Sidebar;
