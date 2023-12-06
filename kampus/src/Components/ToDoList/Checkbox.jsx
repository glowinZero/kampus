import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_TODO_URL = "http://localhost:5005/api/tasks";

function Checkbox({ taskId, status, onStatusChange }) {
  const [taskStatus, setTaskStatus] = useState('To do');

  useEffect(() => {
    axios.get(`${BACKEND_TODO_URL}/${taskId}`)
      .then(response => {
        setTaskStatus(response.data.status || 'To do');
      })
      .catch(error => {
        console.error('Error getting task status:', error);
      });
  }, [taskId]);

  const handleCheckboxChange = () => {
    const newStatus = taskStatus === 'Done' ? 'To do' : 'Done';

    const data = {
      status: newStatus,
    };

    axios.put(`${BACKEND_TODO_URL}/${taskId}`, data)
      .then(response => {
        if (response && response.data && response.data.status) {
          setTaskStatus(response.data.status);
          if (onStatusChange) {
            onStatusChange(taskId, response.data.status);
          }
        }
      })
      .catch(error => {
        console.error('Error updating task status:', error);
      });
      window.location.reload()

  };

  return (
    <div className="checkbox-container">
      <label className="checkbox-label">
        {/* Done */}
        <span className="checkbox-status">{status}</span>
        <input
          type="checkbox"
          checked={taskStatus === 'Done'}
          onChange={handleCheckboxChange}
          className="checkbox-input"
        />
      </label>
    </div>
  );
}

export default Checkbox;


