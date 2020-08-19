import React, { useState, useEffect } from "react";
import api from './services/api';
import { uuid } from 'react-uuid';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  }, [repositories.id]);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      "id": uuid,
      "title": `bootcamp-gostack-desafio02 ${Date.now()}`,
      "url": "https://google.com",
      "techs": [
        "React",
      ]
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    console.log(repositories)
    
    const repositoryIndex = repositories.findIndex(repo => repo.id === id);    
    const repository = repositories.splice(repositoryIndex,1)
    console.log(repository)

    api.delete(`repositories/${id}`).then(
      setRepositories(repository)
    )
  }

  return (
    <div>
      <ul data-testid="repository-list">
        <li>
          {repositories.map(repositories =>
            <div key={repositories.id+1}>
              <span key={repositories.id}>{repositories.title}</span>
              <button key={repositories.id+2} onClick={() => handleRemoveRepository(repositories.id)}>
                Remover
              </button>
            </div>
          )}
        </li>
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
