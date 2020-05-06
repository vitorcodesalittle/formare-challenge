import * as API from '../api';
import * as actions from './types';
import { setUserIdInCookie } from '../Cookie';

export const signUpUser = (username) => 
  dispatch => {
    dispatch({ type: actions.CREATE_USER_STARTED })
    API.signUpUser(username)
      .then(res => {
        if (res.success) {
          dispatch({ type: actions.CREATE_USER_SUCCESS, payload: res.data })
          setUserIdInCookie(res.data.user._id);
        }
        else 
          dispatch( { type: actions.CREATE_USER_FAILED, error: res.message })
      })
      .catch(err => {
        dispatch({ type: actions.CREATE_USER_FAILED, error: 'Erro no servidor' });
      })
  }

export const getUser = (userId) => 
  dispatch => {
    dispatch({ type: actions.GET_USER_STARTED })
    API.getUsers(userId)
      .then(res => {
        console.log(res);
        if (res.success && res.data.users.length > 0) {
          dispatch({ type: actions.GET_USER_SUCCESS, payload: res.data });
        } else if (res.success && res.data.users.length === 0) {
          dispatch({ type: actions.GET_USER_SUCCESS, error: 'Nenhum usuário com id ' + userId });
        } else {;
          dispatch({ type: actions.GET_USER_SUCCESS, error: res.message });
        }
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: actions.GET_USER_FAILED })
      })
  }
export const userLogout = () => 
  dispatch => {
    dispatch({ type: actions.USER_LOGOUT })
  }

export const getOldMessages = (skip, limit) => 
  dispatch => {
    dispatch({ type: actions.GET_MESSAGES_STARTED })
    API.getMessages(skip, limit)
      .then(res => {
        console.log(res);
        if (res.success) {
          dispatch({ type: actions.GET_MESSAGES_SUCCESS, payload: res.data })
        } else {
          dispatch({ type: actions.GET_MESSAGES_FAILED, error: res.message })
        }
      })
      .catch(err => {
        console.log('Erro inesperado: ', err);
        dispatch({ type: actions.GET_MESSAGES_FAILED, error: 'Erro no servidor' })
      })
  }

export const pushMessageToEnd = (message) =>
  dispatch => {
    dispatch({ type: actions.PUSH_MESSAGE_TO_END, payload: { message }})
  }