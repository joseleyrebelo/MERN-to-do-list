export const sortTodosPerId = (todos) => {
  let obj = {};
  console.log(todos);
  todos.forEach((row) => {
    console.log(row);
    obj[row._id] = {
      task: row.task,
      notes: row.notes,
      done: row.done,
    };
  });

  console.log(obj);
  return obj;
};
