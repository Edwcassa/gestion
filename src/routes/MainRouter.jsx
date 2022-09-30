import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../component/Dashboard'
import ErrorPage from '../pages/ErrorPage'
import Carga_Academica from '../pages/views/Carga_Academica'
import Cursos from '../pages/views/Cursos'
import Docentes from '../pages/views/Docentes'
import Perfil from '../pages/views/Perfil'

export default function MainRouter() {

  const MisCursos = () => <h1>mis cursos</h1>
  const Curso_detalle = () => <h1>curso detallado</h1>
  const Historial = () => <h1>historial</h1>
  const Estadisticas = () => <h1>Estadisticas</h1>

  return (
    <Dashboard>
      <Routes>
        <Route path='/' element={<Perfil />} />
        <Route path='/mis_cursos' element={<MisCursos />} />
        <Route path='/mis_cursos/:courseId' element={<Curso_detalle />} />
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
