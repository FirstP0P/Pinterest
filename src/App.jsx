import React from "react";
import { useAuth } from "react-oidc-context";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const auth = useAuth();

  const signIn = () => {
    auth.signinRedirect();
  };

  const signOut = async () => {
    await auth.removeUser(); // Clears the session

    const clientId = "f2gt4v2ut7bn16tl7ctbunu6e"; // Replace with your Cognito App Client ID
    const logoutUri = "http://localhost:5173/";
    const cognitoDomain =
      "https://us-east-1brgr5kgvm.auth.us-east-1.amazoncognito.com";

    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
      logoutUri
    )}`;
  };

  if (auth.isLoading) return <div>Loading...</div>;
  if (auth.error) return <div>Oops... {auth.error.message}</div>;

  return (
    <div>
      <Navbar signIn={signIn} signOut={signOut} />
    </div>
  );
}

export default App;
