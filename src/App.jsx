import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Profile from './pages/Profile';

function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mock authentication
  const login = (username) => {
    setUser({ username, id: Date.now().toString() });
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify({ username, id: Date.now().toString() }));
  };

  // Check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <div className="app">
        <Header user={user} isAuthenticated={isAuthenticated} onLogin={login} />
        <Routes>
          <Route path="/" element={<Home user={user} isAuthenticated={isAuthenticated} />} />
          <Route path="/profile" element={<Profile user={user} isAuthenticated={isAuthenticated} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
