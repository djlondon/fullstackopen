import axios from 'axios'
const baseUrl = '/api/persons'

const getData = (request) => (
  request.then(response => response.data)
)

const getAll = () => getData(axios.get(baseUrl))

const create = newObject => getData(axios.post(baseUrl, newObject))

const remove = (id) => getData(axios.delete(`${baseUrl}/${id}`))

const update = (id, newObject) => getData(axios.put(`${baseUrl}/${id}`, newObject))

const persons = {
  getAll,
  create,
  remove,
  update
}

export default persons
