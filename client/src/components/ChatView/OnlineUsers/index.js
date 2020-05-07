import React from 'react';

const OnlineUsers = props => {
  return (
    <div>
      <p>Usuários Online</p>
      { props.users.map((u, idx) => u && <p key={idx}>{u.username}</p>)}
    </div>
  )
}

export default OnlineUsers;