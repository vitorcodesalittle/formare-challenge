import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  getUserIdFromCookie,
  getConsultantIdFromCookie,
  removeUserIdFromCookie,
  removeConsultantIdFromCookie,
  getConsultantTokenFromCookie,
  removeConsultantTokenFromCookie
} from '../../Cookie';
import { signUpUser, getUser, userLogout, signUpConsultant, getConsultant, consultantLogout } from '../../actions';

const Login = function(props) {
  const [ loginPage, setLoginPage ] = useState('user')
  const [ username, setUsername ] = useState('');
  const [ consultantCreateUsername, setConsultantCreateUsername ] = useState('');
  const [ consultantCreatePassword, setConsultantCreatePassword ] = useState('');
  const [ userHasSession, setUserHasSession ] = useState(false);
  const [ consultantHasSession, setConsultantHasSession ] = useState(false);
  const [ consultantUsername, setConsultantUsername ] = useState('');
  const [ consultantPassword, setConsultantPassword ] = useState('');

  const userId = getUserIdFromCookie();
  const consultantId = getConsultantIdFromCookie();
  const consultantToken = getConsultantTokenFromCookie();

  useEffect(() => {
    console.log(props);
    if (userId && !props.me.id && !props.me.isLoading) {
      setUserHasSession(true);
      props.getUser(userId);
    }
    if (consultantId && !props.consultantMe.id && !props.consultantMe.authLoading) {
      setConsultantHasSession(true);
      props.getConsultant(consultantId);
    }
    return () => {}
  }, [ props.me.isLoading, userId, consultantId, props.consultantMe.authLoading, consultantToken ])

  const handleLogin = () => {
    console.log('LOGIN');
    if (loginPage === 'user') {
      handleUserLogin();
    } else {
      // login as consultant
      if ((consultantHasSession || props.consultantMe.id) && consultantToken) {
        // login
        props.consultantLogin(props.consultantMe.username, consultantCreatePassword)
        // props.history.push('/consultant')
      } else {
        console.log('Signin up new consultant');
      }

    }
  }

  const handleUserLogin = () => {
    if (userHasSession || props.me.id) {
      props.history.push('/chat');
    } else {
      console.log('Signing up new user');
      props.signUpUser(username)
    }
  }

  const handleConsultantSignUp = () => {
    props.signUpConsultant(consultantCreateUsername, consultantCreatePassword);
  }

  const handleConsultantLogin = (username, password) => {
    alert('Making login with: ' + username + password);
  }

  const closeUserSession = () => {
    removeUserIdFromCookie();
    props.userLogout();
    setUserHasSession(false);
  }

  const closeConsultantSession = () => {
    removeConsultantIdFromCookie();
    removeConsultantTokenFromCookie();
    props.consultantLogout();
    setConsultantHasSession(false)
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
            <h3>Crie seu Usuário</h3>
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
          { loginPage === 'user' && <button onClick={() => handleLogin()}>{(userHasSession || props.me.id) ? "Entrar no chat" : "Cadastrar" }</button>}
          { (userHasSession || props.me.id) && loginPage === 'user' && <button onClick={closeUserSession}>Fechar sessão</button>}

        </div> :
        <div>
          { (!consultantHasSession && !props.consultantMe.id) &&
          <>
            <h3>Crie sua conta como Consultor</h3>
            <label>Username</label>
            <input type='text' onChange={e => setConsultantCreateUsername(e.target.value)} value={consultantCreateUsername}/>
            <label>Senha</label>
            <input type='password' onChange={e => setConsultantCreatePassword(e.target.value)} value={consultantCreatePassword}/>
            { loginPage === 'consultant' && <button onClick={() => handleConsultantSignUp()}>Cadastrar</button>}
          </>
          }
          {
            (consultantHasSession || props.consultantMe.id) &&
            <>
              <h3> Consultor já tem sessão </h3>
              {props.consultantMe.username && <p>{props.consultantMe.username}</p>}
              { !consultantToken && <label>Senha:</label>}
              <input type='password' onChange={e => setConsultantPassword}/>
              <button onClick={() => handleConsultantLogin(props.consultantMe.username, consultantPassword)}>Entrar como consultor</button>
              <button onClick={closeConsultantSession}>Fechar Sessão</button>
            </>
            
          }
          {
            !(consultantHasSession || props.consultantMe.id) &&
            <>
              <h3>Entrar como Consultor</h3>
              <label>Username</label>
              <input type='text' onChange={e => setConsultantUsername(e.target.value)} value={consultantUsername}></input>
              <label>Password</label>
              <input type='password' onChange={e => setConsultantPassword(e.target.value)} value={consultantPassword}></input>
              <button onClick={() => handleConsultantLogin(consultantUsername, consultantPassword)}>Entrar como consultor</button>
            </>
          }
        </div>
      }
      
    </div>
  )
}

const mapStateToProps = state => ({
  me: state.me,
  consultantMe: {
    username: state.consultantApp.username,
    id: state.consultantApp.id,
    authLoading: state.consultantApp.authLoading
  }
})

const mapDispatchToProps = dispatch => ({
  getUser: (userId) => dispatch(getUser(userId)),
  signUpUser: (username) => dispatch(signUpUser(username)),
  userLogout: () => dispatch(userLogout()),
  signUpConsultant: (username, password) => dispatch(signUpConsultant(username, password)),
  getConsultant: (id) => dispatch(getConsultant(id)),
  consultantLogout: () => dispatch(consultantLogout()),
  consultantLogin: (username, password) => dispatch()
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);