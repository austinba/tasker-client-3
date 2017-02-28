import { view } from './initialState';
import R from 'ramda';

function viewReducer(state = view, action) {
  switch(action.type) {
    case 'TOGGLE_MENU':
      return { ...state, menuOpen: !state.menuOpen };
  }
  return state;
}

export default viewReducer;
