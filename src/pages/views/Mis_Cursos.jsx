import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import UseAuth from '../../auth/UseAuth'
import Card_Curso from '../../component/Card_Curso'

export default function () {

  const { user } = UseAuth()

  const [miscursos, setMiscursos] = useState(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const getMisCursos = async () => {
    setLoading(true)
    await axios.get('/matriculas')
      .then(response => {
        // console.log(response.data)
        const allmatriculas = response.data.matriculas
        const mismatriculas = allmatriculas.filter((e) => e.usuario._id === (user?._id || '63379243523a50ef11cca3eb'))
        // console.log(mismatriculas)
        setMiscursos(mismatriculas)
      })
      .catch(e => setError(e))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getMisCursos()
  }, [])


  return (
    <>
      <h1 className='mb-3'>Mis Cursos</h1>
      {error && <div className="alert alert-danger" role="alert">{error.message}</div>}
      {loading && <strong>Loading.. <div className="spinner-border spinner-border-sm ms-2" role="status"></div></strong>}
      <div className='d-flex flex-row'>
        {
          miscursos?.map((e, i) => (
            <Card_Curso key={i} path={e.curso._id} codigo={e.curso.codigo} nombre={e.curso.nombre} />
          ))
        }
      </div>
    </>
  )
}
