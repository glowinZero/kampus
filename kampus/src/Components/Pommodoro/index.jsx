import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Button } from "@nextui-org/button";
import { Slider } from "@nextui-org/react";

const red = "#f54e4e";
const green = "#4aec8c";

function Pomodoro() {
  const [showSettings, setShowSettings] = useState(true);
  const [workMinutes, setWorkMinutes] = useState(0);
  const [breakMinutes, setBreakMinutes] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(workMinutes * 60);
  const [mode, setMode] = useState("work");
  const initialTotalTime = mode === "work" ? workMinutes * 60 : breakMinutes * 60;

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
    const nextMode = mode === "work" ? "break" : "work";
    setMode(nextMode);
    setSecondsLeft(nextMode === "work" ? workMinutes * 60 : breakMinutes * 60);
  };

  const resetPommodoro = () => {
    setShowSettings(true);
    setSecondsLeft(0);
    setMode("work");
    setWorkMinutes(0);
    setBreakMinutes(0);
    setIsPaused(true);
  };

  return (
    <div>
      {showSettings ? (
        <div className=" grid h-[40vh] w-full place-items-center justify-center content-center relative gap-4">
          <label className="font-medium text-2xl mr-5 ml-5">
            WORK MINUTES {workMinutes}
          </label>
          <Slider
            size="lg"
            color="danger"
            key="danger"
            value={workMinutes}
            min={0}
            max={60}
            onChange={setWorkMinutes}
          />
          <label className="font-medium text-2xl">
            BREAK MINUTES {breakMinutes}
          </label>
          <Slider
            size="lg"
            color="success"
            key="success"
            value={breakMinutes}
            min={0}
            max={60}
            onChange={setBreakMinutes}
          />
          <Button
            onClick={startTimer}
            className="bg-Color3 text-white absolute  bottom-0 w-30 text-center"
          >
            START
          </Button>
        </div>
      ) : (
        <div>
          <CircularProgressbar
            value={(secondsLeft / initialTotalTime) * 100}
            text={`${Math.floor(secondsLeft / 60)}:${(secondsLeft % 60)
              .toString()
              .padStart(2, "0")}`}
            styles={buildStyles({
              textColor: "white",
              pathColor: mode === "work" ? red : green,
              trailColor: "rgba(255, 255, 255,.2)",
            })}
            className="mb-5"
          />
          <Button
            onClick={isPaused ? startTimer : pauseTimer}
            className="mr-5"
            color="primary"
          >
            {isPaused ? "Play" : "Pause"}
          </Button>
          <Button color="danger" onClick={resetPommodoro}>
            Reset
          </Button>
        </div>
      )}
    </div>
  );
}

export default Pomodoro;
