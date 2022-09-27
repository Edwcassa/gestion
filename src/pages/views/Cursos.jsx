import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useFetch } from '../../hooks/useFetch'
import { useForm } from '../../hooks/useForm'
import { crearCurso } from '../../services/CursoServices'
import Swal from 'sweetalert2'
import UseAuth from '../../auth/UseAuth'


export default function Cursos() {

  const { user } = UseAuth()

  const { data, loading, error } = useFetch('/cursos')
  // console.log(data?.cursos)

  // Estados para el modal crear
  const [show, setShow] = useState(false);

  const handleClose = () => { setShow(false); reset() }
  const handleShow = () => setShow(true);

  // capturar el form
  const [values, handleInputChange, reset] = useForm()

  // estados para crear
  const [loadingCreate, setLoadingCreate] = useState(false)
  const [loadingUpdate, setLoadingUpdate] = useState(false)

  // metodos crud
  // crear
  const create = async () => {
    if (user === null) { Swal.fire('Debe iniciar sesion !!'); return }

    setLoadingCreate(true)
    try {
      await crearCurso(values).then((res) => {
        if (res.ok) {
          Swal.fire(
            'Curso Creado!', '¡Haz clic en el botón!', 'success'
          )
        }
      })
    } catch (error) {
      Swal.fire({
        icon: 'error', title: 'Oops...', text: 'Algo salió mal!', footer: `${error}`
      })
    }
    finally { setLoadingCreate(false) }
  }

  return (
    <div>
      <h1>Cursos</h1>
      {loading && <div className="alert alert-success" role="alert">Cargando...</div>}
      {error && <div className="alert alert-danger" role="alert">{error}</div>}

      <button onClick={handleShow} className='btn btn-success my-2' disabled={false}>Crear</button>
      <table className="table table-hover">
        <thead>
          <tr className='table-secondary'>
            <th scope="col">Acciones</th>
            <th scope="col">Codigo</th>
            <th scope="col">Nombre</th>
            <th scope="col">Grupo</th>
            <th scope="col">Categoria</th>
            <th scope="col">Creditos</th>
          </tr>
        </thead>
        <tbody>
          {
            data?.cursos.map((e, i) => (
              <tr key={i}>
                <td>
                  <button className='btn btn-light me-2'><i className="fa-solid fa-pen"></i></button>
                  <button className='btn btn-danger'><i className="fas fa-trash"></i></button>
                </td>
                <td>{e.codigo}</td>
                <td>{e.nombre}</td>
                <td>{e.grupo}</td>
                <td>{e.categoria}</td>
                <td>{e.creditos}</td>
              </tr>
            ))
          }
        </tbody>
      </table>


      {/* modal crear */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crea el curso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <pre>{JSON.stringify(values, undefined, 2)}</pre> */}
          <div className='text text-danger mb-3'>Rellene todos los campos</div>
          <form>
            <div className="form-row">
              <div className="row">
                <div className="col-md-4">
                  <label>Codigo</label>
                  <input type="text" className="form-control" placeholder="Codigo" name='codigo' onChange={handleInputChange} />
                </div>
                <div className="col-md-8">
                  <label>Nombre</label>
                  <input type="text" className="form-control" placeholder="Nombre" name='nombre' onChange={handleInputChange} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label>Tipo</label>
                <select className="form-select" defaultValue={'none'} name='tipo' onChange={handleInputChange}>
                  <option value='none'>none</option>
                  <option value='teorico'>teorico</option>
                  <option value='practico'>practico</option>
                </select>
              </div>
              <div className="col">
                <label>Categoria</label>
                <select className="form-select" defaultValue={'none'} name='categoria' onChange={handleInputChange}>
                  <option value='none'>none</option>
                  <option value='OEES'>OEES</option>
                  <option value='EEEP'>EEEP</option>
                  <option value='OG'>OG</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label>Grupo</label>
                <select className="form-select" defaultValue={'none'} name='grupo' onChange={handleInputChange}>
                  <option value='none'>none</option>
                  <option value='A'>A</option>
                  <option value='B'>B</option>
                </select>
              </div>
              <div className="col">
                <label>Creditos</label>
                <input type="number" className="form-control" placeholder="Nro de creditos" name='creditos' onChange={handleInputChange} />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-secondary' onClick={handleClose}>
            Cerrar
          </button>
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => create()}
            disabled={loadingCreate} >
            {loadingCreate && <i className='fa fa-spinner fa-spin me-2 '></i>}
            {loadingCreate ? 'Espere...' : 'Crear Curso'}
          </button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

