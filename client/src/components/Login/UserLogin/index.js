import React, { useState } from 'react'
import Input from '../../UI/Input';
import Button from '../../UI/Button';
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
      { <Button onClick={() => handleUserLogin()}>{(userHasSession || props.me.id) ? "Entrar no chat" : "Cadastrar" }</Button>}
      { (userHasSession || props.me.id) && <Button onClick={closeUserSession}>Fechar sessão</Button>}

    </div>
  )
}

export default UserLogin