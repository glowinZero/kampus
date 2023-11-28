import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BACKEND_TODO_URL = "http://localhost:3000/api/tasks";

const AddTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Call the onSubmit function passed from the parent component
    const requestBody = {
        title,
        description,
      };
      
    axios.post(`${BACKEND_TODO_URL}`, requestBody).then(() => {
        navigate(`/Todolist/${taskId}`);
      })
  };

  return (
    <form onSubmit={handleSubmit} className="custom-form">
      <label> Task:<input type="text" name="title" value={title} onChange={(e)=>setTitle(e.target.value)}/></label>
      
     
      <label> Description: <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default AddTask;


