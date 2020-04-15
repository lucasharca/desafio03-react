import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const repository = {
      id: "123",
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    }

    await api.post('repositories', repository);
    setRepositories([...repositories, repository])

  }

  async function handleRemoveRepository(id) {
    const repoId = repositories.findIndex(repository => repository.id === id);
    repositories.splice(repoId, 1);
    setRepositories([...repositories]);
    await api.delete(`repositories/${id}`);
  }


useEffect(() => {
  api.get('repositories').then(response => {
    setRepositories(response.data);
  }); 
},[])
  
  
  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return(
            <li key={repository.id}>
              {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
          )
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
