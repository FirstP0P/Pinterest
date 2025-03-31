import React from "react";
import { useAuth } from "react-oidc-context";
import { Link } from 'react-router-dom';
import "./navbar.css";

const Navbar = ({ signIn, signOut }) => {
  const auth = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="assets/pinterest_logo.png" alt="Pinterest" />
      </div>

      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          {auth.isAuthenticated ? (
            <button onClick={signOut}>Sign Out</button>
          ) : (
            <button onClick={signIn}>Sign In</button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
