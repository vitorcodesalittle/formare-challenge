import React from 'react';
import './MakeGroups.css'
import Input from '../../UI/Input/';
import Button from '../../UI/Button';

const MakeGroups = function({ usersBatchSize, numberOfGroups, handleGetUsers, handleDivideInGroups, ...props }) {
  return (
    <div>
      <div>
        <h3>Pegue usuários e separe-os em grupos!</h3>
        <div className="input-container">
          <p># de usuários</p>
          <Input type="number"
            value={usersBatchSize}
            onChange={e => props.handleChangeUsersBatchSize(e.target.value)}
            placeholder="Número de usuários"
            style={{ width: '100%'}}/>
        </div>
        <div className="input-container">
          <p># de grupos</p>
          <Input placeholder="Número de grupos"
            type="number"
            value={numberOfGroups}
            onChange={e => props.handleChangeNumberOfGroups(e.target.value)}
            style={{ width: '100%'}}/>

        </div>
        <Button onClick={handleGetUsers}>Pegar Usuários</Button>
        <Button onClick={handleDivideInGroups}>Dividir Usuários</Button>
      </div>

      <div>
        { props.users &&
          props.users.map((u, idx) => <p key={idx}>{u.username}</p>)
        }
      </div>
    </div>
  )
}

export default MakeGroups;