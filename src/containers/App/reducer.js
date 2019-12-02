import { LOAD_REPOS_SUCCESS, LOAD_REPOS, LOAD_REPOS_ERROR } from './constants';

export const initialState = {
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
};

/* eslint-disable default-case, no-param-reassign, consistent-return */
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REPOS:
      state.loading = true;
      state.error = false;
      state.userData.repositories = false;
      break;

    case LOAD_REPOS_SUCCESS:
      state.userData.repositories = action.repos;
      state.loading = false;
      state.currentUser = action.username;
      break;

    case LOAD_REPOS_ERROR:
      state.error = action.error;
      state.loading = false;
      break;
    default:
      return state;
  }
};

export default appReducer;
