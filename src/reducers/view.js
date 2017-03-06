import { view } from './initialState';

function viewReducer(state = view, action) {
  switch(action.type) {
    case 'TOGGLE_MENU':
      return { ...state, menuOpen: !state.menuOpen };
    case 'SIGN_OUT':
      return { ...state, menuOpen: false };
    default:
      return state;
  }
}

export default viewReducer;
