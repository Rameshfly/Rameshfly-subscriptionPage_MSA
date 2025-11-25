import React, { useState } from "react";
import { MsalProvider, useMsal, useIsAuthenticated } from "@azure/msal-react";
import {
  PublicClientApplication,
  Configuration,
  RedirectRequest,
} from "@azure/msal-browser";

// ================== MSAL Configuration ==================
const msalConfig: Configuration = {
  auth: {
    clientId: "c2c6d129-41c0-40b9-80dc-4839caed5f02",
    authority:
      "https://login.microsoftonline.com/a2c0c009-2f46-46d9-87b9-d5ced8c0f47b", // or your tenant
    redirectUri: "http://localhost:5173/", // 👈 your custom redirect URI
    postLogoutRedirectUri: "https://www.google.com/",
  },
};

const pca = new PublicClientApplication(msalConfig);

(async () => {
  try {
    await pca.initialize(); // 👈 REQUIRED!
    console.log("MSAL initialized.");

    const result = await pca.handleRedirectPromise();

    if (result) {
      console.log("Redirect result received!", result);

      window.ReactNativeWebView?.postMessage(
        JSON.stringify({
          token: result.accessToken,
          account: result.account,
        })
      );
    }
  } catch (e) {
    console.error("MSAL initialization/redirect error:", e);
  }
})();

// Extend the Window interface to include ReactNativeWebView
declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
  }
}

const CustomLoginForm: React.FC = () => {
  const { instance } = useMsal();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // ⚠️ Azure AD does NOT allow direct username/password exchange
  // from client-side JS (for security). We’ll trigger redirect-based
  // OAuth flow when user clicks login.
  const handleLogin = async () => {
    try {
      const request: RedirectRequest = {
        scopes: ["User.Read"],
        loginHint: username || undefined, // optionally prefill username
      };

      await instance.loginRedirect(request); // 🔁 Redirect flow
    } catch (err) {
      console.error("Redirect login failed:", err);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Sign in with Microsoft</h2>

      <input
        type="text"
        placeholder="Email or username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={styles.input}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />

      <button onClick={handleLogin} style={styles.button}>
        Login
      </button>
    </div>
  );
};

const Content: React.FC = () => {
  const { accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  return (
    <div>
      {isAuthenticated && accounts.length > 0 ? (
        <div style={styles.loggedIn}>
          <p>✅ Welcome, {accounts[0].username}</p>
        </div>
      ) : (
        <CustomLoginForm />
      )}
    </div>
  );
};

const Login: React.FC = () => (
  <MsalProvider instance={pca}>
    <Content />
  </MsalProvider>
);

export { Login };

const styles: Record<string, React.CSSProperties> = {
  container: {
    textAlign: "center",
    marginTop: "100px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    margin: "8px",
    padding: "10px",
    width: "240px",
    fontSize: "14px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    marginTop: "12px",
    padding: "10px 20px",
    fontSize: "15px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#0078D4",
    color: "white",
    cursor: "pointer",
  },
  loggedIn: {
    textAlign: "center",
    marginTop: "100px",
  },
};
