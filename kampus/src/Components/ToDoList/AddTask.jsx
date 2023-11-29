import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BACKEND_TODO_URL = "http://localhost:5005";

const AddTask = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      title,
      body,
      deadline,
      status
    };

    axios.post(`${BACKEND_TODO_URL}/api/task`, requestBody)
      .then((response) => {
        const newTaskId = response.data._id;
        localStorage.setItem("taskId", newTaskId)
        navigate(`/Todolist/${newTaskId}`);
      })
      .catch((error) => {
        console.error('Error creating task:', error);
        setErrorMessage('Failed to create task. Please try again.');
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="custom-form">
        <label> Task:<input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} /></label>

        <label> Description: <input type="text" value={body} onChange={(e) => setBody(e.target.value)} /></label>

        <label> Deadline: <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} /></label>

        <label> Status: <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} /></label>

        <button type="submit">Submit</button>
      </form>

      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    </div>
  );
};

export default AddTask;
