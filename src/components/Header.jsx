import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "react-oidc-context";

function Header({ signOut, user, isAuthenticated, onLogin }) {
  const [username, setUsername] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(false);

  const auth = useAuth();

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
        {auth.isAuthenticated ? (
          <>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/profile" className="nav-link">Profile</Link>
            <span className="user-info">Hello, {user.username}</span>
            <button onClick={signOut}>Sign out</button>
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
                <button onClick={() => auth.signinRedirect()}>Sign in</button>
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
