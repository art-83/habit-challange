import React, { useState } from 'react';
import { UserService } from '../services/userService';
import type { UserRequest } from '../types/user';
import './CreateUser.css';

interface CreateUserProps {
  onUserCreated: () => void;
}

export const CreateUser: React.FC<CreateUserProps> = ({ onUserCreated }) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Nome é obrigatório');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const userData: UserRequest = { name: name.trim() };
      await UserService.createUser(userData);
      setSuccess(true);
      setName('');
      onUserCreated();
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao cadastrar usuário');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-user-container">
      <h2>Cadastrar Usuário</h2>
      
      <form onSubmit={handleSubmit} className="create-user-form">
        <div className="form-group">
          <label htmlFor="name">Nome:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite o nome do usuário"
            disabled={loading}
          />
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">Usuário cadastrado com sucesso!</div>}

        <button type="submit" disabled={loading} className="submit-button">
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
};