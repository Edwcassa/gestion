import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Alert, Button, Form, Modal } from 'react-bootstrap'
import Swal from 'sweetalert2'
import UseAuth from '../../auth/UseAuth'
import { useForm } from '../../hooks/useForm'

export default function Carga_Academica() {

  const { user } = UseAuth()

  const [carga, setCarga] = useState(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const [docentes, setDocentes] = useState(null)
  const [cursos, setCursos] = useState(null)

  const [values, handleInputChange, reset] = useForm()
  const [loadingPost, setLoadingPost] = useState(false)

  // Estados para el modal crear
  const [show, setShow] = useState(false);
  const handleClose = () => { setShow(false); reset() }
  const handleShow = () => setShow(true);

  // ******************
  const getAllCarga = async () => {
    setLoading(true)
    await axios.get('/matriculas')
      .then(response => setCarga(response.data.matriculas))
      .catch(e => setError(e))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getAllCarga()
    getDocentes()
    getCursos()
  }, [])

  const crearCarga = async () => {
    if (user === null) { Swal.fire('Debe iniciar sesion !!'); return }

    setLoadingPost(true)
    // console.log(values)
    await axios.post('/matriculas', values)
      .then(response => {
        if (response.data.ok) {
          Swal.fire('Asignado!', 'enhorabuena', 'success')
          getAllCarga()
        } else { Swal.fire('Ohh noo!', `${response.data.msg}`, 'error') }
      })
      .catch((e) => { Swal.fire('Ohh noo!', `${e.message}`, 'error') })
      .finally(() => setLoadingPost(false))
  }

  const eliminarCarga = async (id) => {
    if (user === null) { Swal.fire('Debe iniciar sesion !!'); return }

    // console.log(values)
    await axios.delete(`/matriculas/${id}`)
      .then(response => {
        if (response.data.ok) {
          Swal.fire('Eliminado!', 'enhorabuena', 'success')
          getAllCarga()
        }
      })
      .catch((e) => { Swal.fire('Ohh noo!', `${e.message}`, 'error') })
  }


  // devolver los cursos y docentes
  const getDocentes = async () => {
    setLoading(true)
    await axios.get('/docentes')
      .then(response => setDocentes(response.data.docentes))
      .catch(e => { throw new Error(e) })
  }
  const getCursos = async () => {
    setLoading(true)
    await axios.get('/cursos')
      .then(response => setCursos(response.data.cursos.filter((e) => e.asignado == false)))
      .catch(e => { throw new Error(e) })
  }

  return (
    <>
      <h1>Carga Academica</h1>
      <button className='btn btn-success my-2'
        onClick={handleShow}>
        Crear
      </button>
      {error && <div className="alert alert-danger" role="alert">{error.message}</div>}
      <table className="table table-hover">
        <thead>
          <tr className='table-secondary'>
            <th>Acciones</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Curso</th>
          </tr>
        </thead>
        <tbody>
          {loading && <tr className='border-light'><td><strong>loading..</strong><div className="spinner-border spinner-border-sm ms-2" role="status"></div></td></tr>}
          {
            carga?.map((e, i) => (
              <tr key={i}>
                <td>
                  <button onClick={() => eliminarCarga(e._id)} className='btn btn-danger'><i className="fas fa-trash"></i></button>
                </td>
                <td>{e.usuario.nombre}</td>
                <td>{e.usuario.apellido}</td>
                <td>{e.curso.nombre}</td>
              </tr>
            ))
          }
        </tbody>
      </table>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Asignacion Carga Academica</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <pre>{JSON.stringify(values, undefined, 2)}</pre> */}
          <div className='text text-danger mb-3'>Rellene todos los campos</div>
          <Form>
            <Form.Group>
              <Form.Label>Docente</Form.Label>
              <Form.Select defaultValue={'none'} name='usuario' onChange={handleInputChange}>
                <option value='none'>...elige</option>
                {
                  docentes?.map((e, i) => (
                    <option key={i} value={e._id}>{e.nombre + ' ' + e.apellido}</option>
                  ))
                }
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Curso</Form.Label>
              <Form.Select defaultValue={'none'} name='curso' onChange={handleInputChange}>
                <option value='none'>...elige</option>
                {
                  cursos?.map((e, i) => (
                    <option key={i} value={e._id}>{e.nombre}</option>
                  ))
                }
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={() => crearCarga()} disabled={loadingPost}>
            {loadingPost ? 'Espere...' : 'Asignar Carga'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
