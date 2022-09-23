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
  }

  return (
    <div className="navbar-contenido">
      <div className="navContent">
        <div className='botons_users'>
          {
            !user && <div>
              <button onClick={() => change()} type="button" className={`btn btn-light me-2 ${active && 'active'}`}>Vista Docente</button>
              <button onClick={() => change()} type="button" className={`btn btn-light ${active2 && 'active'}`}>Admin</button>
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
