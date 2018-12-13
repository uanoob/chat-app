import React from 'react';
import PropTypes from 'prop-types';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const MessageContainer = ({ chat, chatId, userId }) => (
  <div noValidate autoComplete="off">
    <MessageList messages={chat.messages} userId={userId} />
    <MessageInput chatId={chatId} />
  </div>
);

MessageContainer.propTypes = {
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
  chatId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default MessageContainer;
