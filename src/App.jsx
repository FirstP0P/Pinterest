import { useState, useEffect } from "react";
import Header from "./components/Header";
import React from "react";
import { useAuth } from "react-oidc-context";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {
  const auth = useAuth();

  const signOut = async () => {
    // Remove the user from local session
    await auth.removeUser();

    // Then redirect to Cognito’s logout endpoint
    const clientId = "f2gt4v2ut7bn16tl7ctbunu6e";
    const logoutUri = "http://localhost:5173/";
    const cognitoDomain = "<cognito-domain>";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
      logoutUri
    )}`;
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mock authentication
  const login = (username) => {
    setUser({ username, id: Date.now().toString() });
    setIsAuthenticated(true);
    localStorage.setItem(
      "user",
      JSON.stringify({ username, id: Date.now().toString() })
    );
  };

  // Check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <div className="app">
        <Header
          signOut={signOut}
          user={user}
          isAuthenticated={isAuthenticated}
          onLogin={login}
        />
        <Routes>
          <Route
            path="/"
            element={<Home user={user} isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/profile"
            element={<Profile user={user} isAuthenticated={isAuthenticated} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
