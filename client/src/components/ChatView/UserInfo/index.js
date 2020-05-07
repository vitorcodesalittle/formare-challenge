import React from 'react';
import './UserInfo.css'

const UserInfo = props => {
  return (
    <div className='UserInfo'>
      <p style={{ marginLeft: 5, marginRight: 'auto'}}>Súper Chat!</p>
      <p style={{ marginRight: 10}}>Bem vindo, {props.me.username}!</p>
    </div>
  )
}

export default UserInfo;