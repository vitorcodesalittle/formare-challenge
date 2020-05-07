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

const GET_ONLINE_USERS = 'GET_ONLINE_USERS';
export const GET_ONLINE_USERS_STARTED = STARTED(GET_ONLINE_USERS);
export const GET_ONLINE_USERS_SUCCESS = SUCCESS(GET_ONLINE_USERS);
export const GET_ONLINE_USERS_FAILED = FAILED(GET_ONLINE_USERS);

export const PUSH_USER = 'PUSH_USER';
export const REMOVE_USER = 'REMOVE_USER';

// -- MESSAGE ACTIONS -- for users

const GET_MESSAGES = 'GET_MESSAGES';

export const GET_MESSAGES_STARTED = STARTED(GET_MESSAGES);
export const GET_MESSAGES_SUCCESS = SUCCESS(GET_MESSAGES);
export const GET_MESSAGES_FAILED = FAILED(GET_MESSAGES);

const SEND_MESSAGE = 'SEND_MESSAGE';

export const SEND_MESSAGE_STARTED = STARTED(SEND_MESSAGE);
export const SEND_MESSAGE_SUCCESS = SUCCESS(SEND_MESSAGE);
export const SEND_MESSAGE_FAILED = FAILED(SEND_MESSAGE);

export const PUSH_MESSAGE_TO_END = 'PUSH_MESSAGE_TO_END';

const DELETE_MESSAGE = 'DELETE_MESSAGE';

export const DELETE_MESSAGE_STARTED = STARTED(DELETE_MESSAGE);
export const DELETE_MESSAGE_SUCCESS = SUCCESS(DELETE_MESSAGE);
export const DELETE_MESSAGE_FAILED = FAILED(DELETE_MESSAGE);


// -- CONSULTANT ACTIONS --

const CREATE_CONSULTANT = "CREATE_CONSULTANT";
export const CREATE_CONSULTANT_STARTED = STARTED(CREATE_CONSULTANT);
export const CREATE_CONSULTANT_SUCCESS = SUCCESS(CREATE_CONSULTANT);
export const CREATE_CONSULTANT_FAILED = FAILED(CREATE_CONSULTANT);

const LOGIN_CONSULTANT = "LOGIN_CONSULTANT";
export const LOGIN_CONSULTANT_STARTED = STARTED(LOGIN_CONSULTANT);
export const LOGIN_CONSULTANT_SUCCESS = SUCCESS(LOGIN_CONSULTANT);
export const LOGIN_CONSULTANT_FAILED = FAILED(LOGIN_CONSULTANT);

const GET_FILTERED_MESSAGES = "GET_FILTERED_MESSAGES";
export const GET_FILTERED_MESSAGES_STARTED = STARTED(GET_FILTERED_MESSAGES);
export const GET_FILTERED_MESSAGES_SUCCESS = SUCCESS(GET_FILTERED_MESSAGES);
export const GET_FILTERED_MESSAGES_FAILED = FAILED(GET_FILTERED_MESSAGES);

const GET_CONSULTANT = 'GET_CONSULTANT';
export const GET_CONSULTANT_STARTED = STARTED(GET_CONSULTANT);
export const GET_CONSULTANT_SUCCESS = SUCCESS(GET_CONSULTANT);
export const GET_CONSUNTANT_FAILED = FAILED(GET_CONSULTANT);

export const CONSULTANT_LOGOUT = 'CONSULTANT_LOGOUT'

const GET_USERS_BATCH = 'GET_USERS_BATCH'
export const GET_USERS_BATCH_STARTED = STARTED(GET_USERS_BATCH);
export const GET_USERS_BATCH_SUCCESS = SUCCESS(GET_USERS_BATCH);
export const GET_USERS_BATCH_FAILED = FAILED(GET_USERS_BATCH)
