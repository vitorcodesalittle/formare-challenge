import React, { useRef, useEffect, useState } from 'react';
import './Chat.css'
import Input from '../../UI/Input';
import Button from '../../UI/Button';
import { formatDate } from '../../../dateHelpers';

export const Message = ({ authorName, content, createdAt, bg, onDelete, _id, deleted }) => {
  const [ isDeleting, setIsDeleting ] = useState(false);
  const handleDelete = () => {
    setIsDeleting(true);
    onDelete(_id)
  }
  let date, time
  if (createdAt) {
    let dateString = formatDate(createdAt);
    let parts = dateString.split('-');
    date = parts[0]
    time = parts[1];
  }
  let msg = (
    <>
      <p>{date} - {authorName} -{time}</p>
      {onDelete && _id && <p style={{ marginLeft: 'auto', marginRight: 15, color: 'red'}} onClick={() => handleDelete()}>{ isDeleting ? "Deletando..." : "Deletar"}</p>}
      <p>{content}</p>
    </>
  )
  if (deleted) {
    msg = (
      <p>Deleted</p>
    )
  }
  return (
    <div className='Message' style={ bg ? { backgroundColor: bg} : {}}>
      {msg}
    </div>
  )
}

const Chat = ({loadOldMessages, emitMessage, content, handleChangeContent, ...props}) => {

  useEffect( () => {
    scrollToBottom();
  }, [ props.messages ])

  const messagesEl = useRef(null);

  const scrollToBottom = () => {
    if (messagesEl) {
      // messagesEl.current.scrollIntoView({ behavior: 'smooth'});
      messagesEl.current.scrollTop = messagesEl.current.scrollHeight + messagesEl.current.clientHeight + 523;
    }
  }

  const handleEmitMessage = () => {
    emitMessage(content)
    .then(() => {
      scrollToBottom();
    });
  }

  return (
    <div className='Chat'>
      <div className="messages-container" ref={messagesEl}>
        { props.chatLoading && <p>Carregando mensagens antigas...</p> }
        { !props.chatLoading && <button onClick={() => {loadOldMessages().then(() => scrollToBottom());}}>Carregar mensagens antigas</button>}
        { props.messages.map((msg, idx) => <Message {...msg} key={idx} bg={idx%2===0 ? 'rgba(193, 243, 165, 0.816)' : 'rgba(238, 201, 159, 0.816)'}/>)}
      </div>
      <div className='content-entry'>
        <Input type='text' 
          onChange={e => handleChangeContent(e.target.value)} 
          value={content} 
          onKeyUp={e => (e.keyCode !== 13) ? null : handleEmitMessage()}
          style={{ width: '80%', marginTop: 'auto', marginBottom: 10}}/>
        <div>
          <Button onClick={handleEmitMessage}>Enviar</Button>
        </div>
      </div>
    </div>
  )
}

export default Chat;