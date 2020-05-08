import React from 'react';
import './Button.css'
export default props => {
  return (
    <a tabIndex='0' href='#' style={{ textDecoration:'none', cursor: 'default'}}
    onClick={() => props.disabled ? null : props.onClick()}>
      <div className={`Button ${props.disabled ? 'disabled' : ''}`}>
          {props.children}
      </div>
    </a>

  )
}