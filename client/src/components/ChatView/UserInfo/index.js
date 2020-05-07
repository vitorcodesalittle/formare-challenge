import React from 'react';

const UserInfo = props => {
  return (
    <div>
      <label>Username</label> 
      <p>{props.me.username}</p>

    </div>
  )
}

export default UserInfo;