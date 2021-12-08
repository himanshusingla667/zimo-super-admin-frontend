import axios from "axios"
// let baseUrl = 'http://192.168.1.201:5000'
let baseUrl = 'http://192.168.1.100:5000'
const url = "http://localhost:3000/users"


export const getUsers = async (id) => {
    id = id || '';
    return await axios.get(`${url}/${id}`);
}
export const addUser = async (user) => {
    return await axios.post(url, user);
}

export const editUser = async (id, user) => {
    return await axios.put(`${url}/${id}`, user)
}

export const deleteUser = async (id) => {
    return await axios.delete(`${url}/${id}`);
}
export let deplist =() => baseUrl + '/api/v1/department/list'
export let login = () => baseUrl + '/api/v1/user/login'
export let signUp = () => baseUrl + '/api/v1/user/register'

export let adddes = () => baseUrl + '/api/v1/designation/add'
export let deslist = () => baseUrl + '/api/v1/designation/List'
export let editdes = () => baseUrl + '/api/v1/designation/update'
export let detailDes = () => baseUrl + '/api/v1/designation/details'
export let delDes = () => baseUrl + '/api/v1/designation/delete'
