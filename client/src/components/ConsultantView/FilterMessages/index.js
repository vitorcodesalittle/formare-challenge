import React, { useState } from 'react';
import './FilterMessages.css'
import Input from '../../UI/Input';
import Button from '../../UI/Button';
import Checkbox from '../../UI/Checkbox';
import SearchSelector from './SearchSelector';
import { Message } from '../../ChatView/Chat'

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
        onChange={(e) => {props.handleChangeUsernameFilter(e.target.value); setSearchOpened(e.target.value !== ''); handleSearchUser(e.target.value)}}
        value={usernameFilter}
        placeholder={'De todos usuários'}/>
      
    { props.search && props.search.users && searchOpened &&

    <SearchSelector users={props.search.users}
      isLoading={props.search.isLoading}
      onSelect={(user) => { props.handleChangeSelectedUser(); setSearchOpened(false); props.handleChangeUsernameFilter(user.username)}}
      selectedUser={selectedUser}
      opened={searchOpened}/>
    }

        
      <Input  type='text' 
        placeholder="DD/MM/AAAA hh:mm:ss" 
        value={beginDateFilter} 
        onChange={e => props.handleChangeBeginDateFilter(e.target.value)}/>
      <Input 
        type='text'
        placeholder="DD/MM/AAAA hh:mm:ss"
        value={endDateFilter}
        onChange={e => props.handleChangeEndDateFilter(e.target.value)}/>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <Checkbox value="mais nova para mais antiga" selected={order === 'asc'} onCheck={() => props.handleChangeOrder('asc')}/>
        <Checkbox value="mais antiga para mais nova" selected={order === 'des'} onCheck={() => props.handleChangeOrder('des')}/>
      </div>
      <Button onClick={handleGetFilteredMessages}>Pegar mensagens filtradas</Button>
      {
        props.messages &&
        props.messages.map((msg, idx) => <Message {...msg} key={idx}/>)
      }
    </div>
  )
}

export default FilterMessages;