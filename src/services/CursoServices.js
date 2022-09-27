import axios from "axios";

const crearCurso = async (values) => {
  const response = await axios.post('/cursos', values)
  const { data } = response
  return data
  // return response.then(res => res.data)
  // axios
  //   .post('https://gestion-backend.onrender.com/api/cursos', values)
  //   .then((response) => {

  //   })
}

export { crearCurso }