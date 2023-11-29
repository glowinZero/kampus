import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const BACKEND_TODO_URL = "http://localhost:5005"; // Update with your backend URL

const EditTask = () => {
  const { taskId } = useParams();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${BACKEND_TODO_URL}/${taskId}`)
      .then((response) => {
        const taskDetails = response.data;
        setTitle(taskDetails.title);
        setBody(taskDetails.body);
        setDeadline(taskDetails.deadline);
        setStatus(taskDetails.status);
      })
      .catch((error) => {
        console.error("Error fetching Task details:", error);
      });
  }, [taskId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      title,
      body,
      deadline,
      status,
    };

    axios.put(`${BACKEND_TODO_URL}/${taskId}`, requestBody)
      .then(() => {
        navigate(`/Todolist/${taskId}`);
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
            readOnly
          />
        </label>

        <label>
          Description:
          <input
            type="text"
            name="description"
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
          <input
            type="text"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </label>

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditTask;
