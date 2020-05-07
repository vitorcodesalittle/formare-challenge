import React from 'react';
import './Input.css'

export default (props) => {

  return (
    <div className='Input' style={props.style ? { ...props.style } : {} }>
      <input type={props.type} onChange={props.onChange} value={props.value} placeholder={props.placeholder}/>
      <div className="horizontal-line"></div>
    </div>
  )
}