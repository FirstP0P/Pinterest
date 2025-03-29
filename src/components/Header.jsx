import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "react-oidc-context";

function Header({ signOut, user}) {
  const auth = useAuth();


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
            <span className="user-info">Hello, user</span>
            <button onClick={signOut}>Sign out</button>
            {/* <button onClick={() => auth.signinRedirect()}>Login</button> */}
          </>
        ) : (
          <> 
              <button onClick={() => auth.signinRedirect()}>Login</button>
              {/* <button onClick={signOut}>Sign out</button> */}
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
