import React,{useContext} from 'react'
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap'
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';
import './dashboard.css'


export const Dashboard = () => {
    const {user: {email}, dispatch} = useContext(AuthContext);

    const history = useHistory()

    const handleLogout = () => {

        history.replace('/login');

        dispatch({
            type: types.logout
        });
    }

  return (
      <>
    <div >
      <h1 className='h1'>Configuracion</h1>
          <h3 className='h3'>USUARIO : {email}</h3>
        <Button className='boton' variant='outline-danger' onClick={handleLogout}>logout</Button>
    </div>
    
    </>
  )
}
