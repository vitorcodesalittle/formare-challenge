import querystring from 'querystring';
import { getConsultantTokenFromCookie } from './Cookie';

export const getUsers = async (userId, onlyOnline) => {

  let query = {}
  if (userId) query.userId = userId;
  if (onlyOnline) query.onlyOnline = true;

  return fetch('/users?' + querystring.stringify(query), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
}

export const signUpUser = async (username) => {
  return fetch('/users', {
    method: 'POST',
    body: JSON.stringify({
      username
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json());
}

export const getMessages = async (skip = 0, limit = 50, username, beginDate, endDate, order) => {
  let query = { skip, limit };
  if (username) query.username = username;
  if (beginDate) query.beginDate = beginDate;
  if (endDate) query.endDate = endDate;
  if (order) query.order = order;
  return fetch('/messages?' + querystring.stringify(query), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then( res => {
    return res;
  })
  .catch(err => {
    console.log('Erro ao pegar mensagens: ', err);
    throw err;
  })
}

// not used
export const sendMessage = async (content, authorId) => {
  return fetch('/messages', {
    method: 'POST',
    body: {
      content,
      userId: authorId
    }
  })
  .then(res => res.json())
}


export const signUpConsultant = async ( username, password ) => {
  return fetch('/consultant', {
    method: "POST",
    body: JSON.stringify({
      username,
      password
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
}

export const loginConsultant = async (username, passoword) => {
  return fetch('/consultant/login', {
    method: 'POST',
    body: JSON.stringify({
      username,
      password
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
}

export const deleteMessage = async (messageId) => {
  let token = getConsultantTokenFromCookie();
  if (!token) {
    throw new Error('Você deve estar logado como consultor para deletar uma mensagem.');
  }
  return fetch('/messages/' + messageId, {
    method: 'DELETE',
    headers: {
      'authorization': getConsultantTokenFromCookie() // pegar do cookie
    }  
  })
  .then(res => res.json()) 
}  
