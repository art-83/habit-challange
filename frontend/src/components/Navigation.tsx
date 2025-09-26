import React from 'react';
import './Navigation.css';

interface NavigationProps {
  activeTab: 'create' | 'list';
  onTabChange: (tab: 'create' | 'list') => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="navigation">
      <h1 className="app-title">Gerenciador de Usuários</h1>
      <div className="nav-tabs">
        <button
          className={`nav-tab ${activeTab === 'create' ? 'active' : ''}`}
          onClick={() => onTabChange('create')}
        >
          Cadastrar Usuário
        </button>
        <button
          className={`nav-tab ${activeTab === 'list' ? 'active' : ''}`}
          onClick={() => onTabChange('list')}
        >
          Listar Usuários
        </button>
      </div>
    </nav>
  );
};