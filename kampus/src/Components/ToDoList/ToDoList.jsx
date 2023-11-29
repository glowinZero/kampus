import React, { useEffect, useState } from "react";
import axios from "axios";
import {  Link, useNavigate } from "react-router-dom";
import AddTask from "./AddTask";

const BACKEND_TODO_URL = "http://localhost:5005"; 

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const [tasksId, setTasksId] = useState();

  useEffect(() => {
    localStorage.removeItem("taskId");
    axios
      .get(`${BACKEND_TODO_URL}/api/tasks`) // Confirm the correct backend URL
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks details:", error);
      });
  }, []);

  const addButton = () =>{
    navigate("/Todolist/AddTask")
  }

  const editTask = (taskId) =>{
    localStorage.setItem("taskId", taskId)
    navigate(`/Todolist/${taskId}`)
  }

  function deleteTask(taskId) {
    axios.delete(`${BACKEND_TODO_URL}/api/task/${taskId}`)
      .then(() => {
        console.log("Task deleted!");
        navigate(`/Todolist`);
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  }
  
  



  return (
    <div>
      <h1>My To-do List</h1>
      {tasks && tasks.map((task) => (
        <div key={task._id}>
            <h2 onClick={() =>editTask(task._id)}>
              Task: {task.title}
            </h2>
            <h2>Body: {task.body}</h2>
          <button onClick={() => deleteTask(task._id)}>Delete Task</button>
        </div>
      ))}
      <button onClick={addButton}> Add New Task </button>
    </div>
  );
}

export default ToDoList;
