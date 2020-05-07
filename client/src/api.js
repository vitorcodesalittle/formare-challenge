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

export const getMessages = async (skip = 0, limit = 50, userId, beginDate, endDate, order) => {
  let query = { skip, limit };
  if (userId) query.userId = userId;
  if (beginDate) query.beginDate = beginDate.toString();
  if (endDate) query.endDate = endDate.toString();
  if (order) query.order = order;
  console.log(query);
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
  console.log('CADASTRANDO CONSULTANT')
  return fetch('/consultants', {
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
  .catch(err => {
    throw err;
  })
}

export const loginConsultant = async (username, password) => {
  console.log('LOGIN DO CONSULNTAT')
  return fetch('/consultants/login', {
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
  .catch(err => {
    throw err
  })
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
  .catch(err => {
    throw err;
  })
}  

export const getConsultant = async (consultantId) => {
  console.log('PEGANDO CONSULTANT')
  return fetch('/consultants/' + consultantId, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .catch(err => {
    throw err;
  })
}
