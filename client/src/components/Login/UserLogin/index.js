import React, { useState } from 'react'

const UserLogin = function({ userHasSession, handleUserLogin, closeUserSession, username, handleChangeUsername, ...props }) {
  return (
    <div>
      { (!userHasSession && !props.me.id) && 
      <>
        <h3>Crie seu Usuário</h3>
        <label>Username</label>
        <input type="text" onChange={e => handleChangeUsername(e.target.value)} value={username}/>
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