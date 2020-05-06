const STARTED = action => `STARTED_${action}`
const SUCCESS = action => `SUCCESS_${action}`
const FAILED = action => `FAILED_${action}`

// -- USER ACTIONS -- //

const CREATE_USER = 'CREATE_USER';
export const CREATE_USER_STARTED = STARTED(CREATE_USER);
export const CREATE_USER_SUCCESS = SUCCESS(CREATE_USER);
export const CREATE_USER_FAILED = FAILED(CREATE_USER)

export const USER_LOGOUT = 'USER_LOGOUT';

const GET_USER = 'GET_USER';
export const GET_USER_STARTED = STARTED(GET_USER);
export const GET_USER_SUCCESS = SUCCESS(GET_USER);
export const GET_USER_FAILED = FAILED(GET_USER);

// -- MESSAGE ACTIONS -- for users

const GET_MESSAGES = 'GET_MESSAGES';

export const GET_MESSAGES_STARTED = STARTED(GET_MESSAGES);
export const GET_MESSAGES_SUCCESS = SUCCESS(GET_MESSAGES);
export const GET_MESSAGES_FAILED = FAILED(GET_MESSAGES);

const SEND_MESSAGE = 'SEND_MESSAGE';

export const SEND_MESSAGE_STARTED = STARTED(SEND_MESSAGE);
export const SEND_MESSAGE_SUCCESS = SUCCESS(SEND_MESSAGE);
export const SEND_MESSAGE_FAILED = FAILED(SEND_MESSAGE);

const DELETE_MESSAGE = 'DELETE_MESSAGE';

export const DELETE_MESSAGE_STARTED = STARTED(DELETE_MESSAGE);
export const DELETE_MESSAGE_SUCCESS = SUCCESS(DELETE_MESSAGE);
export const DELETE_MESSAGE_FAILED = FAILED(DELETE_MESSAGE);


// -- CONSULTANT ACTIONS --

const CREATE_CONSULTANT = "CREATE_CONSULTANT";
export const CREATE_CONSULTANT_STARTED = STARTED(CREATE_CONSULTANT);
export const CREATE_CONSULTANT_SUCCESS = SUCCESS(CREATE_CONSULTANT);
export const CREATE_CONSULTANT_FAILED = FAILED(CREATE_CONSULTANT);