import React, { useState, useEffect } from 'react'
import './Login.css';
import { connect } from 'react-redux'
import UserLogin from './UserLogin';
import ConsultantAuth from './ConsultantAuth';
import {
  getUserIdFromCookie,
  getConsultantIdFromCookie,
  removeUserIdFromCookie,
  removeConsultantIdFromCookie,
  getConsultantTokenFromCookie,
  removeConsultantTokenFromCookie
} from '../../Cookie';
import { signUpUser, getUser, userLogout, signUpConsultant, getConsultant, consultantLogout, consultantLogin } from '../../actions';
import Selector from '../UI/Selector';

const Login = function(props) {
  const [ loginPage, setLoginPage ] = useState('user')
  const [ username, setUsername ] = useState(''); // UserLogin
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
    props.consultantLogin(username, password)
      .then(logged => {
        console.log('Logged? ', logged);
        if (logged) {
          props.history.push('/consultant');
        }
      })
      .catch(err => {
        throw err;
      })
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

  const isSelected = name => loginPage === name;
  let userSelectorClassName = 'selector-option';
  userSelectorClassName += isSelected('user') ? ' selected' : ''
  let consultantSelectorClassName = 'selector-option';
  consultantSelectorClassName += isSelected('consultant') ? ' selected' : '';
  return (
    <div className="Login">
      <Selector options={[{ text: 'Usuário', onClick: () => setLoginPage('user'), selected: loginPage === 'user' }, 
        { text: 'Consultor', onClick: () => setLoginPage('consultant'), selected: loginPage === 'consultant'}]}/>
      {
        loginPage === 'user' ?
        <UserLogin userHasSession={userHasSession}
          me={props.me}
          username={username}
          handleChangeUsername={setUsername}
          handleUserLogin={handleUserLogin}
          closeUserSession={closeUserSession}/>
         :
        <ConsultantAuth consultantHasSession={consultantHasSession}
          consultantMe={props.consultantMe}
          consultantCreateUsername={consultantCreateUsername}
          consultantCreatePassword={consultantCreatePassword}
          handleChangeCreateUsername={setConsultantCreateUsername}
          handleChangeCreatePassword={setConsultantCreatePassword}
          handleConsultantSignUp={handleConsultantSignUp}
          handleConsultantLogin={handleConsultantLogin}
          consultantUsername={consultantUsername}
          consultantPassword={consultantPassword}
          handleChangeConsultantUsername={setConsultantUsername}
          handleChangeConsultantPassword={setConsultantPassword}
          closeConsultantSession={closeConsultantSession}/>
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
  consultantLogin: async (username, password) => dispatch(consultantLogin(username, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);