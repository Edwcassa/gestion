import axios from 'axios'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import UseAuth from '../../auth/UseAuth'
import { useForm } from '../../hooks/useForm'
import { setUserLocal } from '../../utils/user'

export default function Perfil() {

  const [showPassword, setShowPassword] = useState(false)
  const [values, handleInputChange] = useForm()

  const [loading, setLoading] = useState(false)

  // const [openModal, setOpenModal] = useState(false)

  const { user, setUser } = UseAuth()

  const {
    email, nombre, apellido, categoria, sexo,
    telefono, codDocente, img, contrasenia, _id } = user || {}

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    axios
      .put(`/docentes/${_id}`, values)
      .then((response) => {
        console.log(response.data)
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

  return (
    <div style={{ "overflow": "hidden" }}>
      {/* <pre>{JSON.stringify(values, undefined, 2)}</pre> */}
      <div className="row gutters-sm">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-column align-items-center text-center">
                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150" />
                <div className="mt-3">
                  <h4>{nombre ?? ''}</h4>
                  <span className="text-muted font-size-sm">{codDocente ?? ''}</span>
                  {
                    user && <p className="text-muted font-size-sm">Unsaac, Cusco, PE</p>
                  }
                </div>
                <button type="button"
                  className="btn btn-success px-4"
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

    </div>
  )
}
