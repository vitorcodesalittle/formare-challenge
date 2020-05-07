import React, { useRef, useEffect } from 'react';
import './Chat.css'
import Input from '../../UI/Input';
import Button from '../../UI/Button';
import { formatDate } from '../../../dateHelpers';

const Message = ({ authorName, content, createdAt, bg }) => {
  let date, time
  if (createdAt) {
    let dateString = formatDate(createdAt);
    let parts = dateString.split('-');
    date = parts[0]
    time = parts[1];
  }
  return (
    <div className='Message' style={{ backgroundColor: bg}}>
      <p>{date} - {authorName} -{time}</p>
      <p>{content}</p>
    </div>
  )
}

const Chat = ({loadOldMessages, emitMessage, content, handleChangeContent, ...props}) => {

  const messagesEl = useRef(null);

  const scrollToBottom = () => {
    if (messagesEl) {
      // messagesEl.current.scrollIntoView({ behavior: 'smooth'});
      console.log(messagesEl.current.scrollTop, messagesEl.current.scrollHeight, messagesEl.current.scrollHeight - messagesEl.current.scrollTop)
      messagesEl.current.scrollTop = messagesEl.current.scrollHeight + messagesEl.current.clientHeight + 523;
    }
  }

  const handleEmitMessage = () => {
    // console.log('Emiting')
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