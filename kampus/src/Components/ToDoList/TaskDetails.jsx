import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../Navbar/NavBar";
import {
  parseISO,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
} from "date-fns";
import CountDown from "./Countdown";

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
    axios
      .delete(`${BACKEND_TODO_URL}/api/task/${taskId}`)
      .then(() => {
        console.log("Task deleted!");
        navigate(`/Todolist`);
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  }

  const calculateTimeLeft = () => {
    if (!task || !task.deadline) {
      return {
        days: null,
        hours: null,
        minutes: null,
      };
    }

    const deadlineDate = parseISO(task.deadline);
    const now = new Date();

    const daysLeft = differenceInDays(deadlineDate, now);
    const hoursLeft = differenceInHours(deadlineDate, now);
    const minutesLeft = differenceInMinutes(deadlineDate, now);

    return {
      days: daysLeft,
      hours: hoursLeft,
      minutes: minutesLeft,
    };
  };

  const timeLeft = calculateTimeLeft();

  const formattedDeadline =
    task && task.deadline ? task.deadline.split("T")[0] : "";

  return (
    <div id="dashboard-staff" className="w-screen">
      <NavBar />
      <div className=" w-[90%] h-[95vh] bg-gray-400 m-5 p-5 rounded-3xl">
        <h1 className="heading">Task Details</h1>
        {task && (
          <div className="task-details-container">
            <div className="task-property">
              <h2>Task: {task.title}</h2>
            </div>
            <div className="task-property">
              <h2>Description: {task.body}</h2>
            </div>
            <div className="task-property">
              <h2>Status: {task.status}</h2>
            </div>
            <div className="task-property">
              <h2>Deadline: {formattedDeadline}</h2>
            </div>

            {/*      <div className="task-property">
              <h2>Days left: {timeLeft.days}</h2>
              <h2>Hours left: {timeLeft.hours}</h2>
              <h2>Minutes left: {timeLeft.minutes}</h2>
            </div> */}

            <div>
              <CountDown />
            </div>

            <div className="task-details-buttons">
              <div>
                <button className="delete-button" onClick={deleteTask}>
                  Delete Task
                </button>
              </div>

              <div>
                <Link to={`/Todolist/${taskId}/edit`}>
                  <button className="edit-button">Edit Task</button>
                </Link>
              </div>

              <div>
                <Link to={`/Todolist`}>
                  <button className="back-button">Back to To Do List</button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskDetails;
