const createATeamReducer = (state = {}, action) => {
  switch(action.type) {
    case 'CREATE_A_TEAM_GOTO_PAGE':
      return {...state, page: (state.page || 1) + 1};
    default:
      return state;
  }
}

export default createATeamReducer;
