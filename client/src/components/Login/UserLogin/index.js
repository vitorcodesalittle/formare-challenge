import React, { useState } from 'react'
import Input from '../../UI/Input';
import './UserLogin.css';

const UserLogin = function({ userHasSession, handleUserLogin, closeUserSession, username, handleChangeUsername, ...props }) {
  return (
    <div className='UserLogin'>
      { (!userHasSession && !props.me.id) && 
      <>
        <h3>Crie seu Usuário</h3>
        <Input type="text" onChange={e => handleChangeUsername(e.target.value)} value={username} placeholder="Username" style={{ maxWidth: 300, marginLeft: 'auto', marginRight: 'auto'}}/>
      </>
      }
      { (userHasSession || props.me.id) && 
      <>
        <h3>Usuário já tem sessão</h3>
        <p>{props.me && props.me.username}</p>
      </>
      }
      { <button onClick={() => handleUserLogin()}>{(userHasSession || props.me.id) ? "Entrar no chat" : "Cadastrar" }</button>}
      { (userHasSession || props.me.id) && <button onClick={closeUserSession}>Fechar sessão</button>}

    </div>
  )
}

export default UserLogin