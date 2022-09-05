import React from 'react'
import { useState } from 'react'

export default function Navbar() {

  const [active, setActive] = useState(true)
  const [active2, setActive2] = useState(false)

  const change = () => {
    // alert('ss')
    setActive(!active)
    setActive2(!active2)
  }

  return (
    <div className="navbar-contenido">
      <div className="navContent">
        <div className='botons_users'>
          <button onClick={()=>change()} type="button" className={`btn btn-light me-2 ${active && 'active'}`}>Vista Docente</button>
          <button onClick={()=>change()} type="button" className={`btn btn-light ${active2 && 'active'}`}>Admin</button>
        </div>
        <div>
          <button className="btn btn-link btn-lg">
            Login
          </button>
        </div>
      </div>
      
    </div>
  )
}
