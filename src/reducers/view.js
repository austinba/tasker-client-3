import { view } from './initialState';

function viewReducer(state = view, action) {
  switch(action.type) {
    case 'TOGGLE_MENU':
      return { ...state, menuOpen: !state.menuOpen };
    default:
      return state;
  }
}

export default viewReducer;
