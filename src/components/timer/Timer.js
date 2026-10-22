import React, { useEffect, useState } from "react";
import Button from "../common/button/Button";
import "./Timer.css";

const Timer = () => {
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    if (!isStarted) return undefined;

    const timerId = setInterval(() => {
      setRemainingSeconds((seconds) => Math.max(0, seconds - 1));
    }, 1000);

    return () => clearInterval(timerId);
  }, [isStarted]);

  useEffect(() => {
    if (remainingSeconds === 0) setIsStarted(false);
  }, [remainingSeconds]);

  const hours = Math.floor(remainingSeconds / 3600);
  const minutes = Math.floor((remainingSeconds % 3600) / 60);
  const seconds = remainingSeconds % 60;

  const updateTimePart = (part, rawValue) => {
    const parsedValue = Number(rawValue);
    const maxValue = part === "hours" ? 999 : 59;
    const value = Number.isFinite(parsedValue)
      ? Math.min(maxValue, Math.max(0, Math.floor(parsedValue)))
      : 0;

    setRemainingSeconds((currentSeconds) => {
      let nextHours = Math.floor(currentSeconds / 3600);
      let nextMinutes = Math.floor((currentSeconds % 3600) / 60);
      let nextSeconds = currentSeconds % 60;

      if (part === "hours") nextHours = value;
      if (part === "minutes") nextMinutes = value;
      if (part === "seconds") nextSeconds = value;

      return nextHours * 3600 + nextMinutes * 60 + nextSeconds;
    });
  };

  const onReset = () => {
    setIsStarted(false);
    setRemainingSeconds(0);
  };

  return (
    <div className="timer">
      <div className="timer-row">
        <div className="timer-border-ring">
          <div className="timer-border-ring-inner"></div>
        </div>
        <div className="timer-input-title">
          <input
            type="number"
            min="0"
            max="999"
            step="1"
            className="timer-input"
            value={hours}
            disabled={isStarted}
            onChange={(e) => updateTimePart("hours", e.target.value)}
          />
          <span>h</span>
        </div>
        <div className="timer-input-title">
          <input
            type="number"
            min="0"
            max="59"
            step="1"
            className="timer-input"
            value={minutes}
            disabled={isStarted}
            onChange={(e) => updateTimePart("minutes", e.target.value)}
          />
          <span>m</span>
        </div>
        <div className="timer-input-title">
          <input
            type="number"
            min="0"
            max="59"
            step="1"
            className="timer-input"
            value={seconds}
            disabled={isStarted}
            onChange={(e) => updateTimePart("seconds", e.target.value)}
          />
          <span>s</span>
        </div>
      </div>
      <div className="button-row">
        <Button onClickHandler={onReset}>Reset</Button>
        {isStarted ? (
          <Button onClickHandler={() => setIsStarted(false)}>Pause</Button>
        ) : (
          <Button
            onClickHandler={() => setIsStarted(true)}
            disabled={remainingSeconds === 0}
          >
            Start
          </Button>
        )}
      </div>
    </div>
  );
};

export default Timer;
