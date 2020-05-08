import React, { useState } from 'react';
import './FilterMessages.css'
import Input from '../../UI/Input';
import Button from '../../UI/Button';
import SearchSelector from './SearchSelector';

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
        <select>
          <option defaultValue={false} value={order==='asc'} onSelect={() => props.handleChangeOrder('asc')}>Da mais nova para mais antiga</option>
          <option defaultValue={false} value={order === 'des'} onSelect={() => props.handleChangeOrder('des')}>Da mais antiga para mais nova</option>        
        
        </select>
        <Button onClick={handleGetFilteredMessages}>Pegar mensagens filtradas</Button>
      </div>

    </div>
  )
}

export default FilterMessages;