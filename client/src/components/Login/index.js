import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  getUserIdFromCookie,
  getConsultantIdFromCookie,
  removeUserIdFromCookie
} from '../../Cookie';
import { signUpUser, getUser, userLogout, signUpConsultant } from '../../actions';

const Login = function(props) {
  const [ loginPage, setLoginPage ] = useState('user')
  const [ username, setUsername ] = useState('');
  const [ consultantUsername, setConsultantUsername ] = useState('');
  const [ consultantPassword, setConsultantPassword ] = useState('');
  const [ userHasSession, setUserHasSession ] = useState(false);
  const [ consultantHasSession, setConsultantHasSession ] = useState(false);
  const userId = getUserIdFromCookie();
  const consultantId = getConsultantIdFromCookie();

  useEffect(() => {
    if (userId && !props.me.id && !props.me.isLoading) {
      setUserHasSession(true);
      props.getUser(userId);
    }
    if (consultantId) {
      setConsultantHasSession(true);
      // get Consultant
    }
    return () => {}
  }, [ props.me.isLoading, userId])

  const handleLogin = () => {
    console.log('LOGIN');
    if (loginPage === 'user') {
      if (userHasSession || props.me.id) {
        props.history.push('/chat');
      } else {
        console.log('Signing up new user');
        props.signUpUser(username)
      }
    } else {
      // login as consultant

    }
  }

  const closeUserSession = () => {
    removeUserIdFromCookie();
    props.userLogout();
    setUserHasSession(false);
  }

  return (
    <div>
      <h1>Login</h1>

      <div>
        <div onClick={() => setLoginPage('user')}>
          Aplicação Usuário
        </div>
        <div onClick={() => setLoginPage('consultant')}>
          Aplicação Consultor
        </div>
      </div>
      {
        loginPage === 'user' ?
        
        <div>
          { (!userHasSession && !props.me.id) && 
          <>
            <h3>Login como Usuário</h3>
            <label>Username</label>
            <input type="text" onChange={e => setUsername(e.target.value)} value={username}/>
          </>
          }
          { (userHasSession || props.me.id) && 
          <>
            <h3>Usuário já tem sessão</h3>
            <p>{props.me && props.me.username}</p>
          </>
          }
        </div> :
        <div>
          { !consultantHasSession &&
          <>
            <h3>Login como Consultor</h3>
            <label>Username</label>
            <input type='text' onChange={e => setConsultantUsername(e.target.value)} value={consultantUsername}/>
            <label>Senha</label>
            <input type='password' onChange={e => setConsultantPassword(e.target.value)} value={consultantPassword}/>
          </>
          }
          {
            consultantHasSession &&
            <>
              <h3> Consultor já tem sessão </h3>
            </>
          }
        </div>
      }
      <button onClick={() => handleLogin()}>Entrar</button>
      { (userHasSession || props.me.id) && loginPage === 'user' && <button onClick={closeUserSession}>Fechar sessão</button>}
      
      
    </div>
  )
}

const mapStateToProps = state => ({
  me: state.me,
  consultantMe: {
    username: state.consultantApp.username,
    id: state.consultantApp.id
  }
})

const mapDispatchToProps = dispatch => ({
  getUser: (userId) => dispatch(getUser(userId)),
  signUpUser: (username) => dispatch(signUpUser(username)),
  userLogout: () => dispatch(userLogout()),
  signUpConsultant: (username, password) => dispatch(signUpConsultant(username, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);