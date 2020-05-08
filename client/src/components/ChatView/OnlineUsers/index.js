import React, { useState } from 'react';
import './OnlineUsers.css';
import closeIcon from '../../../assets/close.png';
import crowdIcon from '../../../assets/crowd.png';
const iconSize = 30;
const OnlineUsers = function (props) {
  const [ isOpened, setIsOpened ] = useState(true);

  let openControl = null;
  let containerCSSClasses = ['container']
  if (isOpened) {
    openControl = <div onClick={() => setIsOpened(false)}><img src={closeIcon} width={iconSize} height={iconSize} className='icon'/></div>
    containerCSSClasses.push('openDownAnimation')
  } else {
    openControl = <div onClick={() => setIsOpened(true)}><img src={crowdIcon} width={iconSize} height={iconSize} className='icon crowd'></img></div>
    containerCSSClasses.push('closeUpAnimation')  
  }
  return (
    <div className='OnlineUsers'>
      { openControl }
      <div className={containerCSSClasses.join(' ')}>
        { props.users.map((u, idx) => u && 
          <div key={idx} 
            className='online-user-container'>
            <p>{u.username}</p>
            <div className="online-indicator"/>
          </div>
          )
        }
      </div>
    </div>
  )
}

export default OnlineUsers;