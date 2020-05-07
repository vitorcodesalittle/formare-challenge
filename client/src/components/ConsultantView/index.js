import React, { useState, useEffect } from 'react';
import { getDateObject, formatDate } from '../../dateHelpers';
import { connect } from 'react-redux'
import { getFilteredMessages, searchUser } from '../../actions';
const ConsultantView = function (props) {

  const [ usernameFilter, setUsernameFilter ] = useState('');
  const [ selectedUser, setSelectedUser ] = useState(null);
  const [ beginDateFilter, setBeginDateFilter ] = useState('20/10/1998 20:30:30');
  const [ endDateFilter, setEndDateFilter ] = useState('20/10/2020 11:30:30');
  const [ order, setOrder ] = useState('asc') // asc : mais nova pra mais antiga --- des : mais antiga pra mais nova'

  const [ usersBatchSize , setUsersBatchSize ] = useState('117');
  const [ numberOfGroups, setNumberOfGroups ] = useState('4');

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
    let beginDate, endDate, username, first = 'newer';
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
    if (usernameFilter) {
      username = usernameFilter // GET USER ID BY SEARCHING
    }
    if (order === 'asc'){
      first = 'newer';
    } else {
      first = 'older'
    }
    console.log('Getting messages with params: ', beginDate, endDate, username, first);
    props.getFilteredMessages(undefined, beginDate, endDate, first, props.messages.length || 0);
  }

  const handleSearchUser = (username) => {
    if (username > 1 && !props.search.isLoading) {
      props.searchUsers(username);
    }
  }

  const handleGetUsers = () => {
    alert(`Getting ${usersBatchSize} users`);
  }
  const handleDivideInGroups = () => {
    alert(`Dividing in ${numberOfGroups} groups`);
  }

  return (
    <div>
      <h1>
        Consultant View
      </h1>
      <div>
        <h3>Pegue mensagens filtradas por:</h3>
        <label>Busque um usuário</label>
        <input type='text' onChange={(e) => {setUsernameFilter(e.target.value); handleSearchUser(e.target.value)}} value={usernameFilter} />
        <label>Data de início</label>
        <input type='text' placeholder="DD/MM/AAAA hh:mm:ss" value={beginDateFilter} onChange={e => setBeginDateFilter(e.target.value)}/>
        <label>Data final</label>
        <input type='text' placeholder="DD/MM/AAAA hh:mm:ss" value={endDateFilter} onChange={e => setEndDateFilter(e.target.value)}/>
        <label>Ordem</label>
        <select>
          <option defaultValue={false} value={order==='asc'} onSelect={() => setOrder('asc')}>Da mais nova para mais antiga</option>
          <option defaultValue={false} value={order === 'des'} onSelect={() => setOrder('des')}>Da mais antiga para mais nova</option>        
        </select>
        <button onClick={handleGetFilteredMessages}>Pegar mensagens filtradas</button>
      </div>

      <div>
        <h3>Pegue usuários e separe-os em grupos!</h3>
        <label>Número de usuários:</label>
        <input type="number" value={usersBatchSize} onChange={e => setUsersBatchSize(e.target.value)} />
        <label>Número de grupos a dividir</label>
        <input type="number" value={numberOfGroups} onChange={e => setNumberOfGroups(e.target.value)} />
        <button onClick={handleGetUsers}>Pegar Usuários</button>
        <button onClick={handleDivideInGroups}>Dividir Usuários</button>
      </div>


    </div>
  )
}

const mapStateToProps = state => ({
  messages: state.consultantApp.filteredMessages,
  search: state.consultantApp.search
})

const mapDispatchToProps = dispatch => ({
  getFilteredMessages: (username, beginDate, endDate, order, skip, limit) => dispatch(getFilteredMessages(username, beginDate, endDate, order, skip, limit)),
  searchUsers: (username) => dispatch(searchUser(username))

})

export default connect(mapStateToProps, mapDispatchToProps)(ConsultantView);