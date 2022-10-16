import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../component/Dashboard'
import ErrorPage from '../pages/ErrorPage'
import Carga_Academica from '../pages/views/Carga_Academica'
import Cursos from '../pages/views/Cursos'
import Curso_Detalle from '../pages/views/Curso_Detalle'
import Docentes from '../pages/views/Docentes'
import Estadisticas from '../pages/views/Estadisticas'
import Historial from '../pages/views/Historial'
import Mis_Cursos from '../pages/views/Mis_Cursos'
import Perfil from '../pages/views/Perfil'

export default function MainRouter() {

  return (
    <Dashboard>
      <Routes>
        <Route path='/' element={<Perfil />} />
        <Route path='/mis_cursos' element={<Mis_Cursos />} />
        <Route path='/mis_cursos/:courseId' element={<Curso_Detalle />} />
        <Route path='/historial' element={<Historial />} />
        <Route path='/list_cursos' element={<Cursos />} />
        <Route path='/list_docentes' element={<Docentes />} />
        <Route path='/asignar_horarios' element={<Carga_Academica />} />
        <Route path='/estadisticas' element={<Estadisticas />} />
        <Route path='/*' element={<ErrorPage />} />
      </Routes>
    </Dashboard>
  )
}
