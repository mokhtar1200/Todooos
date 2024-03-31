import React, { useState } from "react";
import axios from "axios";

const Creat = ({ onAddTodo }) => {
  const [task, setTask] = useState("");

  const handelClick = () => {
    axios.post("http://localhost:3001/add", { task: task })
      .then(result => {
        console.log(result);
        // Call the callback function to update todos in Home component
        onAddTodo(result.data);
        // Clear the task input
        setTask("");
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <input type="text" className="" value={task} onChange={(e) => setTask(e.target.value)} />
      <button type="button" onClick={handelClick}>Add</button>
    </div>
  );
};

export default Creat;
