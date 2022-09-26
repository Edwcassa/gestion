import axios from 'axios'
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import Swal from 'sweetalert2'
import UseAuth from '../../auth/UseAuth'
import { useForm } from '../../hooks/useForm'
import { setUserLocal } from '../../utils/user'

export default function Perfil() {

  const [showPassword, setShowPassword] = useState(false)
  const [values, handleInputChange] = useForm()

  const [loading, setLoading] = useState(false);

  // Estados para el modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //

  //estado para guardar la image seleccionada
  const [imgSelected, setImgSelected] = useState(null)
  const [updateImgLoad, setUpdateImgLoad] = useState(false)

  //imagenes
  const imagesProfile = [
    { 'img': 'https://i.postimg.cc/zfc2wwJP/descargar-2-1.png' },
    { 'img': 'https://i.postimg.cc/y6QtXSPR/aaaa-1.png' },
    { 'img': 'https://i.postimg.cc/zDCZNMDz/ZEPETO-2.png' },
    { 'img': 'https://i.postimg.cc/FHK2jHyz/descargar-3.png' },
    { 'img': 'https://i.postimg.cc/xT5wJzbB/Dv-WFXNp-Vs-AAez-KJ-1.png' }
  ]

  // datos del usuario
  const { user, setUser } = UseAuth()

  // d
  const {
    email, nombre, apellido, categoria, sexo,
    telefono, codDocente, img, contrasenia, _id } = user || {}

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    axios
      .put(`/docentes/${_id}`, values)
      .then((response) => {
        // console.log(response.data)
        if (response.data.ok) {
          const newUserData = { ...user, ...values }
          setUser(newUserData)
          setUserLocal(newUserData)
          Swal.fire(
            'Actualizado!',
            '¡Haz clic en el botón!',
            'success'
          )
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo salió mal!',
          footer: `${error.message}`
        })
      })
      .finally(() => setLoading(false));
  }

  const updateImg = async() => {
    if (!imgSelected) {
      Swal.fire('Selecciona una imagen')
      return
    }
    setUpdateImgLoad(true)
    await axios
      .put(`/docentes/${_id}`, { 'img': imgSelected })
      .then((response) => {
        // console.log(response.data)
        if (response.data.ok) {
          const newUserData = { ...user, 'img': imgSelected, }
          setUser(newUserData)
          setUserLocal(newUserData)
          Swal.fire(
            'Imagen Actualizado!',
            '¡Haz clic en el botón!',
            'success'
          )
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo salió mal!',
          footer: `${error.message}`
        })
      })
      .finally(() => setUpdateImgLoad(false))
    //cerrar el modal
    handleClose()
  }


  return (
    <div style={{ "overflow": "hidden" }}>
      {/* <pre>{JSON.stringify(values, undefined, 2)}</pre> */}
      <div className="row gutters-sm">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-column align-items-center text-center">
                <img src={img??"https://bootdey.com/img/Content/avatar/avatar7.png"} alt="Admin" className="rounded" width="150" />
                <div className="mt-3">
                  <h4>{nombre ?? ''}</h4>
                  <span className="text-muted font-size-sm">{codDocente ?? ''}</span>
                  {
                    user && <p className="text-muted font-size-sm">Unsaac, Cusco, PE</p>
                  }
                </div>
                <button type="button"
                  className="btn btn-success px-4"
                  onClick={handleShow}
                >
                  Cambiar Foto
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-7">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Email</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {
                      user && <input name='email' type="text" className="form-control" defaultValue={email ?? ''} onChange={handleInputChange} />
                    }
                    {!user && <strong>...</strong>}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Nombre</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {
                      user && <input name='nombre' type="text" className="form-control" defaultValue={nombre ?? ''} onChange={handleInputChange} />
                    }
                    {!user && <strong>...</strong>}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Apellido</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {
                      user && <input name='apellido' type="text" className="form-control" defaultValue={apellido ?? ''} onChange={handleInputChange} />
                    }
                    {!user && <strong>...</strong>}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Categoria</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {
                      user && <input type="text" className="form-control" defaultValue={categoria} disabled />
                    }
                    {!user && <strong>...</strong>}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Contraseña</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <div className='input-group'>
                      {
                        user && <input name='contrasenia' type={showPassword ? 'text' : 'password'} className="form-control" defaultValue={contrasenia ?? ''} onChange={handleInputChange} />
                      }
                      {
                        user && <button onClick={() => setShowPassword(!showPassword)} className='btn btn-light border' type='button'><i className="fa fa-eye"></i></button>
                      }
                    </div>
                    {!user && <strong>...</strong>}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Sexo</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {
                      user &&
                      <select className="form-select" name='sexo' defaultValue={sexo ?? ''} onChange={handleInputChange}>
                        <option value="f">f</option>
                        <option value="m">m</option>
                      </select>
                    }
                    {!user && <strong>...</strong>}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Telefono</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {
                      user && <input name='telefono' type="text" className="form-control" defaultValue={telefono ?? ''} onChange={handleInputChange} />
                    }
                    {!user && <strong>...</strong>}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary px-4">
                  {loading && <i className='fa fa-spinner fa-spin me-2 '></i>}
                  {loading ? 'Espere...' : 'Actualizar'}
                  {/* Actualizar */}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>


      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Elige una foto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <pre>{JSON.stringify(imgSelected, undefined, 2)}</pre>
          <div className='d-flex flex-row bd-highlight mb-3 justify-content-center'>
            {
              imagesProfile.map((e, i) => (
                <div className="form-check" key={i}>
                  <input className="form-check-input d-none" id={`radio${i}`} type="radio" name="img"
                    value={e.img}
                    onChange={(e) => setImgSelected(e.target.value)}
                    checked={imgSelected === e.img} />
                  <label className="form-check-label" htmlFor={`radio${i}`}>
                    <img width={150}
                      src={e.img} alt=""
                      className={`image_hover img-fluid rounded border border-bottom border-4 ${e.img === imgSelected && 'border-success'}`} />
                  </label>
                </div>
              ))
            }
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-secondary' onClick={handleClose}>
            Cerrar
          </button>
          <button className='btn btn-primary' onClick={()=>updateImg()} disabled={updateImgLoad}>
            {updateImgLoad && <i className='fa fa-spinner fa-spin me-2 '></i>}
            {updateImgLoad ? 'Espere...' : 'Actualizar Imagen'}
          </button>
        </Modal.Footer>
      </Modal>


    </div >
  )
}
