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
  PUSH_MESSAGE_TO_END
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
  chatLoading: false,
  error: null
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
    default:
      return state
  }
}

export default reducer