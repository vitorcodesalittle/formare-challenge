import React from 'react';

export default props => {
  return (
    <div className='selector'>
      {
        props.options.map((opt, idx, A) => {
        return (
          <div className={`selector-option ${ opt.selected ?'selected' : ''}`}
            onClick={opt.onClick}
            selected={opt.selected}
            key={idx}>
            <p>{opt.text}</p>
          </div>  
          )
        })
      }
    </div>
  )
}