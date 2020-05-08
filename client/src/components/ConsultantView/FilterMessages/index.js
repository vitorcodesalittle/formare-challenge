import React, { useState } from 'react';
import './FilterMessages.css'
import Input from '../../UI/Input';
import Button from '../../UI/Button';
import Checkbox from '../../UI/Checkbox';
import SearchSelector from './SearchSelector';
import { Message } from '../../ChatView/Chat'
import DateTimePicker from 'react-datetime-picker';

const FilterMessages = function({handleGetFilteredMessages,
  handleSearchUser,
  selectedUser,
  usernameFilter,
  beginDateFilter,
  endDateFilter,
  order,
  ...props}) {
  
  const [ searchOpened, setSearchOpened ] = useState(false);
  
  return (
    <div>
      <h3>Pegue mensagens filtradas por:</h3>
      <Input type='text'
        onChange={(e) => {props.handleChangeUsernameFilter(e.target.value); setSearchOpened(e.target.value !== ''); handleSearchUser(e.target.value); 
        if (e.target.value === '') props.handleChangeSelectedUser(null);
      }}
        value={usernameFilter}
        placeholder={'De todos usuários'}/>
      
    { props.search && props.search.users && searchOpened &&

    <SearchSelector users={props.search.users}
      isLoading={props.search.isLoading}
      onSelect={(user) => { props.handleChangeSelectedUser(user); setSearchOpened(false); props.handleChangeUsernameFilter(user.username); props.resetMessages()}}
      selectedUser={selectedUser}
      opened={searchOpened}/>
    }
      <p>A partir de </p>
      <div className='dtpicker'>
        <DateTimePicker maxDetail="second" onChange={date => {props.resetMessages(); props.handleChangeBeginDateFilter(date)}} value={beginDateFilter}/>
      </div>
      <p>Até</p>
      <div className='dtpicker'>
        <DateTimePicker maxDetail="second" onChange={date => {props.resetMessages(); props.handleChangeEndDateFilter(date)}} value={endDateFilter}/>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <Checkbox value="mais nova para mais antiga" selected={order === 'asc'} onCheck={() => {props.handleChangeOrder('asc'); props.resetMessages(); }}/>
        <Checkbox value="mais antiga para mais nova" selected={order === 'des'} onCheck={() => {props.handleChangeOrder('des'); props.resetMessages(); }}/>
      </div>
      <Button onClick={handleGetFilteredMessages}>Pegar mensagens filtradas</Button>
      {
        props.messages &&
        props.messages.map((msg, idx) => <Message {...msg} key={idx} onDelete={props.deleteMessage}/>)
      }
    </div>
  )
}

export default FilterMessages;