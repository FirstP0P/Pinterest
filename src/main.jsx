import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider} from "react-oidc-context";

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_BRgR5KGvm",
  client_id: "f2gt4v2ut7bn16tl7ctbunu6e",
  redirect_uri: "http://localhost:5173/", // Point to your localhost
  response_type: "code",
  cognitoDomain: "https://us-east-1.brgr5kgvm.auth.us-east-1.amazoncognito.com",
  scope: "email",
  //loginUrl: `${cognitoDomain}/login?response_type=code&client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}`,

  onSigninCallback: (_user) => {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
