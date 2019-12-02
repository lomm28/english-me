import api from './api';

const createUser = creadentials => {
  return api.post('/register', creadentials);
};

const loginUser = creadentials => {
  return api.post('/login', creadentials);
};

export default {
  createUser,
  loginUser,
};
