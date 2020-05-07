import React from 'react';

const Chat = ({loadOldMessages, emitMessage, content, handleChangeContent, ...props}) => {
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column'}}>
        <h3>Mensagens</h3>
        { props.chatLoading && <p>Carregando mensagens antigas...</p> }
        { !props.chatLoading && <button onClick={loadOldMessages}>Carregar mensagens antigas</button>}
        { props.messages.map((msg, idx) => <p key={idx}>{msg.authorName} - { msg.content}</p>)}
      </div>
      <div style={{ }}>
        <label>Mensagem</label>
        <input type='text' onChange={e => handleChangeContent(e.target.value)} value={content}/>
        <button onClick={emitMessage}>Enviar</button>
      </div>
    </div>
  )
}

export default Chat;