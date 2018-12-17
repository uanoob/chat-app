import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ChatList from './chats/ChatList';
import ChatForm from './chats/ChatForm';

const drawerWidth = 300;

const styles = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
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
  };

  handleChatDialogClick = () => {
    const { chatDialog } = this.state;
    this.setState({
      chatDialog: !chatDialog,
    });
  };

  render() {
    const { classes } = this.props;
    const { chatDialog } = this.state;
    return (
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

SidebarComponent.propTypes = {
  classes: PropTypes.shape({
    drawer: PropTypes.string.isRequired,
    drawerPaper: PropTypes.string.isRequired,
    toolbar: PropTypes.string.isRequired,
    fab: PropTypes.string.isRequired,
  }).isRequired,
};

const Sidebar = withStyles(styles)(SidebarComponent);

export default Sidebar;
