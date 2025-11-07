
import React, { useContext, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { AppContext } from './context/AppContext';

const App: React.FC = () => {
  const context = useContext(AppContext);

  if (!context) {
    return <div>Loading...</div>;
  }
  const { isAuthenticated, language } = context;

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  return (
    <div className="min-h-screen bg-background text-text-primary font-sans">
      {isAuthenticated ? <Dashboard /> : <Login />}
    </div>
  );
};

export default App;
