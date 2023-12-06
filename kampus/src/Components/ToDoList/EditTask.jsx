// EditTask.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

const BACKEND_TODO_URL = "https://kampus.adaptable.app";

const EditTask = () => {
  const { taskId } = useParams();
  const [taskIdFromParams, setTaskIdFromParams] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${BACKEND_TODO_URL}/api/tasks/${taskId}`)
      .then((response) => {
        const taskDetails = response.data;
        setTaskIdFromParams(taskDetails._id || '');
        setTitle(taskDetails.title || '');
        setBody(taskDetails.body || '');
        setDeadline(taskDetails.deadline || '');
        setStatus(taskDetails.status || '');
      })
      .catch((error) => {
        console.error("Error fetching Task details:", error);
      });
  }, [taskId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {};
    if (title !== '') {requestBody.title = title;}
    if (body !== '') {requestBody.body = body;}
    if (deadline !== '') {requestBody.deadline = deadline;}
    if (status !== '') {requestBody.status = status;}

    const newTaskId = localStorage.getItem("taskId");
    axios.put(`${BACKEND_TODO_URL}/api/tasks/${newTaskId}`, requestBody)
      .then(() => {
        console.log("TASK EDITED!", newTaskId);
        navigate(`/Todolist/${newTaskId}`);
      })
      .catch((error) => {
        console.error("Error updating task details:", error);
      });
  };

  return (
    <div className=" bg-slate-500 p-28 rounded-3xl">
      <form onSubmit={handleSubmit}>
        <label>
          Description:
          <input
            type="text"
            name="description"
            placeholder={body || "Enter description..."}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </label>

        <label>
          Deadline:
          <input
            type="date"
            name="deadline"
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
            <option value="Choose the status of the task" style={{ color: "black" }}>Choose the status of the task</option>
            <option value="To do" style={{ color: "black" }}>To do</option>
            <option value="In Progress" style={{ color: "black" }}>In Progress</option>
            <option value="Done" style={{ color: "black" }}>Done</option>
          </select>
        </label>

        <div className="button-container">
          <button type="submit">Save</button>
          <Link to={`/Todolist/${taskId}`}>
            <button className="back-button">Back to To Do List</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditTask;


