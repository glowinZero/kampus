import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@nextui-org/button";

import Checkbox from "./Checkbox";

import editIcon from "../../assets/images/pencil.png";
import removeIcon from "../../assets/images/remove.png";

const API_URL = "https://kampus.adaptable.app";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState(""); 
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("To do");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [editedTaskId, setEditedTaskId] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/tasks`)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks details:", error);
      });
  }, []);

  const handleStatusChange = (taskId, newStatus) => {
    console.log(`Task ${taskId} status changed to: ${newStatus}`);
  };

  const deleteTask = (taskId) => {
    axios
      .delete(`${API_URL}/api/task/${taskId}`)
      .then(() => {
        console.log("Task deleted!");
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task._id !== taskId)
        );
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      title,
      body,
      deadline,
      status,
    };

    if (editedTaskId) {
      axios
        .put(`${API_URL}/api/tasks/${editedTaskId}`, requestBody)
        .then(() => {
          console.log("Task edited!");
          setEditedTaskId(null);
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task._id === editedTaskId ? { ...task, ...requestBody } : task
            )
          );
        })
        .catch((error) => {
          console.error("Error updating task details:", error);
        });
    } else {
      axios
        .post(`${API_URL}/api/task`, requestBody)
        .then((response) => {
          console.log("Task created!", response.data);
          setTasks((prevTasks) => [...prevTasks, response.data]);
        })
        .catch((error) => {
          console.error("Error creating task:", error);
          setErrorMessage("Failed to create task. Please try again.");
        });
    }

    setTitle("");
    setBody("");
    setDeadline("");
    setStatus("To do");
  };

  return (
    <div>
      <div className="text-mainColor-900 bg-transparent flex items-center flex-col">
        {tasks &&
          tasks.map((task) => (
            <div
              key={task._id}
              className="task-container flex justify-between w-[86vw] items-center bg-slate-600"
            >
              <div
                className="task-title bg-slate-700 text-xl ml-3"
                onClick={() => setEditedTaskId(task._id)}
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
                    setEditedTaskId(task._id);
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

      <form onSubmit={handleSubmit} className="custom-form">
        <label>
          Task:{" "}
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label>
          Description:{" "}
          <input
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </label>

        <label>
          Deadline:{" "}
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </label>

        <label>
          Status:
          <select
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="To do">To do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </label>

        <button type="submit">Submit</button>
      </form>

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}

export default ToDoList;

