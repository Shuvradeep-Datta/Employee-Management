import { useEffect, useRef } from "react"

function TimerComponent() {
  const timeRef = useRef(null);


  useEffect(() => {
    console.log("Effect Started");

    timeRef.current = setInterval(() => {
      console.log("Timer Running...");
    }, 1000);

    return () => {
      clearInterval(timeRef.current);
      console.log("Timer Cleared");
    };
  }, []);

  return <h2>Timer Component</h2>;
}

export default TimerComponent