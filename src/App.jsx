import { useState, useEffect } from "react";
import Header from "./components/Header";
import React from "react";
import { useState } from "react";
import { useState } from "react";
import { useAuth } from "react-oidc-context";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {
  const auth = useAuth();

  const signOut = async () => {
    // Remove the user from local session
    await auth.removeUser();

    const clientId = "f2gt4v2ut7bn16tl7ctbunu6e";
    const logoutUri = "http://localhost:5173/"; // The URL where the user should be redirected after logging out
    const cognitoDomain =
      "https://us-east-1brgr5kgvm.auth.us-east-1.amazoncognito.com"; // Make sure the domain is correct
    // window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
    //   logoutUri
    // )}`;
    const loginUrl = `${cognitoDomain}/logout?response_type=code&client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
    window.location.href = loginUrl;
  };

  switch (auth.activeNavigator) {
    case "signinSilent":
      return <div>Signing you in...</div>;
    case "signoutRedirect":
      return <div>Signing you out...</div>;
  }

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Oops... {auth.error.message}</div>;
  }

  const [user, setUser] = useState(null);


  return (
    <Router>
      <div className="app">
      <Navbar signIn={signIn} signOut={signOut} />
      <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/profile" element={<Profile user={user} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
