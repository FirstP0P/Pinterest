import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header({ user, isAuthenticated, onLogin }) {
  const [username, setUsername] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username);
      setUsername('');
      setShowLoginForm(false);
    }
  };

  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/">PinterestClone</Link>
      </div>

      <div className="header-search">
        <input type="text" placeholder="Search..." />
      </div>

      <nav className="header-nav">
        {isAuthenticated ? (
          <>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/profile" className="nav-link">Profile</Link>
            <span className="user-info">Hello, {user.username}</span>
          </>
        ) : (
          <>
            {showLoginForm ? (
              <form onSubmit={handleLogin} className="login-form">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                />
                <button type="submit">Login</button>
              </form>
            ) : (
              <button onClick={() => setShowLoginForm(true)}>Login</button>
            )}
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
