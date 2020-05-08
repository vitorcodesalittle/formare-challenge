import Cookie from 'js-cookie';

const userKey = 'user_id'
const consultantKey = 'consultant_id'
const consultantTokenKey = 'consultant_token';

export const getUserIdFromCookie = () => {
  let userId = Cookie.get(userKey);
  return userId;
}

export const setUserIdInCookie = (userId) => {
  Cookie.set(userKey, userId, {
    expires: 1 // expira em 1 dia
  })
  return true;
} 

export const removeUserIdFromCookie = () => {
  Cookie.set(userKey, '')
  Cookie.remove(userKey, { path: '', domain: "localhost"});
  return true;
}

export const getConsultantIdFromCookie = () => {
  let consultantId = Cookie.get(consultantKey);
  return consultantId;
}

export const setConsultantIdInCookie = (consultantId) => {
  Cookie.set(consultantKey, consultantId, {
    expires: 1
  })
  return true;
}

export const removeConsultantIdFromCookie = () => {
  Cookie.remove(consultantKey, { path: ''});
}

export const getConsultantTokenFromCookie = () => {
  let token = Cookie.get(consultantTokenKey);
  return token;
}

export const setConsultantTokenInCookie = (token) => {
  Cookie.set(consultantTokenKey, token, {
    expires: 1
  })
  return true;
}

export const removeConsultantTokenFromCookie = () => {
  Cookie.remove(consultantTokenKey, { path: '' });
}