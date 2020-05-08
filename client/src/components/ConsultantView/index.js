import React, { useState, useEffect } from 'react';
import { getDateObject, formatDate } from '../../dateHelpers';
import { connect } from 'react-redux'
import { getFilteredMessages, searchUser, getUsersBatch } from '../../actions';
import Selector from '../UI/Selector';
import FilterMessages from './FilterMessages';
import MakeGroups from './MakeGroups';
const ConsultantView = function (props) {

  const [ actionPage, setActionPage ] = useState('get_messages');

  const [ usernameFilter, setUsernameFilter ] = useState('');
  const [ selectedUser, setSelectedUser ] = useState(null);
  const [ beginDateFilter, setBeginDateFilter ] = useState('20/10/1998 20:30:30');
  const [ endDateFilter, setEndDateFilter ] = useState('20/10/2020 11:30:30');
  const [ order, setOrder ] = useState('asc') // asc : mais nova pra mais antiga --- des : mais antiga pra mais nova'

  const [ usersBatchSize , setUsersBatchSize ] = useState('117');
  const [ numberOfGroups, setNumberOfGroups ] = useState('4');

  const [ groups, setGroups ] = useState(null);

  useEffect( () => {
    console.log(props)
    return () => {}
  }, [props])

  const getDateParts = (dateString) => {
    let dateObj = {}
    let parts = dateString.split(' ');
    console.log(parts);
    if (parts.length > 0) {
      let date = parts[0];
      let dateParts = date.split('/');
      if (dateParts < 3) {
        console.log(dateString + ' é inválida')
        return false;
      }
      dateObj.AAAA = dateParts[2];
      dateObj.MM = dateParts[1];
      dateObj.DD = dateParts[0]
    }

    if (parts.length > 1) {
      let time = parts[1];
      let timeParts = time.split(':');
      console.log(timeParts);
      if (timeParts.length > 0) {
        dateObj.hh = timeParts[0]
      } else {
        dateObj.hh = '0';
      }
      if (timeParts.length > 1) {
        dateObj.mm = timeParts[1];
      } else {
        dateObj.mm = '0'
      }
      if (timeParts.length > 2) {
        dateObj.ss = timeParts[2];
      } else {
        dateObj.ss = '0';
      }
    } else {
      dateObj = { ...dateObj, hh: '0', mm: '0', ss: '0'}
    }

    let newDateObj = {}
    Object.keys(dateObj).map(key => {
      newDateObj[key] = parseInt(dateObj[key])
    })

    return newDateObj;
  }

  const handleGetFilteredMessages = () => {
    let beginDate, endDate, userId, first = 'newer';
    if (beginDateFilter) {
      let beginDateObj = getDateParts(beginDateFilter);
      console.log(beginDateObj)
      beginDate = getDateObject(beginDateObj.AAAA, beginDateObj.MM, beginDateObj.DD, beginDateObj.hh, beginDateObj.mm, beginDateObj.ss);
    }
    if (endDateFilter) {
      let endDateObj = getDateParts(endDateFilter);
      console.log(endDateObj)
      endDate = getDateObject(endDateObj.AAAA, endDateObj.MM, endDateObj.DD, endDateObj.hh, endDateObj.mm, endDateObj.ss);
    }
    if (selectedUser) {
      userId = selectedUser._id // GET USER ID BY SEARCHING
    }
    if (order === 'asc'){
      first = 'newer';
    } else {
      first = 'older'
    }
    console.log('Getting messages with params: ', beginDate, endDate, userId, first);
    props.getFilteredMessages(userId, beginDate, endDate, first, 0);
  }

  const handleSearchUser = (username) => {
    console.log('Searching username: ', username, props.search.isLoading)
    if (username.length > 1 && !props.search.isLoading) {
      console.log('Searching actions!')
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
    console.log(users);
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
          search={props.search}/> :
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
  messages: state.consultantApp.filteredMessages,
  search: state.consultantApp.search,
  users: state.consultantApp.users,
  usersLoading: state.consultantApp.usersLoading
})

const mapDispatchToProps = dispatch => ({
  getFilteredMessages: (username, beginDate, endDate, order, skip, limit) => dispatch(getFilteredMessages(username, beginDate, endDate, order, skip, limit)),
  searchUsers: (username) => dispatch(searchUser(username)),
  getUsersBatch: (size) => dispatch(getUsersBatch(size))

})

export default connect(mapStateToProps, mapDispatchToProps)(ConsultantView);