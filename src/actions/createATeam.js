export const goToPage = page => ({type: 'CREATE_A_TEAM_GOTO_PAGE', page});
export const editField = (event) => {
  const name = event.target.name;
  const value = event.target.value;
  return ({type: 'CREATE_A_TEAM_FIELD_EDIT', field:name, value});
}
export const blurField = (event) => {
  const name = event.target.name;
  return ({type: 'CREATE_A_TEAM_FIELD_BLUR', field:name});
}
export const submit = () => {};
export const unmount = () => ({type: 'CREATE_A_TEAM_UNMOUNT'})
