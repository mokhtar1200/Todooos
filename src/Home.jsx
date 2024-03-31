import React, { useState, useEffect } from "react";
import Creat from "./Creat";
import axios from "axios";

function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/get")
      .then(result => setTodos(result.data))
      .catch(err => console.log(err));
  }, []);

  const handelAddTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const handelDelete = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`)
      .then(result => {
        console.log(result);
        // Update state to trigger a re-render
        setTodos(todos.filter(todo => todo._id !== id));
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="Home">
      <h1>To do list</h1>
      <Creat onAddTodo={handelAddTodo} />

      {todos.length === 0 ?
        <div><h2>no Records</h2></div> :
        todos.map(todo => (
          <div key={todo._id}>
            {todo.task}
            <span onClick={() => handelDelete(todo._id)}>Delete</span>
          </div>
        ))
      }
    </div>
  );
}

export default Home;
