import { LOGIN_USER } from './types';
import network from '../../services/network';
import callApi from '../../utils/callApi';

const loginUser = data => {
  const action = () => network.loginUser(data);
  return callApi(action, LOGIN_USER);
};

export default loginUser;
