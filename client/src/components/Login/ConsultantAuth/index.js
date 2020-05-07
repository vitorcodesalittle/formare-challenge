import React, { useState } from 'react'
import './ConsultantAuth.css';
import Input from '../../UI/Input';
import Button from '../../UI/Button';

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
    <div className='ConsultantAuth'>
      { (!consultantHasSession && !props.consultantMe.id) &&
      <>
        <h3>Crie sua conta como Consultor</h3>
        <Input placeholder="Username" 
          type='text' 
          onChange={e => props.handleChangeCreateUsername(e.target.value)} 
          value={consultantCreateUsername}
          style={{ width: 'fit-content', marginBottom: 10, marginLeft: 'auto', marginRight: 'auto'}}/>
        <Input placeholder="Senha" 
          type='password' 
          onChange={e => props.handleChangeCreatePassword(e.target.value)} 
          value={consultantCreatePassword}
          style={{ width: 'fit-content', marginBottom: 10, marginLeft: 'auto', marginRight: 'auto'}}/>
        { <Button onClick={() => handleConsultantSignUp()}>Cadastrar</Button>}
      </>
      }
      {
        (consultantHasSession || props.consultantMe.id) &&
        <>
          <h3> Consultor já tem sessão </h3>
          {props.consultantMe.username && <p>{props.consultantMe.username}</p>}
          <Input placeholder="Senha" type='password' onChange={e => props.handleChangeConsultantPassword(e.target.value)} style={{ width: 'fit-content', marginBottom: 10, marginLeft: 'auto', marginRight: 'auto'}}/>
          <Button onClick={() => handleConsultantLogin(props.consultantMe.username, consultantPassword)}>Entrar como consultor</Button>
          <Button onClick={closeConsultantSession}>Fechar Sessão</Button>
        </>
        
      }
      {
        !(consultantHasSession || props.consultantMe.id) &&
        <>
          <h3>Entrar como Consultor</h3>
          <Input placeholder="Username" type='text' onChange={e => props.handleChangeConsultantUsername(e.target.value)} value={consultantUsername} style={{ width: 'fit-content', marginBottom: 10, marginLeft: 'auto', marginRight: 'auto'}}></Input>
          <Input placeholder="Senha" type='password' onChange={e => props.handleChangeConsultantPassword(e.target.value)} value={consultantPassword} style={{ width: 'fit-content', marginBottom: 10, marginLeft: 'auto', marginRight: 'auto'}}></Input>
          <Button onClick={() => handleConsultantLogin(consultantUsername, consultantPassword)}>Entrar como consultor</Button>
        </>
      }
    </div>
  )
}

export default ConsultantAuth