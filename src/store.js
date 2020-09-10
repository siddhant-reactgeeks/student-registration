import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const createStoreWithMiddleware = compose(
  applyMiddleware(
    thunk,
    promise,
  ),
  window.REDUX_DEVTOOLS_EXTENSION ? window.devToolsExtension() : f => f,
)(createStore);

export default function configureStore() {
  const store = createStoreWithMiddleware(rootReducer);
  return store;
}
