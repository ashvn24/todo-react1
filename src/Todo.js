import React, { useState } from "react";
import "./App.css";
import { MdFileDownloadDone } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { HiOutlineTrash } from "react-icons/hi2";
function Todo() {
  const [Todo, setTodo] = useState("");
  const [todolist, setTodolist] = useState([]);
  const [editList, setEditList] = useState(0);

  const addtodo = (event) => {
    event.preventDefault();
    if (Todo !== "") {
      setTodolist([...todolist, { list: Todo, id: Date.now(), status: false }]);
    }
    setTodo("");
    if (editList) {
      const todoEdit = todolist.map((to) =>
        to.id === editList
          ? (to = { id: to.id, list: Todo })
          : (to = { id: to.id, list: to.list })
      );
      setTodolist(todoEdit);
      setEditList(0);
      setTodo("");
    }
  };

  const onDelete = (id) => {
    setTodolist(todolist.filter((list) => list.id !== id));
  };

  const onComplete = (id) => {
    let Complete = todolist.map((list) => {
      if (list.id === id) {
        return { ...list, status: !list.status };
      }
      return list;
    });
    setTodolist(Complete);
  };

  const onEdit = (id) => {
    const editTodo = todolist.find((to) => to.id === id);
    setTodo(editTodo.list);
    setEditList(editTodo.id);
  };

  return (
    <div>
      <div className="card">
        <div className="card-header text-center">
          <strong>Todo</strong>
        </div>
        <div className="card-body">
          <form onSubmit={addtodo} className="d-flex">
            <input
              value={Todo}
              className="form-control input my-2"
              type="text"
              onChange={(e) => setTodo(e.target.value)}
              placeholder="Enter your Text"
              aria-label="default input example"
            />
            <button className="btn btn-success mx-3 ml-2">{editList?'UPDATE':'ADD'}</button>
          </form>
          <ul className="my-2">
            {todolist.map((to) => (
              <li className="list" id={to.status ? "item" : ""}>
                <div className="list-i">{to.list}</div>
                <span>
                  <MdFileDownloadDone
                    className="icon tick"
                    title="Complete"
                    onClick={() => onComplete(to.id)}
                  />
                  <CiEdit
                    className="icon edit"
                    title="Edit"
                    onClick={() => onEdit(to.id)}
                  />
                  <HiOutlineTrash
                    className="icon trash"
                    title="Delete"
                    onClick={() => onDelete(to.id)}
                  />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Todo;
