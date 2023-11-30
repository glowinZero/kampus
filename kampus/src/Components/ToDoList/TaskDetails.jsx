import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../Navbar/NavBar";

const BACKEND_TODO_URL = "http://localhost:5005";

function TaskDetails() {
  const [task, setTask] = useState(null);
  const taskId = localStorage.getItem("taskId");
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
  }, [taskId]);

  function deleteTask() {
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
        <NavBar/>
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
      <Link to={`/Todolist/${taskId}/edit`}>
  <button>Edit Task</button>
</Link>

<div>
<Link to={`/Todolist`}>
  <button>Back to To Do List</button>
</Link>
</div>


      
    </div>
  );
}

export default TaskDetails;

