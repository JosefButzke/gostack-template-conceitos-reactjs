import React, {useState, useEffect} from "react";
import api from './services/api'

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    const loadRepositories = async () => {
      const response = await api.get('/repositories');
      setRepositories(response.data)
    }
    loadRepositories()
  }, [])

  async function handleAddRepository() {
    api.post('/repositories', {
      title: 'Novo',
      url: 'asdasd',
      techs: ['React Native']
    });
  }

  async function handleRemoveRepository(id) {
    console.log(id)
    api.delete(`/repositories/${id}`);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.title}

            <button onClick={() => handleRemoveRepository(repo.id)}>
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
