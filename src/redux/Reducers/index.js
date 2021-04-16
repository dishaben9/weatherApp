import weather, {initialState} from './weather';
import {combineReducers} from 'redux';
import {RESET_STORE} from '../Types';

export const appReducer = combineReducers({
  weather,
});

export default function rootReducer(state, action) {
  let finalState = appReducer(state, action);
  if (action.type === RESET_STORE) {
    finalState = initialState;
  }

  return finalState;
}
