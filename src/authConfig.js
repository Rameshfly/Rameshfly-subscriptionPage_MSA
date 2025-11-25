const msalConfig = {
    auth: {
      clientId: "c2c6d129-41c0-40b9-80dc-4839caed5f02", // replace with your Azure AD app client ID
      authority: "https://login.microsoftonline.com/a2c0c009-2f46-46d9-87b9-d5ced8c0f47b", // replace with your Azure AD tenant ID
      redirectUri: "http://localhost:5173", // replace with your redirect URI
    },
};

export const loginRequest = {
    scopes: ["User.Read"], // request user profile data
};