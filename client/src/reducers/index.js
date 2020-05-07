import { 
  CREATE_USER_STARTED,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILED,
  GET_USER_STARTED,
  GET_MESSAGES_SUCCESS,
  GET_USER_FAILED,
  GET_USER_SUCCESS,
  USER_LOGOUT,
  GET_MESSAGES_STARTED,
  GET_MESSAGES_FAILED,
  PUSH_MESSAGE_TO_END,
  GET_ONLINE_USERS_STARTED,
  GET_ONLINE_USERS_SUCCESS,
  GET_ONLINE_USERS_FAILED,
  PUSH_USER,
  REMOVE_USER,
  CREATE_CONSULTANT_STARTED,
  CREATE_CONSULTANT_SUCCESS,
  CREATE_CONSULTANT_FAILED,
  GET_CONSULTANT_STARTED,
  GET_CONSULTANT_SUCCESS,
  GET_CONSUNTANT_FAILED,
  CONSULTANT_LOGOUT,
  LOGIN_CONSULTANT_STARTED,
  LOGIN_CONSULTANT_SUCCESS,
  LOGIN_CONSULTANT_FAILED,
  GET_FILTERED_MESSAGES_STARTED,
  GET_FILTERED_MESSAGES_SUCCESS,
  GET_FILTERED_MESSAGES_FAILED,
  SEARCH_USER_STARTED,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_FAILED
 } from "../actions/types";

const initialState = {
  me: {
    isLoading: false
    // id: '',
    // username: ''
  },
  users: [
    // { 
    //   id: '',
    //   username: ''
    // }
  ],
  messages: [
    // { 
    //   content: '',
    //   authorId: '',
    //   createdAt: ''
    // }
  ],
  consultantApp: {
    username: undefined,
    id: undefined,
    filteredMessages: [],
    users: [],
    userGroups: [],
    messagesLoading: false, // true enquanto pega mensagens por filtro
    authLoading: false, // true enquanto cria consultant ou autentica
    usersLoading: false, // true enquanto busca usuários ou separa em grupos
    search: {
      isLoading: false,
      users: []
    }
  },
  chatLoading: false,
  error: null,
}

const reducer = function(state = initialState, action) {
  console.log(action);
  const { payload, error } = action;
  switch(action.type) {
    case CREATE_USER_STARTED:
      return {
        ...state,
        me: {
          isLoading: true,
        }
      }
      case CREATE_USER_SUCCESS:
        return {
          ...state,
          me: {
            isLoading: false,
            id: payload.user._id,
            username: payload.user.username
        }
      }
    case CREATE_USER_FAILED:
      return {
        ...state,
        me: {
          isLoading: false
        },
        error
      }
    case USER_LOGOUT:
      return {
        ...state,
        me: {}
      }
    case GET_USER_STARTED:
      return {
        ...state,
        me: {
          isLoading: true
        }
      }
      case GET_USER_SUCCESS:
        return {
          ...state,
          me: {
            isLoading: false,
            id: payload.users[0]._id,
            username: payload.users[0].username
        }
      }
    case GET_USER_FAILED:
      return {
        ...state,
        error,
        me: {
          isLoading: false
        }
      }
    case GET_MESSAGES_STARTED:
      return {
        ...state,
        chatLoading: true
      }
    case GET_MESSAGES_SUCCESS:
      let messages = [ ...action.payload.messages, ...state.messages ];
      return {
        ...state,
        messages,
        chatLoading: false
      }
    case GET_MESSAGES_FAILED:
      return {
        ...state,
        error,
        chatLoading: false
      }
    case PUSH_MESSAGE_TO_END:
      let newMessages = [ ...state.messages, payload.message ]
      return {
        ...state,
        messages: newMessages
      }
    case GET_ONLINE_USERS_STARTED:
      return {
        ...state,
        usersLoading: true
      }
    case GET_ONLINE_USERS_SUCCESS:
      return {
        ...state,
        users: payload.users
      }
    case GET_ONLINE_USERS_FAILED: 
      return {
        ...state,
        error
      }
    case PUSH_USER:
      return {
        ...state,
        users: [...state.users, payload.user]
      }
    case REMOVE_USER:
      let newUsers;
      if (!payload.user || !payload.user._id) {
        newUsers = state.users
      } else {
        newUsers = state.users.filter(u => u._id !== payload.user._id);
      }
      return {
        ...state,
        users: newUsers
      }
    case CREATE_CONSULTANT_STARTED:
      return {
        ...state,
        consultantApp: {
          ...state.consultantApp,
          authLoading:true
        }
      }
    case CREATE_CONSULTANT_SUCCESS:
      return {
        ...state,
        consultantApp: {
          ...state.consultantApp,
          username: payload.consultant.username,
          id: payload.consultant._id,
          authLoading: false
        }
      }
    case CREATE_CONSULTANT_FAILED:
      return {
        ...state,
        consultantApp: {
          ...state.consultantApp,
          authLoading: false
        },
        error
      }
    case GET_CONSULTANT_STARTED:
      return {
        ...state,
        consultantApp: {
          ...state.consultantApp,
          authLoading: true
        }
      }
    case GET_CONSULTANT_SUCCESS:
      return {
        ...state,
        consultantApp: {
          ...state.consultantApp,
          username: payload.consultant.username,
          id: payload.consultant._id,
          authLoading: false
        }
      }
    case GET_CONSUNTANT_FAILED:
      return {
        ...state,
        consultantApp: {
          ...state.consultantApp,
          authLoading: false
        },
        error
      }
    case CONSULTANT_LOGOUT:
      return {
        ...state,
        consultantApp: {}
      }
    case LOGIN_CONSULTANT_STARTED:
      return {
        ...state,
        consultantApp:{
          ...state.consultantApp,
          authLoading: true
        }
      }
    case LOGIN_CONSULTANT_SUCCESS:
      return {
        ...state,
        consultantApp: {
          ...state.consultantApp,
          authLoading: false
        }
      }
    case LOGIN_CONSULTANT_FAILED:
      return {
        ...state,
        consultantApp: {
          ...state.consultantApp,
          authLoading: false
        },
        error
      }
    case GET_FILTERED_MESSAGES_STARTED:
      return {
        ...state,
        consultantApp: {
          ...state.consultantApp,
          messagesLoading: true
        }
      }
    case GET_FILTERED_MESSAGES_SUCCESS:
      return {
        ...state,
        consultantApp: {
          ...state.consultantApp,
          filteredMessages: [ ...payload.messages, ...state.consultantApp.filteredMessages],
          messagesLoading: false
        }
      }
    case GET_FILTERED_MESSAGES_FAILED:
      return {
        ...state,
        consultantApp: {
          ...state.consultantApp,
          messagesLoading: false
        },
        error
      }
    case SEARCH_USER_STARTED:
      return {
        ...state,
        consultantApp: {
          ...state.consultantApp,
          search: {
            ...state.consultantApp.search,
            isLoading: true
          }
        }
      }
    case SEARCH_USER_SUCCESS:
      return {
        ...state,
        consultantApp: {
          ...state.consultantApp,
          search: {
            isLoading: false,
            users: [...state.consultantApp.search.users, ...payload.users]
          }
        }
      }
    case SEARCH_USER_FAILED:
      return {
        ...state,
        consultantApp: {
          ...state.consultantApp,
          search: {
            ...state.consultantApp.search,
            isLoading: false
          }
        }
      }
    default:
      return state
  }
}

export default reducer