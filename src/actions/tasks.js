export const addTask = event => {
  event.stopPropagation();
  console.log('add task')
  return { type: 'ADD_TASK' };
}
