import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import EditTask from "./EditTask";

const BACKEND_TODO_URL = "http://localhost:5005";

function TaskDetails() {
  const [task, setTask] = useState(null);
  const { id } = useParams();
  const taskId = localStorage.getItem("taskId")
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BACKEND_TODO_URL}/api/tasks/${taskId}`)
      .then((response) => {
        setTask(response.data);
      })
      .catch((error) => {
        console.error("Error fetching task details:", error);
      });
  }, [id]);

  const deleteTask = () => {
    if (task) {
      axios
        .delete(`${BACKEND_TODO_URL}/api/tasks/${taskId}`)
        .then(() => {
          console.log("Task deleted successfully");
          // Add additional logic or navigation if needed
        })
        .catch((error) => {
          console.error("Error deleting task:", error);
        });
    }
  };

  return (
    <div>
      <h1>Task</h1>
      {task && (
        <div key={task._id}>
          <h2>Task: {task.title}</h2>
          <h2>Description: {task.body}</h2>
          <h2>Status: {task.status}</h2>
          <h2>Deadline: {task.deadline}</h2>

          <button onClick={deleteTask}>Delete Task</button>
        </div>
      )}
      <Link to = "/Todolist/edit">
      <button >Edit Task</button>
      </Link>
     
      
    </div>
  );
}

export default TaskDetails;
