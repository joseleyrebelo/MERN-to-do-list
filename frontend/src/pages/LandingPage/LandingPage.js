import React, { useState, useEffect } from "react";
import { Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useHttpClient } from "../../_hooks/http-request";
import { API_ENDPOINT } from "../../_shared/constants";

const LandingPage = () => {
  const { sendRequest } = useHttpClient();

  // Abstration Declaration
  const dispatch = useDispatch();

  // Initiating states
  const [states, setStates] = useState({
    todo_entry: {
      task: "",
      notes: "",
      done: false,
    },
    todos: [],
    sortedTodos: {},
    createEntryError: false,
    showDoneTodos: false,
  });

  useEffect(() => {
    refreshTodos();
  }, []);

  const sortTodosPerId = (todos) => {
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

  // Retrieves the latest Todo entries
  // * From MongoDB database via backend
  const refreshTodos = () => {
    sendRequest(`${API_ENDPOINT}/todos`, `GET`).then((response) => {
      setStates({
        ...states,
        todos: response.data,
        sortedTodos: sortTodosPerId(response.data),
      });
    });
  };

  // Updates 'todo_entry' states per change on input
  // * These will be used to create new todos.
  const handleToDoEntryValueChange = (e, key) => {
    setStates({
      ...states,
      todo_entry: {
        ...states.todo_entry,
        [key]: e.target.value,
      },
    });
  };

  // Adds new todo entry submition
  // * Via backend to MongoDB
  // * Follows with a promise to handleSubmitResponse
  const createEntry = () => {
    sendRequest(
      `${API_ENDPOINT}/todos`,
      `POST`,
      JSON.stringify({
        task: states.todo_entry.task,
        notes: states.todo_entry.notes,
        done: states.todo_entry.done,
      }),
      { "Content-Type": "application/json" }
    ).then((response) => {
      console.log("asdasdasd");
      return response.success
        ? (() => {
            refreshTodos();
            dispatch({ type: "ADDED_TODO" });
          })()
        : (() => {
            dispatch({ type: "FAILED_ADDING_TODO" });
            dispatch({ type: "FAILED_OPERATION" });
            setStates({ ...states, createEntryError: true });
            setTimeout(() => {
              setStates({ ...states, createEntryError: false });
            }, 3000);
          })();
    });
  };

  // Updates existing entry
  // * Updates database
  // * Follows with a promise to handleSubmitResponse
  const updateEntry = (task, notes, done, id) => {
    sendRequest(
      `${API_ENDPOINT}/todos/${id}`,
      `PATCH`,
      JSON.stringify({
        task: task,
        notes: notes,
        done: done,
      }),
      { "Content-Type": "application/json" }
    ).then((response) => {
      response.success
        ? (() => {
            refreshTodos();
            dispatch({ type: "UPDATED_TODO" });
          })()
        : (() => {
            dispatch({ type: "FAILED_OPERATION" });
            setTimeout(() => {
              setStates({ ...states, createEntryError: false });
            }, 3000);
          })();
    });
  };

  // Set todo entry as done
  // * Save to database
  const toggleDoneEntry = (e) => {
    let id = e.target.getAttribute("target_id");
    updateEntry(
      states.sortedTodos[id].task,
      states.sortedTodos[id].notes,
      !states.sortedTodos[id].done,
      id
    );
  };

  const toggleShowDoneTodo = (e) => {
    setStates({ ...states, showDoneTodos: !states.showDoneTodos });
  };

  // Deletes todo entry on database
  const deleteEntry = (e) => {
    sendRequest(
      `${API_ENDPOINT}/todos/${e.target.getAttribute("target_id")}`,
      `DELETE`
    ).then((response) => {
      return response.success
        ? (() => {
            refreshTodos();
            dispatch({ type: "DELETED_TODO" });
            dispatch({ type: "FAILED_OPERATION" });
          })()
        : (() => {})();
    });
  };

  return (
    <>
      <div className="app">
        <span style={{ fontSize: "2rem" }}>
          Welcome to this simple todo list solution using MERN stack.
        </span>
      </div>
      <div className="" onClick={toggleShowDoneTodo}>
        {states.showDoneTodos ? `Hide done` : `Show done`}
      </div>
      <div className={`todo-list ${states.showDoneTodos && "show-done"}`}>
        {states.todos.map((row) => (
          <div key={row._id} className={`todo-entry ${row.done && "done"}`}>
            {row.task} --//-- {row.notes}
            <span
              style={{
                width: 20,
                height: 20,
                backgroundColor: "red",
                display: "inline-block",
              }}
              target_id={row._id}
              onClick={(e) => {
                deleteEntry(e);
              }}
            ></span>
            <span
              style={{
                width: 20,
                height: 20,
                backgroundColor: "green",
                display: "inline-block",
              }}
              target_id={row._id}
              onClick={(e) => {
                toggleDoneEntry(e);
              }}
            ></span>
          </div>
        ))}
      </div>
      <div className={`todo-main ${states.createEntryError && "error"}`}>
        <Input
          id="task"
          placeholder="Task"
          type="text"
          value={states.todo_entry.task}
          onChange={(e) => {
            handleToDoEntryValueChange(e, "task");
          }}
        />
        <Input
          id="notes"
          placeholder="Notes"
          type="text"
          value={states.todo_entry.notes}
          onChange={(e) => {
            handleToDoEntryValueChange(e, "notes");
          }}
        />
        <Button onClick={createEntry}>Submit</Button>
      </div>
    </>
  );
};

export default LandingPage;
