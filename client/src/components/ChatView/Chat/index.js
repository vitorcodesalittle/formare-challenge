import React from 'react';
import './Chat.css'
import Input from '../../UI/Input';
import Button from '../../UI/Button';

const Chat = ({loadOldMessages, emitMessage, content, handleChangeContent, ...props}) => {

  const handleEmitMessage = () => {
    // console.log('Emiting')
    emitMessage(content);
  }

  return (
    <div className='Chat'>
      <div style={{ display: 'flex', flexDirection: 'column'}}>
        {/* { props.chatLoading && <p>Carregando mensagens antigas...</p> } */}
        {/* { !props.chatLoading && <button onClick={loadOldMessages}>Carregar mensagens antigas</button>} */}
        { props.messages.map((msg, idx) => <p key={idx}>{msg.authorName} - { msg.content}</p>)}
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