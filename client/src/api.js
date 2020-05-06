import querystring from 'querystring';

export const getUsers = async (userId, onlyOnline) => {

  let query = {}
  if (userId) query.userId = userId;
  if (onlyOnline) query.onlyOnline = true;

  return fetch('/users?' + querystring.stringify(query), {
    method: 'GET'
  })
  .then(res => res.json())
}

export const signUpUser = async (username) => {
  console.log('Username: ', username);
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

export const getMessages = async (skip = 0, limit = 50) => {
  return fetch('/messages?' + querystring.stringify({ skip, limit }), {
    method: 'GET',
  })
  .then(res => res.json())
}

export const sendMessage = async (content, authorId) => {
  return fetch('/messages', {
    method: 'POST',
    body: {
      content,
      userId: authorId
    }
  })
}


export const signUpConsultant = async ( username, password ) => {
  return fetch('/consultant', {
    method: "POST",
    body: {
      username,
      password
    }
  })
}

export const deleteMessage = async (messageId) => {
  return fetch('/messages/' + messageId, {
    method: 'DELETE',
    headers: {
      'authorization': '' // pegar do cookie
    }  
  })  
}  
