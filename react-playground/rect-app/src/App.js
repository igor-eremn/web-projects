import './App.css';
import { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { useState, useEffect } from 'react';

function Home(){
  return (
    <div>
      <CreateNav />
      <h1>Home Page</h1>
    </div>
  );
}

export function ToDo(){
  return (
    <div>
      <CreateNav />
      <h1>To Do List</h1>
    </div>
  );
}

export function Counter(){
  const [count, setCount] = useState(0);
  const [savedCounts, setSavedCounts] = useState([]);

  useEffect(() => {
    const storedCounts = JSON.parse(localStorage.getItem('savedCounts'));
    if (storedCounts) {
      setSavedCounts(storedCounts);
    }
  }, []);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const saveCount = () => {
    const newSavedCount = {
      count: count,
      time: getTime()
    };
    const newSavedCounts = [...savedCounts, newSavedCount];
    localStorage.setItem('savedCounts', JSON.stringify(newSavedCounts));
    setSavedCounts(newSavedCounts);
    setCount(0);
  };

  const clearStorage = () => {
    localStorage.removeItem('savedCounts');
    setSavedCounts([]);
  };

  return (
    <div>
      <CreateNav />
      <h1>Counter</h1>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={saveCount}>Save & Reset</button>
      <button onClick={clearStorage}>Clear Storage</button>
      <ul>
        {savedCounts.map((savedCount, index) => (
          <li key={index}>Saved Count: {savedCount.count}; When: {savedCount.time}</li>
        ))}
      </ul>
    </div>
  );
}

function getTime(){
  const date = new Date();
  const showTime = date.getHours() + ':' 
                    + date.getMinutes() + ':' 
                      + date.getSeconds();
  return showTime;
}

function CreateNav(){
  return (
    <div>
      <nav>
        <Link to="/"> - Home</Link>
        <Link to="/todo"> - To Do List</Link>
        <Link to="/counter"> - Counter - </Link>
      </nav>
    </div>
  );
}

export function App() {
  return <Home />
}
