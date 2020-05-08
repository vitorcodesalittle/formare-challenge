import React from 'react';
import './Checkbox.css'
export default props => (
  <div className="checkbox-container" onClick={props.onCheck}>
    <p>{props.value}</p>
    <div className={`checkbox ${props.selected ? 'checked' : ''}`}/>
  </div>
)