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