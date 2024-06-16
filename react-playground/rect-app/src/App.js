import './App.css';
import { useEffect, useState } from "react";

function GitHubUser({ name, repos, avatar }){
  return(
    <div>
      <h1>User's name is {name}</h1>
      <p>Public Repos: {repos}</p>
      <img src={avatar} height={150} alt={name}/>
    </div>
  )
}

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(
      `https://api.github.com/users/igor-eremn`
    )
    .then((response) => response.json())
    .then(setData);
  }, []);

  if (data) 
    return <GitHubUser 
              name={data.name} 
              repos = {data.public_repos}
              avatar = {data.avatar_url}/>;
  return (
    <h1>Data</h1>
  );
}

export default App;
