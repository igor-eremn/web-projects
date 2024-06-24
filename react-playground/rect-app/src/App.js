import './App.css';
import { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

function Home(){
  return (
    <div>
      <CreateNav />
      <h1>Home Page</h1>
    </div>
  );
}

export function Counter(){
  const [count, setCount] = useState(0);
  const [savedCounts, setSavedCounts] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const images = [
    "https://www.freeiconspng.com/thumbs/plus-icon/plus-icon-black-2.png",
    "https://pngimg.com/d/minus_PNG6.png",
    "https://images.pngnice.com/download/2007/Save-Button-PNG-Transparent-Photo.png",
    "https://cdn1.iconfinder.com/data/icons/essential-ui-lineal-set/512/bin-512.png"
  ];

  useEffect(() => {
    const storedCounts = JSON.parse(localStorage.getItem('savedCounts'));
    if (storedCounts) {
      setSavedCounts(storedCounts);
    }

    const loadImage = (url) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve();
      });
    };

    Promise.all(images.map(image => loadImage(image))).then(() => {
      setImagesLoaded(true);
    });

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
      {imagesLoaded ? (
        <>
          <p>Count: {count}</p>
          <button onClick={increment}>
            <img 
              src={images[0]} 
              alt="Add Counter" 
              height="50"
            />
          </button>
          <button onClick={decrement}>
            <img 
              src={images[1]} 
              alt="Minus Counter" 
              height="50"
            />
          </button>
          <button onClick={saveCount}>
            <img 
              src={images[2]} 
              alt="Save Counter" 
              height="50"
            />
          </button>
          <button onClick={clearStorage}>
            <img 
              src={images[3]} 
              alt="Clear Storage" 
              height="50"
            />
          </button>
          <ul>
            {savedCounts.map((savedCount, index) => (
              <li key={index}>Saved Count: {savedCount.count}; When: {savedCount.time}</li>
            ))}
          </ul>
        </>
      ) : (
        <p>Loading images...</p>
      )}
    </div>
  );
}

export function ToDo() {
  const [showModal, setShowModal] = useState(false);
  const [savedToDo, setSavedToDo] = useState([]);

  useEffect(() => {
    const storedToDo = JSON.parse(localStorage.getItem('savedToDo'));
    if (storedToDo) {
      setSavedToDo(storedToDo);
    }
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const saveToDo = (todo, message) => {
    const newSavedToDo = {
      id: uuidv4(), // Generate a unique ID
      todo: todo,
      message: message,
      completed: false // Set completed initially to false
    };
    const newSavedToDos = [...savedToDo, newSavedToDo];
    localStorage.setItem('savedToDo', JSON.stringify(newSavedToDos));
    setSavedToDo(newSavedToDos);
    setShowModal(false);
  };

  const deleteToDo = (id) => {
    const updatedToDos = savedToDo.filter((item) => item.id !== id);
    localStorage.setItem('savedToDo', JSON.stringify(updatedToDos));
    setSavedToDo(updatedToDos);
  };

  const toggleCompleted = (id) => {
    const updatedToDos = savedToDo.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    localStorage.setItem('savedToDo', JSON.stringify(updatedToDos));
    setSavedToDo(updatedToDos);
  };

  return (
    <div>
      <CreateNav />
      <h1>To Do List</h1>
      <button onClick={handleOpenModal}>Create new ToDo</button>
      <Modal show={showModal} onClose={handleCloseModal} saveToDo={saveToDo} />
      {savedToDo.map((item) => (
        <TodoTemplate 
          key={item.id} 
          todoItem={item} 
          toggleCompleted={toggleCompleted} 
          deleteToDo={deleteToDo} 
        />
      ))}
    </div>
  );
}

export function Weather(){
  return (
    <div>
      <CreateNav />
      <h1>Weather</h1>
    </div>
  );
}

/* ADDITIONAL FUNCTIONS FOR NEEDED FOR DIFFERENT PAGES */
function getTime(){
  const date = new Date();
  const showTime = date.getHours() + ':' 
                    + date.getMinutes() + ':' 
                      + date.getSeconds();
  return showTime;
}
const Modal = ({ show, onClose, saveToDo }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2 className="modal-title">Create TODO activity</h2>
        <ToDoForm saveToDo={saveToDo} />
      </div>
    </div>
  );
};
function ToDoForm({ saveToDo }) {
  const [formData, setFormData] = useState({ todo: "", message: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    saveToDo(formData.todo, formData.message);
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="form-group">
        <label htmlFor="todo">To-Do:</label>
        <input 
          type="text" 
          id="todo" 
          name="todo" 
          value={formData.todo} 
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="message">Instructions:</label>
        <textarea 
          id="message" 
          name="message" 
          value={formData.message} 
          onChange={handleChange} 
          maxLength="200" 
        />
      </div>

      <button type="submit">Save TODO</button>
    </form>
  );
}
const TodoTemplate = ({ todoItem, toggleCompleted, deleteToDo }) => {
  const handleCheckboxChange = () => {
    toggleCompleted(todoItem.id);
  };

  return (
    <div className={`todo-template ${todoItem.completed ? 'completed' : 'incomplete'}`}>
      <h3>{todoItem.todo}</h3>
      <p>{todoItem.message}</p>
      <input
        type="checkbox"
        checked={todoItem.completed}
        onChange={handleCheckboxChange}
      />
      <p id="todo-id-label">ID: {todoItem.id}</p>
      <button
        className="todo-button"
        onClick={() => deleteToDo(todoItem.id)}
      >
        DELETE
      </button>
    </div>
  );
};


/* NAV BAR + APP */
function CreateNav(){
  return (
    <div>
      <nav>
        <Link to="/">--- Home ---</Link>
        <Link to="/counter"> Counter -</Link>
        <Link to="/todo">-- To Do List </Link>
        <Link to="/weather"> --- Weather ---</Link>
      </nav>
    </div>
  );
}
export function App() {
  return <Home />
}
