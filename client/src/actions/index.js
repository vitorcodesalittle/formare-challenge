import * as API from '../api';
import * as actions from './types';
import { setUserIdInCookie, removeUserIdFromCookie, setConsultantIdInCookie, getConsultantIdFromCookie, removeConsultantIdFromCookie, setConsultantTokenInCookie, removeConsultantTokenFromCookie } from '../Cookie';

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
          removeUserIdFromCookie();
        } else {;
          dispatch({ type: actions.GET_USER_SUCCESS, error: res.message });
          removeUserIdFromCookie();
        }
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: actions.GET_USER_FAILED })
        removeUserIdFromCookie();
      })
  }
export const userLogout = () => 
  dispatch => {
    dispatch({ type: actions.USER_LOGOUT })
  }

export const getOldMessages = (skip, limit) => 
  dispatch => {
    dispatch({ type: actions.GET_MESSAGES_STARTED })
    return API.getMessages(skip, limit)
      .then(res => {
        console.log(res);
        if (res.success) {
          dispatch({ type: actions.GET_MESSAGES_SUCCESS, payload: res.data })
          return true;
        } else {
          dispatch({ type: actions.GET_MESSAGES_FAILED, error: res.message })
          return false;
        }
      })
      .catch(err => {
        console.log('Erro inesperado: ', err);
        dispatch({ type: actions.GET_MESSAGES_FAILED, error: 'Erro no servidor' })
        return false;
      })
  }

export const pushMessageToEnd = (message) =>
  dispatch => {
    dispatch({ type: actions.PUSH_MESSAGE_TO_END, payload: { message }})
  }

export const getOnlineUsers = () => 
  dispatch => {
    dispatch({ type: actions.GET_ONLINE_USERS_STARTED })
    API.getUsers(null, true)
      .then(response => {
        console.log(response);
        if (response.success) {
          dispatch({ type: actions.GET_ONLINE_USERS_SUCCESS, payload: response.data })
        } else {
          dispatch({ type: actions.GET_ONLINE_USERS_FAILED, error: response.message })
        }
      })
      .catch(err => {
        dispatch({ type: actions.GET_ONLINE_USERS_FAILED, error: 'Erro no servidor' })
      })
  }

export const pushUser = (user) => 
  dispatch => {
    dispatch({ type: actions.PUSH_USER, payload: { user } })
  }
export const removeUser = (user) => 
  dispatch => {
    dispatch({ type: actions.REMOVE_USER, payload: { user }})
  }

export const signUpConsultant = (username, password) => 
  dispatch => {
    dispatch({ type: actions.CREATE_CONSULTANT_STARTED })
    API.signUpConsultant(username, password)
      .then(res => {
        if (res.success) {
          dispatch({ type: actions.CREATE_CONSULTANT_SUCCESS, payload: res.data })
          setConsultantIdInCookie(res.data.consultant._id)
        } else {
          dispatch({ type: actions.CREATE_CONSULTANT_FAILED, error: res.message })
        }
      })
      .catch(err => {
        dispatch({ type: actions.CREATE_CONSULTANT_FAILED, error: 'Erro no servidor'})
      })
  }
export const getConsultant = (consultantId) => 
  dispatch => {
    dispatch({ type: actions.GET_CONSULTANT_STARTED });
    API.getConsultant(consultantId)
      .then(res => {
        if (res.success) {
          dispatch({ type: actions.GET_CONSULTANT_SUCCESS, payload: res.data })
        } else {
          dispatch({ type: actions.GET_CONSUNTANT_FAILED, error: res.error })
          removeConsultantIdFromCookie();
        }
      })
      .catch(err => {
        dispatch({ type: actions.GET_CONSUNTANT_FAILED, error: 'Erro no srevidor' })
        removeConsultantIdFromCookie();
      })
  }
export const consultantLogout = () =>
  dispatch => {
    dispatch({ type: actions.CONSULTANT_LOGOUT })
  }

export const consultantLogin = (username, password) =>
  dispatch => {
    dispatch({ type: actions.LOGIN_CONSULTANT_STARTED })
    console.log('FAZENDO LOGIN!');
    return API.loginConsultant(username, password)
      .then(res => {
        console.log(res);
        if (res.success) {
          setConsultantIdInCookie(res.userId)
          setConsultantTokenInCookie(res.token);
          dispatch({ type: actions.LOGIN_CONSULTANT_SUCCESS})
          return true;
        } else {
          dispatch({ type: actions.LOGIN_CONSULTANT_FAILED, error: res.message })
          removeConsultantIdFromCookie();
          removeConsultantTokenFromCookie();
          return false;
        }
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: actions.LOGIN_CONSULTANT_FAILED, error: 'Erro no servidor'})
        removeConsultantIdFromCookie();
        removeConsultantTokenFromCookie();
        return false;
      })
  }

export const getFilteredMessages = (userId, beginDate, endDate, order, skip = 0, limit = 100) => 
  dispatch => {
    dispatch({ type: actions.GET_FILTERED_MESSAGES_STARTED });
    API.getMessages(skip, limit, userId, beginDate, endDate, order)
      .then(res => {
        console.log(res);
        if (res.success) {
          dispatch({ type: actions.GET_FILTERED_MESSAGES_SUCCESS, payload: res.data })
        } else {
          dispatch({ type: actions.GET_FILTERED_MESSAGES_FAILED, payload: res.data })
        }
      })
      .catch(err => {
        dispatch({ type: actions.GET_FILTERED_MESSAGES_FAILED, error: 'Erro no servidor'})
        throw err;
      })
  }

export const searchUser = (username) =>
  dispatch => {
    dispatch({ type: actions.SEARCH_USER_STARTED })
    API.getUsers(undefined, undefined, username)
      .then(res => {
        console.log('response: ', res);
        if (res.success) {
          dispatch({ type: actions.SEARCH_USER_SUCCESS, payload: res.data })
        } else {
          dispatch({ type: actions.SEARCH_USER_FAILED, error: res.message })
        }
      })
      .catch(err => {
        dispatch({ type: actions.SEARCH_USER_FAILED, error: 'Erro no servidor'})
        throw err;
      })
  }

export const getUsersBatch = (size) =>
  dispatch => {
    dispatch({ type: actions.GET_USERS_BATCH_STARTED })
    API.getUsers(undefined, undefined, undefined, size)
      .then(res => {
        if (res.success) {
          dispatch({ type: actions.GET_USERS_BATCH_SUCCESS, payload: res.data })
        } else {
          dispatch({ type: actions.GET_USERS_BATCH_FAILED, error: res.message })
        }
      })
      .catch(err => {
        dispatch({ type: actions.GET_USERS_BATCH_FAILED, error: 'Erro no servidor.'})
      })
  }
export const resetMessages = () =>
  dispatch => {
    dispatch({ type: actions.RESET_MESSAGES })
  }

export const deleteMessage = messageId =>
  dispatch => {
    dispatch({ type: actions.DELETE_MESSAGE_STARTED });
    API.deleteMessage(messageId)
      .then(res => {
        if (res.success) {
          dispatch({ type: actions.DELETE_MESSAGE_SUCCESS, payload: { message: { _id: messageId }} })
        } else {
          dispatch({ type: actions.DELETE_MESSAGE_FAILED, error: res.message })
        }
      })
      .catch(err => {
        dispatch({ type: actions.DELETE_MESSAGE_FAILED, error: 'Erro no servidor'})
      })
  }