import React from 'react';
import PropTypes from 'prop-types';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const MessageContainer = ({ messages, chatId, userId }) => (
  <div noValidate autoComplete="off">
    <MessageList messages={messages} userId={userId} />
    <MessageInput chatId={chatId} />
  </div>
);

MessageContainer.propTypes = {
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
  chatId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default MessageContainer;
