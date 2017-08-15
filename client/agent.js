import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);
const omitSlug = animal => Object.assign({}, animal, { slug: undefined });
const API_ROOT = 'https://another-chance.herokuapp.com/api';
// const API_ROOT = 'http://localhost:3000/api';

const responseBody = res => res.body;

const requests = {
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody)
};

const Animals = {
  all: page =>
    requests.get(`/animals?limit=10`),
  del: slug =>
    requests.del(`/animals/${slug}`),
  get: slug =>
    requests.get(`/animals/${slug}`),
  update: animal =>
    requests.put(`/animals/${animal.slug}`, { animal: omitSlug(animal) }),
  create: animal =>
    requests.post(`/animals`, { animal })

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
