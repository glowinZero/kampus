import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Checkbox from "./Checkbox";
import { Button } from "@nextui-org/button";
import { Switch } from "@nextui-org/react";

import editIcon from "../../assets/images/pencil.png";
import removeIcon from "../../assets/images/remove.png";

const BACKEND_TODO_URL = "http://localhost:5005";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("taskId");
    axios
      .get(`${BACKEND_TODO_URL}/api/tasks`)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks details:", error);
      });
  }, []);

  const addButton = () => {
    navigate("/Todolist/AddTask");
  };

  const editTask = (taskId) => {
    localStorage.setItem("taskId", taskId);
    navigate(`/Todolist/${taskId}/edit`);
  };

  const TaskDetails = (taskId) => {
    localStorage.setItem("taskId", taskId);
    navigate(`/Todolist/${taskId}`);
  };

  const handleStatusChange = (taskId, newStatus) => {
    // Handle status change if needed
    console.log(`Task ${taskId} status changed to: ${newStatus}`);
  };

  function deleteTask(taskId) {
    axios
      .delete(`${BACKEND_TODO_URL}/api/tasks/${taskId}`)
      .then(() => {
        console.log("Task deleted!");
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task._id !== taskId)
        );
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  }

  return (
    <div>
      <div className=" text-mainColor-900 bg-transparent flex items-center flex-col">
        {tasks &&
          tasks.map((task) => (
            <div
              key={task._id}
              className="task-container flex justify-between w-[86vw] items-center bg-slate-600"
            >
              <div
                className="task-title bg-slate-700 text-xl ml-3"
                onClick={() => TaskDetails(task._id)}
              >
                <h2>{task.title}</h2>
              </div>

              <div className="task-actions w-[20%] bg-slate-100">
                <Checkbox
                  taskId={task._id}
                  status={task.status}
                  onStatusChange={handleStatusChange}
                />

                <Button
                  isIconOnly
                  onClick={(e) => {
                    e.preventDefault();
                    editTask(task._id);
                  }}
                  size="lg"
                  className="shadow-lg rounded-full bg-transparent"
                >
                  <img src={editIcon} className="flex-shrink-0 w-[auto] h-6" />
                </Button>
                <Button
                  isIconOnly
                  onClick={() => deleteTask(task._id)}
                  size="lg"
                  className="shadow-lg rounded-full bg-transparent"
                >
                  <img
                    src={removeIcon}
                    className="flex-shrink-0 w-[auto] h-6"
                  />
                </Button>
              </div>
            </div>
          ))}
      </div>
      <Button className="primary" onClick={addButton}>
        Add New Task
      </Button>
    </div>
  );
}

export default ToDoList;
