import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../auth/UseAuth'
import { deleteUserLocal } from '../utils/user'

export default function Navbar() {

  const [active, setActive] = useState(true)
  const [active2, setActive2] = useState(false)

  const navigate = useNavigate()

  const change = () => {
    setActive(!active)
    setActive2(!active2)
  }

  const { user, setUser } = useAuth()

  const logout = () => {
    deleteUserLocal()
    setUser(null)
    navigate('/')
  }

  return (
    <div className="navbar-contenido">
      <div className="navContent">
        <div className='botons_users w-75 mt-1'>
          {
            !user &&
            <div className='bg-invitado border w-100 rounded p-3 text-white'>
              <span>Estas viendo como: <i className='fa fa-globe ms-1 me-3'></i>INVITADO</span>
            </div>

          }
        </div>
        <div>
          {
            !user ?
              <button onClick={() => navigate('/login')} className="btn btn-link btn-lg">
                Login
              </button> :
              <button onClick={() => logout()} className="btn btn-link btn-lg">
                Logout
              </button>
          }
        </div>
      </div>

    </div>
  )
}
