import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    api.get('repositories').then(repos => {
      setRepositories(repos.data);
    })

  },[]);

  async function handleAddRepository() {
    const newRepo = await api.post(`repositories`, {
      title: `Repositório ${Date.now()}`,
    })

    setRepositories([...repositories, newRepo.data]);
  }

  async function handleRemoveRepository(id) {
    const removeRepo = await api.delete(`repositories/${id}`);
    const repoRemoved = repositories.findIndex(repo => repo.id === id);
    const NewStateWithoutRepo = repositories.splice(repoRemoved, 1);

    
    setRepositories([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(singleRepo => (
          <li key={singleRepo.id}>
            {singleRepo.title}

            <button onClick={() => handleRemoveRepository(singleRepo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
