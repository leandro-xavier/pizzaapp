import React from 'react';
import {useParams} from 'react-router-dom';
import {getStoreId} from '../../selectors/getStoreId';
import { Card, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {SiInstagram, SiFacebook} from "react-icons/si";
import './details.css';

export const DetailsCommerce = () => {

    const {names} = useParams();

    const store = getStoreId(names);

    const {logo, name, description, instagram, facebook, products} = store

  return (
    <>
   
    <Card className="card-principal">
    <Button className="boton-configuracion" variant='danger' to="/user/dashboard" as={Link}>Configuracion</Button> 
      <Card.Body className="card-cuerpo" >
      <Card.Img style={{width:'10rem', display:'block', margin:'auto'}} variant="top" className='card-imagen' src={logo} />
        <Card.Title className='card-titulo'>{name}</Card.Title>
        <Card.Text className="card-texto">
        {description}
        </Card.Text>
        <div className='redes-sociales' >
          <Card.Title className="contacto">Contactanos</Card.Title>
          <a className='redes' href={facebook}><SiFacebook fontSize="2em"/></a>
          <a className='redes' href={instagram}><SiInstagram  color="orange" fontSize="2em"/></a>
        </div>
      </Card.Body>
      
    </Card>

  {
    products.map(resp => (
      <Card key={resp.id} className="card-products">
      <Card.Img variant="top" src={resp.img} />
      <Card.Body>
        <Card.Title>{resp.name}</Card.Title>
      </Card.Body>
    </Card>
    ))
  }
    </>
  )
}
