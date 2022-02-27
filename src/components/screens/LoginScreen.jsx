import React, { useContext, useEffect, useState } from 'react';
import {Form, Button} from 'react-bootstrap';
import Swal from 'sweetalert2'
import { AuthContext } from '../../auth/AuthContext';
import { useForm } from '../../hooks/useForm';
import { types } from '../../types/types';
import response from '../../data/data.json';
import './Login.css';
 
export const LoginScreen = ({history}) => {
    const [userData , setUserData] = useState({});

useEffect(() => {
  getUser()
}, []);

     const getUser = (email, password) => {
        const data =  response.response.users.find(user => user.email === email && user.password === password);
        setUserData(data)
        if(typeof data === 'undefined'){
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Usuario o contraseña incorrecto',
                showConfirmButton: false,
                timer: 1500
              })
        }else{

              Swal.fire({
                icon: 'success',
                title: 'Usuario cargado correctamente',
                text: "Dale click al boton de login nuevamente para entrar",
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
              })
        }
     }

    const {dispatch} = useContext(AuthContext);
    const initialState = {
        email: '',
        password: ''
    }; 
    const [formValues, handleInputChange] = useForm(initialState)

    const {email, password} = formValues;

    const handleSubmit =  (e) => {
        e.preventDefault()
        getUser(email, password);
        
            const lastPath = localStorage.getItem('lastPath') || '/';

            dispatch({
                type: types.login,
                payload: {
                    email: userData.email,
                    password: userData.password
                }
        
            })
            history.replace(lastPath)

    }

    const handleClick = (e) => {
      e.preventDefault();
      if(e.type === "click"){
        Swal.fire('Lo siento no se puede cambiar la contraseña de este json')
      }
    }
 
  return (
    <>
    <Form onSubmit={handleSubmit} className="form-login">
        <div>
            <h1>Login</h1>
        </div>
        <Form.Group className="mb-3 email" controlId="formBasicEmail">
            <Form.Control  type="email" placeholder="Enter email" name='email' value={email} onChange={handleInputChange}/>
        </Form.Group>
        <Form.Group className="mb-3 password" controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Password" name='password' value={password} onChange={handleInputChange}/>
        </Form.Group>
        <Form.Group className="mb-3 contraseña">
            <button onClick={handleClick} className='botonCon'><a className='a' href="/">Olvidaste la contraseña</a></button>
            
        </Form.Group>
        <Button className="boton-validar" variant="danger" type="submit">
            Validar usuario
        </Button>
    </Form>
    </>
  )
}
