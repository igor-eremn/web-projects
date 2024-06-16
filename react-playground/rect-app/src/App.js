import './App.css';
import { useRef } from "react";

function App() {
  const txtTitle = useRef();
  const hexColor = useRef();

  const submit = (e) => {
    e.preventDefault();
    const title = txtTitle.current.value;
    const hex = hexColor.current.value;
    alert(`${title}, ${hex}`);
    txtTitle.current.value = "";
    hexColor.current.value = "";
  }

  return (
    <form onSubmit={submit}>
      <input 
        ref={txtTitle}
        type="text" 
        placeholder="color title..." 
      />
      <input 
        ref={hexColor}
        type="color"
      />
      <button>Add</button>
    </form>
  );
}

export default App;
