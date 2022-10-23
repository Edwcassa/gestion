import React from 'react'
import { NavLink } from 'react-router-dom'
import UseAuth from '../auth/UseAuth'

export default function Sidebar() {

  // datos del usuario
  const { user } = UseAuth()


  const jsonRutas = [
    { "display_name": "Mi perfil", "route": "/", "icon": "fa-solid fa-user" },
    { "display_name": "Mis cursos", "route": "/mis_cursos", "icon": "fa-regular fa-folder" },
    { "display_name": "Historial", "route": "/historial", "icon": "fa-solid fa-clock-rotate-left" },
    { "display_name": "Lista de Cursos", "route": "/list_cursos", "icon": "fa-regular fa-clone" },
    { "display_name": "Lista de Docentes", "route": "/list_docentes", "icon": "fa-solid fa-user-tie" },
    { "display_name": "Carga Academica", "route": "/asignar_horarios", "icon": "fa-regular fa-file-lines" },
    { "display_name": "Estadisticas", "route": "/estadisticas", "icon": "fa-solid fa-chart-simple" }
  ]

  return (
    <div className='sidebar'>
      <div className="sidebar__logo">
        <img src='https://i.postimg.cc/C1KdRcQd/logo.png' alt="company logo" />
      </div>
      <div className="user_name">
        <p>{user ? user.nombre : 'invitado'}</p>
      </div>
      <div className="user_carga">
        <p>{user ? (user.esAdmin) ? 'admin' : 'regular' : 'invitado'}</p>
      </div>
      <div className="sidebar__links">
        {
          jsonRutas.map((item, index) => {
            if (!user) {
              return (
                <NavLink to={item.route} key={index}>
                  <i className={item.icon}></i>
                  <span>
                    {item.display_name}
                  </span>
                </NavLink>
              )
            }
            else {
              if (user.esAdmin) {
                if (['Mi perfil', 'Lista de Cursos', 'Lista de Docentes', 'Carga Academica', 'Estadisticas'].includes(item.display_name)) {
                  return (
                    <NavLink to={item.route} key={index}>
                      <i className={item.icon}></i>
                      <span>
                        {item.display_name}
                      </span>
                    </NavLink>
                  )
                }
              }
              else {
                if (['Mi perfil', 'Mis cursos', 'Historial'].includes(item.display_name)) {
                  return (
                    <NavLink to={item.route} key={index}>
                      <i className={item.icon}></i>
                      <span>
                        {item.display_name}
                      </span>
                    </NavLink>
                  )
                }
              }
            }
          })
        }
      </div>
    </div>
  )
}
