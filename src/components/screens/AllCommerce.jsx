import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Form, FormControl, Button, Card } from 'react-bootstrap';
import data from '../../data/data.json';
import './allcommerce.css'

export const AllCommerce = () => {

  const [pizza, setPizza] = useState([]);
  const [tabla, setTabla] = useState([]);    //contiene los datos que se muestran de forma estatica
    const [busqueda, setBusqueda] = useState(""); //aqui esta el estado de la busqueda

    const handleChange= (e) => {
      setBusqueda(e.target.value)
      filtrar(e.target.value)
  }

  const filtrar = (terminoBusqueda) => {
      let ResultadoBusqueda = tabla.filter((elemento) => {
          if(elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())){
              return elemento;
          }
      })
      setPizza(ResultadoBusqueda);
   }

  
  useEffect(() => {
    dataPizza()
  }, []);
  const dataPizza = async () => {
   const {stores} = await data.response;
console.log(stores);
   const Pizza = await stores.map((resp) => {
     return {
       id : resp.id,
       name: resp.name,
       logo: resp.logo,
       description: resp.description,
       instagram: resp.instagram,
       facebook: resp.facebook
     }
   })

   setPizza(Pizza)
   setTabla(Pizza)
   }

  return (
    <>
    <div>
        <h3 className='h3' >Tienda</h3>
        <h5 className='h5' >Escoge tu pizzeria favorita</h5>
        <Button variant='danger' to="/user/dashboard" as={Link}>Configuracion</Button>
        <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2 formStyle"
          aria-label="Search"
          value={busqueda}
                        onChange={handleChange}
        />
      </Form>
{
  pizza.map(resp => (
    <Card key={resp.id} style={{ width: '18rem', display:'inline-block', margin:'20px' }}>
    <Card.Img variant="top" src={resp.logo} />
    <Card.Body>
      <Card.Title>{resp.name}</Card.Title>
      <Card.Text>{resp.description}</Card.Text>
      <Link to={`/tienda/${resp.name}`}><Button variant="danger" >ver tienda</Button></Link>

    </Card.Body>
  </Card>
  ))
}
    </div>
    </>
  )
}
