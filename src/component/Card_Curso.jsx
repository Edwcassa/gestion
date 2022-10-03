import React from 'react'
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

export default function Card_Curso({ path, codigo, nombre }) {

  const navigate = useNavigate()
  const navigateDetalle = (path) => {
    navigate(path)
  }

  return (
    <>
      <Card className='card__css me-3' onClick={() => navigateDetalle(path)} style={{ width: '16rem' }}>
        <Card.Img variant="top" src="https://picsum.photos/300/150" />
        <Card.Body>
          <Card.Title><p>{codigo}</p></Card.Title>
          <hr />
          <Card.Text className='fs-5'>
            {nombre}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}
