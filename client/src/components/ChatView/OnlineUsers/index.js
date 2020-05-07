import React, { useState } from 'react';
import './OnlineUsers.css';
const OnlineUsers = function (props) {
  const [ isOpened, setIsOpened ] = useState(true);
  return (
    <div className="OnlineUsers">
      { props.users.map((u, idx) => u && 
        <div key={idx} 
          className='user-container'>
          <p>{u.username}</p>
          <div className="online-indicator"/>
        </div>
        )
      }
    </div>
  )
}

export default OnlineUsers;