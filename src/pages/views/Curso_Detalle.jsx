import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Button, Card, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import UseAuth from '../../auth/UseAuth'
import Progress from '../../component/Progress'

export default function Curso_Detalle() {

  const { courseId } = useParams()
  const { user } = UseAuth()

  const [curso, setCurso] = useState(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  // Estados para el modal asistencia
  const [show, setShow] = useState(false);
  const handleClose = () => { setShow(false); }
  const handleShow = () => setShow(true);

  const [loadingPost, setLoadingPost] = useState(false)

  // Estados para el modal plan sesiones
  const [showplan, setShowplan] = useState(false);
  const handleCloseplan = () => { setShowplan(false); }
  const handleShowplan = () => setShowplan(true);

  // Estados para el modal historial
  const [showhistory, setShowhistory] = useState(false);
  const handleClosehistory = () => { setShowhistory(false); }
  const handleShowhistory = () => setShowhistory(true);


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

  const registrarAsistencia = () => {
    if (user === null) { Swal.fire('Debe iniciar sesion !!'); return }

    setLoadingPost(true)
    setTimeout(() => {
      handleClose()
      setLoadingPost(false)
      Swal.fire('Ohh noo!', `Error 500`, 'error')
    }, 2000)
  }


  const alumnos = [
    'CASSA-LIPA-EDWAR YURI',
    'CUSIHUAMAN-AUCCACUSI-LUIS ALDAIR',
    'QUISPE-TITTO-JOEL WILLY',
    'TINTAYA-TACO-YUREMA LISBETH',
    'PEREIRA-CHINCHERO-RICHARD MIKHAEL',
    'ESPEJO-FRANCO-MELISSA BRIGGITTE',
    'VILLASANTE-LEON-AMARU',
    'FARFAN_ENRIQUEZ-GABRIELA',
    'ARCE-QUISPE-RUTH MILAGROS',
    'CAHUATA-LAVILLA-YOLMY MILAGROS',
    'HUAMAN-ATAYUPA-LISBET PAOLA',
    'DEL CASTILLO-OVALLE-LUZ MARINA',
    'VILLALOBOS-QUISPE-PAMELA ARACELY',
  ]

  var f = new Date();
  var diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
  var hoy = diasSemana[f.getDay()] + ' ' + f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear()

  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }


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
                <Button onClick={handleShowplan} variant="primary">
                  Plan de sesiones
                </Button>
                <br />
                <br />
                <br />
                <h4>Asistencia diaria</h4>
                <Button onClick={handleShow} className='w-100' variant='success'>
                  Marcar Asistencia
                </Button>
                <br />
                <br />
                <Button onClick={handleShowhistory} className='w-100' variant='secondary'>
                  Historial
                </Button>
              </div>
            }
          </Col>
        </Row>
      </Container >

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <span>Asistencia</span>
            <h5 className='text-danger'>{hoy}</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Lista</h5>
          <Form>
            {
              alumnos.map((e, i) => (
                <Form.Check key={i}
                  id={e}
                  label={e}
                />
              ))
            }
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={() => registrarAsistencia()} disabled={loadingPost}>
            {loadingPost ? 'Espere...' : 'Registrar'}
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal show={showplan} onHide={handleCloseplan}>
        <Modal.Header closeButton>
          <Modal.Title>
            <span>Plan de sesiones</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <strong>Unidad 1: INTRODUCCIÓN, TECNOLOGIAS</strong> <br />
          <strong>Capitulo 1: Introducción a la programacion</strong> <br />
          Tema 1: Definiciones <br />
          Tema 2: Sectores y aplicaciones <br />
          Tema 3: Sistemas de aplicaciones <br />
          Tema 4: Conceptos Necesarios <br />
          <strong>Capitulo 2: Analisis del computador</strong> <br />
          Tema 1: Estructura de un computador <br />
          Tema 2: Circuitos <br />
          Tema 3: Recursividad <br />
          Tema 4: Memoria del computador <br />
          Tema 5: Transformaciones Compuestas <br />
          <strong>Unidad 2: APLICACIONES</strong> <br />
          Capitulo 1: Paginas web <br />
          <strong></strong>
          Tema 1: Introducción a react js <br />
          Tema 2: Estados y Hooks <br />
          Tema 3: useContext para valores globales <br />
        </Modal.Body>
      </Modal>


      <Modal size='lg' show={showhistory} onHide={handleClosehistory}>
        <Modal.Header closeButton>
          <Modal.Title>
            <span>HISTORIAL DE ASISTENCIA</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            alumnos.map((e, i) => (
              <>
                <p className='ms-3'>{e}</p>
                <Progress done={getRndInteger(50,101)} time={(i + 1) * 0.2} />
              </>
            ))
          }

        </Modal.Body>
      </Modal>

    </>
  )
}
