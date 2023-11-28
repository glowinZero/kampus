import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const BACKEND_TODO_URL = "";

const EditTask = () => {
  const { taskId } = useParams();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');


  const navigate = useNavigate();

  useEffect(() => {
    // Fetch book details based on the ID and populate the state
    axios.get(`${BACKEND_TODO_URL}/${taskId}`)
      .then((response) => {
        const TaskDetails = response.data;
        setTitle(TaskDetails.title);
        setDescription(TaskDetails.description);


      })
      .catch((error) => {
        console.error("Error fetching Task details:", error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
        title,
        description,
        
      };

    axios.put(`${BACKEND_TODO_URL}/${id}`, requestBody)
      .then(() => {
        navigate(`/Todolist/${id}`);
      })
      .catch((error) => {
        console.error("Error updating book details:", error);
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditTask;
