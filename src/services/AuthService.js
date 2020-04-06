import axios from 'axios'

const api = axios.create({
    baseURL: 'http://192.168.1.1:5050/api/',
    timeout: 1000,
    headers: {'Content-Type': 'application/json'}
  });

function login(userdata) {
    api.post(userdata).then((response) => {
        console.log(response)
    })
 }

function isAuthenticated () {
    if(!localStorage.getItem('token')) {
        return false }
    return true
}

function getUserData(userid) {
    return api.get('users/'+ userid)
}

export { login, isAuthenticated, getUserData }



