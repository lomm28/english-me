import { CREATE_USER } from './types';
import network from '../../services/network';
import callApi from '../../utils/callApi';

const createUser = data => {
  const action = () => network.createUser(data);
  return callApi(action, CREATE_USER);
};

export default createUser;
