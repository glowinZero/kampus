import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { parseISO, differenceInSeconds } from "date-fns";

const BACKEND_TODO_URL = "http://localhost:5005";

function CountDown() {
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

  const calculateTimeLeft = () => {
    if (!task || !task.deadline) {
      return null;
    }

    const deadlineDate = parseISO(task.deadline);
    const now = new Date();

    const difference = differenceInSeconds(deadlineDate, now);

    const daysLeft = Math.floor(difference / (24 * 60 * 60));
    const hoursLeft = Math.floor((difference % (24 * 60 * 60)) / (60 * 60));
    const minutesLeft = Math.floor((difference % (60 * 60)) / 60);
    const secondsLeft = Math.floor(difference % 60);

    return `${daysLeft}d ${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`;
  };

  const [liveCountdown, setLiveCountdown] = useState(calculateTimeLeft());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLiveCountdown(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [task]);

  return (
    <div>
      <div className="">
{/*         <h1 className="heading">Live Countdown</h1>
 */}        {task && (
          <div className="task-details-container">
            <div className="task-property">
              <h2>Time left: {liveCountdown}</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CountDown;












