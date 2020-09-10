const counterInitialState = {
  done_todos: 0,
  added_todos: 0,
  deleted_todos: 0,
  updated_todos: 0,
  failed_adding_todos: 0,
  failed_operation: 0,
};

const counterReducer = (state = counterInitialState, action) => {
  switch (action.type) {
    case "DONE_TODO":
      return { ...state, done_todos: state.done_todos + 1 };
    case "ADDED_TODO":
      return { ...state, added_todos: state.added_todos + 1 };
    case "UPDATED_TODO":
      return { ...state, updated_todos: state.updated_todos + 1 };
    case "DELETED_TODO":
      return { ...state, deleted_todos: state.deleted_todos + 1 };
    case "FAILED_ADDING_TODO":
      return { ...state, failed_adding_todos: state.failed_adding_todos + 1 };
    case "FAILED_OPERATION":
      return { ...state, failed_operation: state.failed_operation + 1 };
    default:
      return state;
  }
};

export default counterReducer;
