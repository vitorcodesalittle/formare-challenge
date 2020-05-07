import React from 'react';
import './Button.css'
export default props => {
  return (
    <div className='Button'
      onClick={props.onClick}>
        {props.children}
    </div>
  )
}