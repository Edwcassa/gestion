import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Alert, Button, Form, Modal } from 'react-bootstrap'
import Swal from 'sweetalert2'
import UseAuth from '../../auth/UseAuth'
import { useForm } from '../../hooks/useForm'

export default function Docentes() {

  const { user } = UseAuth()

  const [docentes, setDocentes] = useState(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const [values, handleInputChange, reset] = useForm()
  const [loadingPost, setLoadingPost] = useState(false)

  // Estados para el modal editar
  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => { setShowEdit(false); reset() }
  const handleShowEdit = (elem) => {
    setShowEdit(true)
    setConsolaSelec(elem)
    // console.log(elem)
  }
  const [consolaSelec, setConsolaSelec] = useState(null)


  // Estados para el modal crear
  const [show, setShow] = useState(false);
  const handleClose = () => { setShow(false); reset() }
  const handleShow = () => setShow(true);

  // ******************
  const getAllDocentes = async () => {
    setLoading(true)
    await axios.get('/docentes')
      .then(response => setDocentes(response.data.docentes))
      .catch(e => setError(e))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getAllDocentes()
  }, [])

  const crearDocente = async () => {
    if (user === null) { Swal.fire('Debe iniciar sesion !!'); return }

    setLoadingPost(true)
    values.esAdmin === 'true' ? values.esAdmin = true : values.esAdmin = false
    // console.log(values)
    await axios.post('/docentes', values)
      .then(response => {
        if (response.data.ok) {
          Swal.fire('Docente Creado!', 'enhorabuena', 'success')
          setDocentes([...docentes, response.data.docente])
        }
      })
      .catch((e) => { Swal.fire('Ohh noo!', `${e.message}`, 'error') })
      .finally(() => setLoadingPost(false))
  }

  const editarDocente = async (id) => {
    if (user === null) { Swal.fire('Debe iniciar sesion !!'); return }

    setLoadingPost(true)
    values.esAdmin === 'true' ? values.esAdmin = true : null
    // console.log(values)
    await axios.put(`/docentes/${id}`, values)
      .then(response => {
        if (response.data.ok) {
          // console.log('res',response.data.docente)
          Swal.fire('Docente Editado!', 'enhorabuena', 'success')
          const docenteidx = docentes.findIndex((e) => e._id === id)
          docentes[docenteidx] = {...docentes[docenteidx], ...response.data.docente}
        }
      })
      .catch((e) => { Swal.fire('Ohh noo!', `${e.message}`, 'error') })
      .finally(() => setLoadingPost(false))
  }

  const eliminarDocente = async (id) => {
    if (user === null) { Swal.fire('Debe iniciar sesion !!'); return }

    // console.log(values)
    await axios.delete(`/docentes/${id}`)
      .then(response => {
        if (response.data.ok) {
          Swal.fire('Docente Eliminado!', 'enhorabuena', 'success')
          setDocentes(docentes.filter((e) => e._id != id))
        }
      })
      .catch((e) => { Swal.fire('Ohh noo!', `${e.message}`, 'error') })
  }

  return (
    <>
      <h1>Docentes</h1>
      {error && <div className="alert alert-danger" role="alert">{error.message}</div>}

      <button className='btn btn-success my-2'
        onClick={handleShow}>
        Crear
      </button>
      <table className="table table-hover">
        <thead>
          <tr className='table-secondary'>
            <th>Acciones</th>
            <th>Codigo</th>
            <th>Email</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Categoria</th>
            <th>Telefono</th>
            <th>Admin</th>
          </tr>
        </thead>
        <tbody>
          {loading && <tr><td><Alert variant="success">Cargando...</Alert></td></tr>}
          {
            docentes?.map((e, i) => (
              <tr key={i}>
                <td>
                  <button onClick={() => handleShowEdit(e)} className='btn btn-light me-2'><i className="fa-solid fa-pen"></i></button>
                  <button onClick={() => eliminarDocente(e._id)} className='btn btn-danger'><i className="fas fa-trash"></i></button>
                </td>
                <td>{e.codDocente}</td>
                <td>{e.email}</td>
                <td>{e.nombre}</td>
                <td>{e.apellido}</td>
                <td>{e.categoria}</td>
                <td>{e.telefono}</td>
                <td>{(e.esAdmin) ? <i className="fas fa-check text text-success fs-4 "></i> : <i className="fas fa-times text text-danger fs-4"></i>}</td>
              </tr>
            ))
          }
        </tbody>
      </table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crea un docente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <pre>{JSON.stringify(values, undefined, 2)}</pre> */}
          <div className='text text-danger mb-3'>Rellene todos los campos</div>
          <Form>
            <Form.Group className="row">
              <Form.Group className='col-md-4'>
                <Form.Label>Codigo</Form.Label>
                <Form.Control type="text" placeholder="codigo" name='codDocente' onChange={handleInputChange} />
              </Form.Group>
              <Form.Group className='col-md-8'>
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" placeholder="email" name='email' onChange={handleInputChange} />
              </Form.Group>
            </Form.Group>
            <Form.Group className="row">
              <Form.Group className='col-md-4'>
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" placeholder="nombre" name='nombre' onChange={handleInputChange} />
              </Form.Group>
              <Form.Group className='col-md-8'>
                <Form.Label>Apellido</Form.Label>
                <Form.Control type="text" placeholder="apellido" name='apellido' onChange={handleInputChange} />
              </Form.Group>
            </Form.Group>
            <Form.Group className="row">
              <Form.Group className='col-md-6'>
                <Form.Label>Sexo</Form.Label>
                <Form.Select defaultValue={'none'} name='sexo' onChange={handleInputChange}>
                  <option value='none'>none</option>
                  <option value='m'>m</option>
                  <option value='f'>f</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className='col-md-6'>
                <Form.Label>Categoria</Form.Label>
                <Form.Select defaultValue={'none'} name='categoria' onChange={handleInputChange}>
                  <option value='none'>none</option>
                  <option value='nombrado'>nombrado</option>
                  <option value='contratado'>contratado</option>
                </Form.Select>
              </Form.Group>
            </Form.Group>
            <Form.Group className="row">
              <Form.Group className='col-md-6'>
                <Form.Label>Es admin</Form.Label>
                <Form.Select defaultValue={'false'} name='esAdmin' onChange={handleInputChange}>
                  <option value='false'>no</option>
                  <option value='true'>si</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className='col-md-6'>
                <Form.Label>Telefono</Form.Label>
                <Form.Control type="text" placeholder="telefono" name='telefono' onChange={handleInputChange} />
              </Form.Group>
            </Form.Group>
            <Form.Group className='col-md-6'>
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="text" placeholder="contraseña" name='contrasenia' onChange={handleInputChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={() => crearDocente()} disabled={loadingPost}>
            {loadingPost ? 'Espere...' : 'Crear Docente'}
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edita al docente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <pre>{JSON.stringify(values, undefined, 2)}</pre> */}
          {/* <div className='text text-danger mb-3'>Rellene todos los campos</div> */}
          <Form>
            <Form.Group className="row">
              <Form.Group className='col-md-4'>
                <Form.Label>Codigo</Form.Label>
                <Form.Control type="text" placeholder="codigo" defaultValue={consolaSelec?.codDocente} name='codDocente' onChange={handleInputChange} />
              </Form.Group>
              <Form.Group className='col-md-8'>
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" placeholder="email" defaultValue={consolaSelec?.email} name='email' onChange={handleInputChange} />
              </Form.Group>
            </Form.Group>
            <Form.Group className="row">
              <Form.Group className='col-md-4'>
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" placeholder="nombre" defaultValue={consolaSelec?.nombre} name='nombre' onChange={handleInputChange} />
              </Form.Group>
              <Form.Group className='col-md-8'>
                <Form.Label>Apellido</Form.Label>
                <Form.Control type="text" placeholder="apellido" defaultValue={consolaSelec?.apellido} name='apellido' onChange={handleInputChange} />
              </Form.Group>
            </Form.Group>
            <Form.Group className="row">
              <Form.Group className='col-md-6'>
                <Form.Label>Sexo</Form.Label>
                <Form.Select defaultValue={consolaSelec?.sexo} name='sexo' onChange={handleInputChange}>
                  <option value='none'>none</option>
                  <option value='m'>m</option>
                  <option value='f'>f</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className='col-md-6'>
                <Form.Label>Categoria</Form.Label>
                <Form.Select defaultValue={consolaSelec?.categoria} name='categoria' onChange={handleInputChange}>
                  <option value='none'>none</option>
                  <option value='nombrado'>nombrado</option>
                  <option value='contratado'>contratado</option>
                </Form.Select>
              </Form.Group>
            </Form.Group>
            <Form.Group className="row">
              <Form.Group className='col-md-6'>
                <Form.Label>Es admin</Form.Label>
                <Form.Select defaultValue={consolaSelec?.esAdmin} name='esAdmin' onChange={handleInputChange}>
                  <option value='false'>no</option>
                  <option value='true'>si</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className='col-md-6'>
                <Form.Label>Telefono</Form.Label>
                <Form.Control type="text" placeholder="telefono" defaultValue={consolaSelec?.telefono} name='telefono' onChange={handleInputChange} />
              </Form.Group>
            </Form.Group>
            <Form.Group className='col-md-6'>
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="text" placeholder="contraseña" defaultValue={consolaSelec?.contrasenia} name='contrasenia' onChange={handleInputChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={() => editarDocente(consolaSelec._id)} disabled={loadingPost}>
            {loadingPost ? 'Espere...' : 'Editar Docente'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}