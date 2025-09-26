import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { CreateUser } from './components/CreateUser';
import { UserList } from './components/UserList';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState<'create' | 'list'>('create');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleUserCreated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="app">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="main-content">
        {activeTab === 'create' && (
          <CreateUser onUserCreated={handleUserCreated} />
        )}
        {activeTab === 'list' && (
          <UserList refreshTrigger={refreshTrigger} />
        )}
      </main>
    </div>
  );
}

export default App;
