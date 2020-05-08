import React, { useState, useEffect } from "react";
import './ChatView.css'
import socketIOClient from "socket.io-client";
import { connect } from 'react-redux';
import { getOldMessages, getUser, pushMessageToEnd, getOnlineUsers, pushUser, removeUser, userLogout } from '../../actions'
import { getUserIdFromCookie, removeUserIdFromCookie } from "../../Cookie";
import OnlineUsers from './OnlineUsers';
import UserInfo from './UserInfo';
import Chat from './Chat';

const ENDPOINT = "http://127.0.0.1:8080";
let socket = null;
function ChatView(props) {
  const [ content, setContent ] = useState('');

  
  useEffect(() => {
    const userId = getUserIdFromCookie();
    if (!userId) {
      props.history.push('/');
      return;
    }
    if (!props.me.id && !props.me.isLoading) {
      props.getUser(userId)
    }
    if (!socket && props.me.id) {
      socket = socketIOClient(ENDPOINT, {
        query: {
          userId: props.me.id
        }
      });
      props.getOnlineUsers();
    }
    if (socket) {
      socket.on('message', data => {
        console.log('Socket event message', data);
        props.pushMessageToEnd(data);
      });
      socket.on('new-user', data => {
        console.log('Socket event new-user', data);
        let existingUserIdx = props.users.findIndex(u => u._id === data._id)
        if (existingUserIdx === -1)
          props.pushUser(data);
      })
      socket.on('down-user', data => {
        console.log('Socket event down-user', data);
        props.removeUser(data);
      })
    }
    if (props.me.id) {
      socket.emit('hello', { userId: props.me.id })
    }
    return () => {
      if (socket) {
        socket.removeAllListeners(); 
      }
    }
  }, [ props.me ])

  const handleLogout = () => {
    props.userLogout();
    removeUserIdFromCookie();
    props.history.push('/');
  }

  const loadOldMessages = async () => {
    return props.getOldMessages(props.messages.length);
  }
  
  const emitMessage = async () => {
    if (!socket) {
      return false;
    }
    let msg = {
      content,
      author: props.me.id,
      authorName: props.me.username,
      createdAt: new Date()
    }
    socket.emit('message', msg)
    // mandar mensagem
    setContent('');
    props.pushMessageToEnd(msg);
    return true
  }

  return (
    <div className="ChatView">
      <UserInfo me={props.me} logout={handleLogout}/>
      <OnlineUsers users={props.users}/>
      <Chat chatLoading={props.chatLoading}
        loadOldMessages={loadOldMessages}
        messages={props.messages}
        handleChangeContent={setContent}
        content={content}
        emitMessage={emitMessage}/>

    </div>
  );
}

const mapStateToProps = state => ({
  messages: state.messages,
  chatLoading: state.chatLoading,
  me: state.me,
  users: state.users
})

const mapDispatchToProps = dispatch => ({
  getOldMessages: (skip, limit) => dispatch(getOldMessages(skip, limit)),
  getUser: () => dispatch(getUser()),
  pushMessageToEnd: (message) => dispatch(pushMessageToEnd(message)),
  getOnlineUsers: () => dispatch(getOnlineUsers()),
  pushUser: user => dispatch(pushUser(user)),
  removeUser: user => dispatch(removeUser(user)),
  userLogout: () => dispatch(userLogout())
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatView);