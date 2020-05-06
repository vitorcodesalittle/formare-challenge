import React, { useState, useEffect } from "react";
import './App.css';
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:8080";

let socket = null;
function App() {

  const [ messages, setMessages ] = useState([]);
  const [ content, setContent ] = useState('');
  const [ username, setUsername ] = useState('');

  const handleNewMessage = (message) => {
    console.log('new message: ', message);
    let newMessages = [ ...messages ];
    newMessages.push(message);
    setMessages(newMessages);
  }
  
  useEffect(() => {
    if (!socket) {
      socket = socketIOClient(ENDPOINT);
    }
    socket.on('message', data => {
      handleNewMessage(data);
    });
    return () => {
    }
  }, [ messages ])
  
  const emitMessage = () => {
    if (!socket) {
      console.log('Não há socket');
      return false;
    }
    console.log('Emmiting a message')
    socket.emit('message', {
      content,
      author: username
    })
    handleNewMessage({ content, author: 'me' });
  }

  return (
    <div className="App" style={{ height: '100%'}}>

      <h1> Hello World! </h1>
      <label>Username</label>
      <input onChange={e => setUsername(e.target.value)} value={username}></input>

      <div style={{ display: 'flex', flexDirection: 'column'}}>
        <h3>Mensagens</h3>
        { messages.map((msg, idx) => <p key={idx}>{msg.author} - { msg.content}</p>)}
      </div>
      <div style={{ marginTop: '100%' }}>
        <label>Mensagem</label>
        <input type='text' onChange={e => setContent(e.target.value)} value={content}/>
        <button onClick={emitMessage}>Enviar</button>
      </div>
    </div>
  );
}

export default App;
