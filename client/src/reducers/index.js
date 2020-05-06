import { 
  CREATE_USER_STARTED,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILED,
  GET_USER_STARTED,
  GET_MESSAGES_SUCCESS,
  GET_USER_FAILED,
  GET_USER_SUCCESS,
  USER_LOGOUT
 } from "../actions/types";

const initialState = {
  me: {
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
    default:
      return state
  }
}

export default reducer