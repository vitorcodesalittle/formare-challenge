import React, { useState } from 'react'

const ConsultantAuth = function({ 
  consultantToken, 
  consultantHasSession,
  consultantCreateUsername,
  consultantCreatePassword,
  consultantPassword, 
  handleConsultantLogin,
  handleConsultantSignUp,
  closeConsultantSession,
  consultantUsername,

  ...props}) {

  return (
    <div>
      { (!consultantHasSession && !props.consultantMe.id) &&
      <>
        <h3>Crie sua conta como Consultor</h3>
        <label>Username</label>
        <input type='text' onChange={e => props.handleChangeCreateUsername(e.target.value)} value={consultantCreateUsername}/>
        <label>Senha</label>
        <input type='password' onChange={e => props.handleChangeCreatePassword(e.target.value)} value={consultantCreatePassword}/>
        { <button onClick={() => handleConsultantSignUp()}>Cadastrar</button>}
      </>
      }
      {
        (consultantHasSession || props.consultantMe.id) &&
        <>
          <h3> Consultor já tem sessão </h3>
          {props.consultantMe.username && <p>{props.consultantMe.username}</p>}
          { !consultantToken && <label>Senha:</label>}
          <input type='password' onChange={e => props.handleChangeConsultantPassword(e.target.value)}/>
          <button onClick={() => handleConsultantLogin(props.consultantMe.username, consultantPassword)}>Entrar como consultor</button>
          <button onClick={closeConsultantSession}>Fechar Sessão</button>
        </>
        
      }
      {
        !(consultantHasSession || props.consultantMe.id) &&
        <>
          <h3>Entrar como Consultor</h3>
          <label>Username</label>
          <input type='text' onChange={e => props.handleChangeConsultantUsername(e.target.value)} value={consultantUsername}></input>
          <label>Password</label>
          <input type='password' onChange={e => props.handleChangeConsultantPassword(e.target.value)} value={consultantPassword}></input>
          <button onClick={() => handleConsultantLogin(consultantUsername, consultantPassword)}>Entrar como consultor</button>
        </>
      }
    </div>
  )
}

export default ConsultantAuth