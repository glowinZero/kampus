import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const BACKEND_TODO_URL = "http://localhost:5005";

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
          setTaskIdFromParams(taskDetails._id || ''); // set _id in state
          setTitle(taskDetails.title || '');
          setBody(taskDetails.body);
          setDeadline(taskDetails.deadline || '');
          setStatus(taskDetails.status || '');
        
      })
      .catch((error) => {
        console.error("Error fetching Task details:", error);
      });
  }, [taskId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      _id: taskIdFromParams, // use _id from state
      title:title,
      body,
      deadline,
      status,
    };

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
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value !== title ? e.target.value : title)}
          />
        </label>

        <label>
          Description:
          <input
            type="text"
            name="description"
            placeholder={body}
            value={body}
            onChange={(e) => setBody(e.target.value !== body ? e.target.value : body)}
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
            onChange={(e) => setStatus(e.target.value !== status ? e.target.value : status)}
          >
            <option value="To do">To do</option>
            <option value="Done">Done</option>
          </select>
        </label>

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditTask;
