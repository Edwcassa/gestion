import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UseAuth from '../auth/UseAuth'
import { useField } from '../hooks/useField'
import { setUserLocal } from '../utils/user'

export default function LoginPage() {

  const style = {
    imgborde: {
      "borderRadius": "1rem 0 0 1rem"
    },
    letter: {
      "letterSpacing": "1px"
    },
    borderadius: {
      "borderRadius": "1rem"
    },
    color: {
      "color": "#ff6219"
    },
  }


  const email = useField({ type: 'text' })
  const password = useField({ type: 'password' })

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const navigate = useNavigate()

  const { setUser } = UseAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    const datap = {
      email: email.value,
      password: password.value
    }
    setLoading(true)
    setError(false)
    axios
      .post('/login', datap)
      .then(response => {
        const { data } = response
        setData(data)
        // console.log(data)
        if (data.ok) {
          const userData = data.docenteDB
          setUser(userData)
          setUserLocal(userData)
          navigate('/')
        }
      })
      .catch(error => {
        setError(true)
        const { data } = error.response
        // console.log(data)
        setData(data)
      })
      .finally(() => { setLoading(false) })
  }

  return (
    <div>
      <section className=" background_login vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-5">
              <div className="card" style={style.borderadius}>
                <div className="row g-0">
                  <div className="d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">

                      <form onSubmit={handleSubmit}>

                        <div className="d-flex align-items-center mb-3 pb-1">
                          <img src="https://i.postimg.cc/C1KdRcQd/logo.png" width='80px' alt="" />
                          <span className="h3 fw-bold mb-0 text-danger">Gestion-Academica</span>
                        </div>

                        <h5 className="fw-normal mb-3 pb-3" style={style.letter}>Inicie sesión en su cuenta</h5>

                        <div className="form-outline mb-4">
                          <input className="form-control form-control-lg"
                            {...email}
                            name='email'
                            placeholder='Email address @unsaac' />
                        </div>

                        <div className="form-outline mb-4">
                          <input className="form-control form-control-lg"
                            {...password}
                            name='contrasenia'
                            placeholder='Password' />
                        </div>

                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" defaultChecked />
                          <label className="form-check-label" > Remember me </label>
                        </div>

                        <div className="pt-1 mb-4 mt-4">
                          <button
                            className="btn btn-dark btn-lg btn-block"
                            disabled={loading}
                            type="submit">
                            {loading && <i className='fa fa-spinner fa-spin me-2 '></i>}
                            {loading ? 'Espere...' : 'Login'}
                          </button>
                          {error && <span className=' mx-2 text-danger h6'>{data ? data.msg : 'Ocurrio un error..'}</span>}
                        </div>

                      </form>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
