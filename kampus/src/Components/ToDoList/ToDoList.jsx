import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import AddTask from "./AddTask";

const BACKEND_TODO_URL = "http://localhost:3000/api/tasks"; 

function ToDoList() {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get(BACKEND_TODO_URL) // Confirm the correct backend URL
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks details:", error);
      });
  }, [id]);

  function deleteTask(taskId) {
    axios.delete(`${BACKEND_TODO_URL}/${taskId}`).then(() => {
      console.log("Task deleted!");

      axios.get(BACKEND_TODO_URL).then((response) => {
        setTasks(response.data);
      });
    });
  }

  return (
    <div>
      <h1>My To-do List</h1>

      <div>
             <Link to="/Todolist/AddTask">
             <button> Add New Task </button>
             </Link>
      </div>
      
      <div>
        {tasks.length > 0 ? (
        tasks.map((task) => (
        <div key={task.id} >
        <Link to={`/Todolist/${task.id}`}>
        <h2>Task: {task.title}</h2>
        </Link>
        <button onClick={() => deleteTask(task.id)}>Delete Task</button>
      </div>
       ))
       ) : (   
  <p>You have no tasks </p>
       )}

      </div>

    </div>
  );
}

export default ToDoList;
