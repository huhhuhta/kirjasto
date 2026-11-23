import axios from 'axios'

const baseUrl = '/api/books'

const getAll = () => axios.get(baseUrl).then(response => response.data)

const create = (newBook) => axios.post(baseUrl, newBook).then(response => response.data)

const update = (id, changes) => axios.put(`${baseUrl}/${id}`, changes).then(response => response.data)

const remove = (id) => axios.delete(`${baseUrl}/${id}`)

export default { getAll, create, update, remove }
