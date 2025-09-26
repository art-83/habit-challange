import React, { useState, useEffect } from 'react';
import { UserService } from '../services/userService';
import type { User } from '../types/user';
import './UserList.css';

interface UserListProps {
  refreshTrigger: number;
}

export const UserList: React.FC<UserListProps> = ({ refreshTrigger }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const usersData = await UserService.getUsers();
      setUsers(usersData);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao carregar usuários');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [refreshTrigger]);

  const handleRefresh = () => {
    loadUsers();
  };

  if (loading) {
    return (
      <div className="user-list-container">
        <div className="loading">Carregando usuários...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-list-container">
        <div className="error-message">{error}</div>
        <button onClick={handleRefresh} className="refresh-button">
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="user-list-container">
      <div className="user-list-header">
        <h2>Lista de Usuários</h2>
        <button onClick={handleRefresh} className="refresh-button">
          Atualizar
        </button>
      </div>

      {users.length === 0 ? (
        <div className="empty-state">
          <p>Nenhum usuário cadastrado ainda.</p>
        </div>
      ) : (
        <div className="users-grid">
          {users.map((user) => (
            <div key={user.id} className="user-card">
              <div className="user-name">{user.name}</div>
              <div className="user-id">ID: {user.id}</div>
            </div>
          ))}
        </div>
      )}

      <div className="user-count">
        Total: {users.length} usuário{users.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
};