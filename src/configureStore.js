import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import createReducer from './reducers';

export default function configureStore(initialState = {}, history) {
  const composeEnhancers = compose;
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  const middlewares = [sagaMiddleware, routerMiddleware(history)];

  const enhancers = [applyMiddleware(...middlewares)];

  const store = createStore(
    createReducer(),
    initialState,
    composeEnhancers(...enhancers),
  );

  return store;
}
