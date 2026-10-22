import React, { useEffect, useRef, useState } from "react";
import Button from "../common/button/Button";
import "./Stopwatch.css";

const Stopwatch = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const isStartedRef = useRef(false);
  const startedAtRef = useRef(0);
  const elapsedMsRef = useRef(0);

  useEffect(() => {
    if (!isStarted) return undefined;

    const timerId = setInterval(() => {
      if (!isStartedRef.current) return;

      const elapsed = performance.now() - startedAtRef.current;
      elapsedMsRef.current = elapsed;
      setElapsedMs(elapsed);
    }, 10);

    return () => clearInterval(timerId);
  }, [isStarted]);

  const onStart = () => {
    if (isStartedRef.current) return;

    startedAtRef.current = performance.now() - elapsedMsRef.current;
    isStartedRef.current = true;
    setIsStarted(true);
  };

  const onToggle = () => {
    if (!isStartedRef.current) {
      onStart();
      return;
    }

    const elapsed = performance.now() - startedAtRef.current;
    elapsedMsRef.current = elapsed;
    setElapsedMs(elapsed);
    isStartedRef.current = false;
    setIsStarted(false);
  };

  const onReset = () => {
    isStartedRef.current = false;
    startedAtRef.current = 0;
    elapsedMsRef.current = 0;
    setIsStarted(false);
    setElapsedMs(0);
  };

  const totalCentiseconds = Math.floor(elapsedMs / 10);
  const m = Math.floor(totalCentiseconds / 6000);
  const s = Math.floor(totalCentiseconds / 100) % 60;
  const ms = totalCentiseconds % 100;

  return (
    <div className="stopwatch">
      <div className="container">
        <div className="clock" onClick={onStart}>
          <div className="clock-border-ring">
            <div className="clock-border-ring-inner"></div>
          </div>
          <div className="clock-timer">
            {m < 10 && 0}
            {m}:{s < 10 && 0}
            {s}:{ms < 10 && 0}
            {ms}
          </div>
        </div>
        <div className="button-row">
          <Button onClickHandler={onReset}>Reset</Button>
          <Button onClickHandler={onToggle}>
            {isStarted ? <>Pause</> : <>Start</>}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;
