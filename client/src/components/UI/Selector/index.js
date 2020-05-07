import React from 'react';

export default props => {
  return (
    <div className='selector'>
      {
        props.options.map((opt, idx, A) => {
        return <>
          <div className={`selector-option ${ opt.selected ?'selected' : ''}`}
            onClick={opt.onClick}
            key={idx}
            selected={opt.selected}>
            <p>{opt.text}</p>
          </div>
          { ( idx !== A.length - 1 )&& <div className='verticalline'></div>}
        </>
        })
      }
    </div>
  )
}