import axios from 'axios';

const api = 'http://localhost:3000/api'

const utils = {
  login : (user) => {
    return axios.post(`${api}/users/login`, {user: {email, password}}).then(res => res).catch(err => err.message)
  }
}

export default utils
