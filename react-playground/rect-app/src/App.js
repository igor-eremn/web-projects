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
      <button>
        <img 
          src="https://www.freeiconspng.com/thumbs/plus-icon/plus-icon-black-2.png" 
          alt="Add Conuter" 
          onClick={increment}
          height="50"
        />
      </button>
      <button>
        <img 
          src="https://pngimg.com/d/minus_PNG6.png" 
          alt="Minus Conuter" 
          onClick={decrement}
          height="50"
        />
      </button>
      <button>
        <img 
          src="https://images.pngnice.com/download/2007/Save-Button-PNG-Transparent-Photo.png" 
          alt="Save Conuter" 
          onClick={saveCount}
          height="50"
        />
      </button>
      <button>
        <img 
          src="https://cdn1.iconfinder.com/data/icons/essential-ui-lineal-set/512/bin-512.png" 
          alt="Clear Storage" 
          onClick={clearStorage}
          height="50"
        />
      </button>
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
