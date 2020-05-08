import React, { useState, useEffect } from 'react';
import { getDateObject, formatDate } from '../../dateHelpers';
import { connect } from 'react-redux'
import { getFilteredMessages, searchUser, getUsersBatch, resetMessages, deleteMessage, consultantLogout, getConsultant } from '../../actions';
import Selector from '../UI/Selector';
import FilterMessages from './FilterMessages';
import MakeGroups from './MakeGroups';
import { getConsultantIdFromCookie, getConsultantTokenFromCookie } from '../../Cookie';


const ConsultantInfo = function(props) {
  return (
    <div style={{ backgroundColor: 'aquamarine', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 10, paddingLeft: 10 }}>
      <p onClick={() => props.consultantLogout()}>Sair</p>      <p>Bem vindo, {props.consultant.username}</p>
    </div>
  )
}

const ConsultantView = function (props) {

  const [ actionPage, setActionPage ] = useState('get_messages');

  const [ usernameFilter, setUsernameFilter ] = useState('');
  const [ selectedUser, setSelectedUser ] = useState(null);
  const [ beginDateFilter, setBeginDateFilter ] = useState(new Date(new Date().setHours(new Date().getHours() - 1)));
  const [ endDateFilter, setEndDateFilter ] = useState(new Date());
  const [ order, setOrder ] = useState('asc') // asc : mais nova pra mais antiga --- des : mais antiga pra mais nova'

  const [ usersBatchSize , setUsersBatchSize ] = useState('117');
  const [ numberOfGroups, setNumberOfGroups ] = useState('4');

  const [ groups, setGroups ] = useState(null);

  const consultantId = getConsultantIdFromCookie();
  const consultantToken = getConsultantTokenFromCookie();

  useEffect( () => {
    let hasSession = consultantId && consultantToken;
    if (!hasSession) {
      props.consultantLogout();
      props.history.push('/');
    }
    if (hasSession && !props.me.id && !props.authLoading) {
      props.getConsultant(consultantId)
    }
    console.log(props);
    return () => {}
  }, [props.me.id, consultantId])

  const handleGetFilteredMessages = () => {
    let beginDate, endDate, userId, first = 'newer';
    if (beginDateFilter) {
      beginDate = beginDateFilter
    }
    if (endDateFilter) {
      endDate = endDateFilter;
    }
    if (selectedUser) {
      userId = selectedUser._id // GET USER ID BY SEARCHING
    }
    if (order === 'asc'){
      first = 'newer';
    } else {
      first = 'older'
    }
    props.getFilteredMessages(userId, beginDate, endDate, first, props.messages.length);
  }

  const handleSearchUser = (username) => {
    if (username.length > 1 && props.search && !props.search.isLoading) {
      props.searchUsers(username);
    }
  }

  const shuffleArray = (array) => {
    if (!Array.isArray(array)) {
      console.log('Cant perform shuffle on a non-array object')
      return false;
    }
    let currentIdx = 0
    while(currentIdx !== array.length) {
      let randomIdx = Math.floor(Math.random() * array.length);
      let tmp = array[currentIdx]
      array[currentIdx] = array[randomIdx];
      array[randomIdx] = tmp;
      currentIdx += 1;
    }
    return array;
  }

  const handleGetUsers = () => {
    // alert(`Getting ${usersBatchSize} users`);
    props.getUsersBatch(usersBatchSize)
  }
  const handleDivideInGroups = () => {
    const {users} = props;
    let randomPosUsers = shuffleArray(users);
    if (!Array.isArray(users)) {
      console.log('Erro: props.users não é um array');
      return false;
    }
    let remainingUsers = randomPosUsers.length;
    const groups = [];
    for (let i = 0; i < parseInt(numberOfGroups); i++) {
      groups.push([]);
    }
    let groupIdx = 0;
    while(remainingUsers !== 0) {
      remainingUsers -= 1;
      groups[groupIdx].push(randomPosUsers[remainingUsers]);
      groupIdx = (groupIdx + 1) % parseInt(numberOfGroups);
    }
    setGroups(groups);
  }

  let selectorOptions = [
    {
      onClick: () => setActionPage('get_messages'),
      text: 'Filtrar mensagens',
      selected: actionPage === 'get_messages'
    },
    {
      onClick: () => setActionPage('make_groups'),
      text: 'Fazer grupos',
      selected: actionPage === 'make_groups'
    }
  ]

  return (
    <div>
      <ConsultantInfo consultant={{...props.me}} consultantLogout={props.consultantLogout}/>
      <Selector options={selectorOptions}/>
      {
        actionPage === 'get_messages' ?
        <FilterMessages handleSearchUser={handleSearchUser}
          usernameFilter={usernameFilter}
          beginDateFilter={beginDateFilter}
          endDateFilter={endDateFilter}
          order={order}
          handleGetFilteredMessages={handleGetFilteredMessages}
          selectedUser={selectedUser}
          handleChangeUsernameFilter={setUsernameFilter}
          handleChangeBeginDateFilter={setBeginDateFilter}
          handleChangeEndDateFilter={setEndDateFilter}
          handleChangeOrder={setOrder}
          handleChangeSelectedUser={setSelectedUser}
          search={props.search}
          messages={props.messages}
          resetMessages={props.resetMessages}
          deleteMessage={props.deleteMessage}/> :
        <MakeGroups usersBatchSize={usersBatchSize}
          numberOfGroups={numberOfGroups}
          handleGetUsers={handleGetUsers}
          handleDivideInGroups={handleDivideInGroups}
          handleChangeUsersBatchSize={setUsersBatchSize}
          handleChangeNumberOfGroups={setNumberOfGroups}
          users={props.users}
          groups={groups}/>
      } 

    </div>
  )
}

const mapStateToProps = state => ({
  me: {
    id: state.consultantApp.id,
    username: state.consultantApp.username
  },
  authLoading: state.consultantApp.authLoading,
  messages: state.consultantApp.filteredMessages,
  search: state.consultantApp.search,
  users: state.consultantApp.users,
  usersLoading: state.consultantApp.usersLoading
})

const mapDispatchToProps = dispatch => ({
  getFilteredMessages: (username, beginDate, endDate, order, skip, limit) => dispatch(getFilteredMessages(username, beginDate, endDate, order, skip, limit)),
  searchUsers: (username) => dispatch(searchUser(username)),
  getUsersBatch: (size) => dispatch(getUsersBatch(size)),
  resetMessages: () => dispatch(resetMessages()),
  deleteMessage: messageId => dispatch(deleteMessage(messageId)),
  getConsultant: (id) => dispatch(getConsultant(id)),
  consultantLogout: () => dispatch(consultantLogout())
})

export default connect(mapStateToProps, mapDispatchToProps)(ConsultantView);