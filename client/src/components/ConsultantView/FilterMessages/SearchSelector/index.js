import React from 'react';
import './SearchSelector.css'

const SearchSelector = function({selectedUser, ...props}) {
  return (
    <div className='SearchSelector'>
      {props.users.map( (user, idx) => (
        <div key={idx} className='option' 
          onClick={() => props.onSelect(user)}>
          <p style={{ color: (selectedUser && user._id === selectedUser._id) ? 'red' : 'black'}}>
            {user.username} - {user._id}
          </p>
        </div>
      ))}
    </div>
  )
}

export default SearchSelector;