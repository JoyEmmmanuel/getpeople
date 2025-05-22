import React from 'react';
import Header from './components/Header';
import UserList from './components/UserList';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500">
      <Header />
      <main className="p-4 max-w-7xl mx-auto">
        <UserList />
      </main>
    </div>
  );
}

export default App;

