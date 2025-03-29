import React from "react";
import { useAuth } from "react-oidc-context";
import "./navbar.css";
import pinterestLogo from "../../assets/pinterest_logo.png";

const Navbar = ({ signIn, signOut }) => {
  const auth = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={pinterestLogo} alt="Pinterest" />
      </div>

      <ul className="navbar-links">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Explore</a>
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
