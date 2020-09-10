import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import createStudent from './createStudent';

const rootReducer = combineReducers({
  routing: routerReducer,
  createStudent,
  form: formReducer,
});

export default rootReducer;
