import axios from "axios"
const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newPersonsObject => {
    const request = axios.post(baseUrl, newPersonsObject)
    return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const update = (id, newPersonsObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newPersonsObject)
    return request.then(response => response.data)
}

export default { getAll, create, remove, update }