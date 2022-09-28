import axios from "axios";

const crearCurso = async (values) => {
  const response = await axios.post('/cursos', values)
  const { data } = response
  return data
}

const editarCurso = async (id, values) => {
  const response = await axios.put(`/cursos/${id}`, values)
  const { data } = response
  return data
}

const eliminarCurso = async (id) => {
  const response = await axios.delete(`/cursos/${id}`)
  const { data } = response
  return data
}

export { crearCurso, editarCurso, eliminarCurso }