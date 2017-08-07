import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'http://localhost:3000/api';

const responseBody = res => res.body;

const requests = {
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
};

const Animals = {
  all: page =>
    requests.get(`/animals?limit=10`)
};

let token = null

let tokenPlugin = req => {
  if(token) {
    req.set('Authorization', `Token ${token}`)
  }
}

const Auth = {
  current: () =>
    requests.get('/user'),
  login: (email, password) =>
    requests.post('/users/login', { user: { email, password }}),
  register: (firstName, lastName, email, password, secret) =>
    requests.post('/users', { user: { firstName, lastName, email, password, secret } }),
  save: user =>
    requests.put('/user', { user })
};

export default {
  Animals,
  Auth,
  setToken: _token => { token = _token; }
};
