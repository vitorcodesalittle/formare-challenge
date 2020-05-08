import React, { useEffect, useState } from 'react';
import './Groups.css';

const Group = props => (
  <div className="group-container"
    onClick={() => props.toggleOpen(props.idx)}>
    <p>Grupo - {props.idx}</p>
    {
      props.isOpen &&
      <div className='user-container'>
        {props.users.map((u, idx) => (
          <div key={idx} className='user-item'>
            <p>{u.username}</p>
          </div>
        ))}
      </div>
    }
  </div>
)

const Groups = function(props) {
  
  const { groups } = props;
  const [ groupIsOpen, setGroupIsOpen ] = useState([])
  useEffect(() => {
    if (groups) {
      setGroupIsOpen(new Array(groups.length).fill(false, 0, groups.length));
    }
    // console.log('Effect of groups');
    // console.log(groups && groups.length, groups);
    // console.log(groupIsOpen);
    return () => {}
  }, [ groups ])

  return (
    <div className='Groups'>
      { groups && groups.map((gr, idx) => (
        <Group idx={idx} users={gr} isOpen={groupIsOpen[idx]} key={idx} toggleOpen={idx => { setGroupIsOpen(groupIsOpen.map((value, i) => (idx === i) ? !value : value )); }}></Group>
      ))}
    </div>
  )
}

export default Groups;
