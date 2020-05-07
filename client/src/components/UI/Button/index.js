import React from 'react';
import './Button.css'
export default props => {
  return (
    <a tabIndex='0' href='#' style={{ textDecoration:'none'}}
    onClick={props.onClick}>
      <div className='Button'>
          {props.children}
      </div>
    </a>

  )
}