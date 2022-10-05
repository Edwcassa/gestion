import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Button, Card, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import UseAuth from '../../auth/UseAuth'

export default function Curso_Detalle() {

  const { courseId } = useParams()
  const { user } = UseAuth()

  const [curso, setCurso] = useState(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)


  // ************
  const getDataCurso = async () => {
    setLoading(true)
    await axios.get(`/cursos/${courseId}`)
      .then(response => setCurso(response.data.curso))
      .catch(e => setError(e))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getDataCurso()
  }, [])


  return (
    <>
      {loading && <><strong>loading..</strong><div className="spinner-border spinner-border-sm ms-2" role="status"></div></>}

      {error && <div className="alert alert-danger" role="alert">{error.message}</div>}

      <Container>
        <Row>
          <Col>
            <h2>{curso?.nombre}</h2>
          </Col>
          <Col></Col>
        </Row>
        <br />
        <Row>
          <Col>
            <div className='border rounded p-3'>
              <h3 className='text-muted mb-3'>{curso?.codigo}</h3>
              <Row>
                <Col><strong>Grupo:</strong></Col>
                <Col><p>{curso?.grupo}</p></Col>
                <Col></Col>
              </Row>
              <Row>
                <Col><strong>Categoria:</strong></Col>
                <Col><p>{curso?.categoria}</p></Col>
                <Col></Col>
              </Row>
              <Row>
                <Col><strong>Horario:</strong></Col>
                {
                  !loading &&
                  <Col>
                    <span className='bg-secondary text-white p-1 rounded me-2'>MA</span>
                    <span>07-09</span>
                    <div className='my-2'></div>
                    <span className='bg-secondary text-white p-1 rounded me-2'>JU</span>
                    <span>11-13</span>
                  </Col>
                }
                <Col></Col>
              </Row>
              <br />
              <Row>
                <Col><strong>Creditos:</strong></Col>
                <Col><p>{curso?.creditos}</p></Col>
                <Col></Col>
              </Row>
              <Row>
                <Col><strong>Tipo:</strong></Col>
                <Col><p>{curso?.tipo}</p></Col>
                <Col></Col>
              </Row>
            </div>
          </Col>
          <Col>
          {
            !loading && 
            <div>
              <h5>Mi plan de sesiones</h5>
              <Button className='' variant="primary">
                Plan de sesiones
              </Button>
              <br />
              <br />
              <br />
              <h4>Asistencia diaria</h4>
              <Button className='w-100' variant='success'>
                Marcar Asistencia
              </Button>
              <br />
              <br />
              <Button className='w-100' variant='secondary'>Historial</Button>
            </div>
          }
          </Col>
        </Row>
      </Container >



    </>
  )
}
