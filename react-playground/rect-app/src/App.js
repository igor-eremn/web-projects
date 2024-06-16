import './App.css';
import { useState, useEffect } from "react";

function App() {
  const [state, setState] = useState("State 0");
  const [check, setCheck] = useState(0);

  const [time, setTime] = useState("Morning");
  const [timeCheck, setTimeCheck] = useState(0);

  useEffect(() => {
    console.log(`Current state: ${state}`);
  }, [state]);

  useEffect(()=>{
    console.log(`Current Time: ${time}`);
  }, [time]);

  return (
    <div className="App">
      <h1>Current State is { state }</h1>
      <button onClick={() => {
        if(check === 0){
          setCheck(1);
          setState("State 1");
        }else{
          setCheck(0);
          setState("State 0");
        }
      }}>Change State</button>

      <h2>Current Time is {time}</h2>
      <button onClick={() => {
        if(timeCheck === 0){
          setTimeCheck(1);
          setTime("Afternoon");
        }else if(timeCheck === 1){
          setTimeCheck(2);
          setTime("Evening");
        }else{
          setTimeCheck(0);
          setTime("Morning");
        }
      }}>Change Time</button>
    </div>
  );
}

export default App;
