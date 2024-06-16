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
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.github.com/users/igor-eremn`
    )
    .then((response) => response.json())
    .then(setData)
    .then(() => setLoading(false))
    .catch(setError);
  }, []);

  if (loading) return <h1>Loading...</h1>
  if (error) return <pre>{JSON.stringify(error)}</pre>
  if (!data) return null;

  return (
    <GitHubUser 
      name={data.name}
      repos = {data.public_repos}
      avatar = {data.avatar_url}
    />
  );
}

export default App;
