import React, { useState } from 'react'
import { useFetch } from '../../hooks/useFetch'

export default function Cursos() {

  const { data, loading, error } = useFetch('/cursos')
  // console.log(data?.cursos)

  return (
    <div>
      <h1>Cursos</h1>
      {loading && <div className="alert alert-success" role="alert">Cargando...</div>}
      {error && <div className="alert alert-danger" role="alert">{error}</div>}

      <table className="table table-hover">
        <thead>
          <tr className='table-secondary'>
            <th scope="col">Acciones</th>
            <th scope="col">Codigo</th>
            <th scope="col">Nombre</th>
            <th scope="col">Grupo</th>
            <th scope="col">Categoria</th>
            <th scope="col">Creditos</th>
          </tr>
        </thead>
        <tbody>
          {
            data?.cursos.map((e, i) => (
              <tr key={i}>
                <td>
                  <button className='btn btn-light me-2'><i className="fa-solid fa-pen"></i></button>
                  <button className='btn btn-danger'><i className="fas fa-trash"></i></button>
                </td>
                <td>{e.codigo}</td>
                <td>{e.nombre}</td>
                <td>{e.grupo}</td>
                <td>{e.categoria}</td>
                <td>{e.creditos}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

