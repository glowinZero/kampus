import { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ReactSlider from 'react-slider';

const red = '#f54e4e';
const green = '#4aec8c';

function Pomodoro() {
  const [showSettings, setShowSettings] = useState(true);
  const [workMinutes, setWorkMinutes] = useState(0);
  const [breakMinutes, setBreakMinutes] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(workMinutes * 60);
  const [mode, setMode] = useState('work');

  const initialTotalTime = mode === 'work' ? workMinutes * 60 : breakMinutes * 60;

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isPaused && secondsLeft > 0) {
        setSecondsLeft((prevSeconds) => prevSeconds - 1);
      } else if (secondsLeft === 0) {
        switchMode();
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isPaused, secondsLeft]);

  const startTimer = () => {
    setShowSettings(false);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsPaused(true);
  };

  const switchMode = () => {
    const nextMode = mode === 'work' ? 'break' : 'work';
    setMode(nextMode);
    setSecondsLeft(nextMode === 'work' ? workMinutes * 60 : breakMinutes * 60);
  };

  const resetPommodoro = () =>{
    setShowSettings(true);
    setSecondsLeft(0);
    setMode("work")
    setWorkMinutes(0)
    setBreakMinutes(0)
    setIsPaused(true)
  }

  return (
    <div>
      {showSettings ? (
        <div>
          <label>Work minutes {workMinutes}</label>
          <ReactSlider
            className="slider"
            thumbClassName="thumb"
            trackClassName="track"
            value={workMinutes}
            min={0}
            max={60}
            onChange={setWorkMinutes}
          />
          <label>Break minutes {breakMinutes}</label>
          <ReactSlider
            className="slider green"
            thumbClassName="thumb"
            trackClassName="track"
            value={breakMinutes}
            min={0}
            max={60}
            onChange={setBreakMinutes}
          />
          <button style={{ backgroundColor: 'grey' }} onClick={startTimer}>
            Start
          </button>
        </div>
      ) : (
        <div>
          <h1>pomodoro timer</h1>
          <CircularProgressbar
            value={(secondsLeft / initialTotalTime) * 100}
            text={`${Math.floor(secondsLeft / 60)}:${(secondsLeft % 60).toString().padStart(2, '0')}`}
            styles={buildStyles({
              textColor: '#1c1c1c',
              pathColor: mode === 'work' ? red : green,
              trailColor: 'rgba(255, 255, 255,.2)',
            })}
          />
          <button style={{ backgroundColor: 'grey' }} onClick={isPaused ? startTimer : pauseTimer}>
            {isPaused ? 'Play' : 'Pause'}
          </button>
          <button onClick={resetPommodoro}>Reset</button>
        </div>
      )}
    </div>
  );
}

export default Pomodoro;
