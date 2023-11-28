import { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ReactSlider from "react-slider";

const red = "#f54e4e";
const green = "#4aec8c";

function Pommodoro() {
    const [showSettings, setShowSettings] = useState(true);
    const [workMinutes, setWorkMinutes] = useState(25); 
    const [breakMinutes, setBreakMinutes] = useState(5);
    const [isPaused, setIsPaused] = useState(true);
    const [secondsLeft, setSecondsLeft] = useState(0);
    const [mode, setMode] = useState("work");

    const initTimer = () => {
        setSecondsLeft(workMinutes * 60);
    };

    const switchMode = () => {
        const nextMode = mode === "work" ? "break" : "work";
        setMode(nextMode);
        setSecondsLeft(nextMode === "work" ? workMinutes * 60 : breakMinutes * 60);
    };

    useEffect(() => {
        initTimer();

        const intervalId = setInterval(() => {
            if (isPaused) {
                return;
            } else if (secondsLeft === 0) {
                switchMode();
            } else {
                setSecondsLeft((prevSeconds) => prevSeconds - 1);
            }
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [isPaused, secondsLeft, workMinutes, breakMinutes, mode]);

    const startTimer = () => {
        setShowSettings(false);
        setIsPaused(false);
    };

    return (
        <div>
            {showSettings ? (
                <div>
                    <label>Work minutes {workMinutes}</label>
                    <ReactSlider className='slider' thumbClassName='thumb' trackClassName='track' value={workMinutes} min={0} max={60} onChange={setWorkMinutes} />
                    <label>Break minutes {breakMinutes}</label>
                    <ReactSlider className='slider green' thumbClassName='thumb' trackClassName='track' value={breakMinutes} min={0} max={60} onChange={setBreakMinutes} />
                    <button style={{ backgroundColor: "grey" }} onClick={startTimer}>Start</button>
                </div>
            ) : (
                <div>
                    <h1>pomodoro timer</h1>
                    <CircularProgressbar value={(secondsLeft / (mode === "work" ? workMinutes : breakMinutes)) * 100} text={`${Math.floor((secondsLeft / (mode === "work" ? workMinutes : breakMinutes)) * 100)}%`} styles={buildStyles({
                        textColor: " #1c1c1c",
                        pathColor: mode === "work" ? red : green,
                        trailColor: "rgba(255, 255, 255,.2)",
                    })} />
                    {isPaused ? <button style={{ backgroundColor: "grey" }} onClick={() => setIsPaused(false)}>Play</button> : <button style={{ backgroundColor: "grey" }} onClick={() => setIsPaused(true)}>Pause</button>}
                </div>
            )}
        </div>
    );
}

export default Pommodoro;