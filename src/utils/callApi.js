import { successAction, failureAction } from '../types';

const callApi = (action, actionType, options = {}) => dispatch => {
  dispatch({ type: actionType, ...options });
  return new Promise((resolve, reject) => {
    const actionPromise = action();
    actionPromise.then(payload => {
      dispatch({
        type: successAction(actionType),
        payload,
        ...options,
      });
      resolve(payload);
    });
    actionPromise.catch(error => {
      dispatch({
        type: failureAction(actionType),
        error,
        ...options,
      });
      reject(error);
    });
  });
};

export default callApi;
