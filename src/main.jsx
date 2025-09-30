import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routers/router.jsx";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import "sweetalert2/dist/sweetalert2.js";
import { AuthProvider as AsgardeoAuthProvider } from "@asgardeo/auth-react";

const scope = (import.meta.env.VITE_ASGARDEO_SCOPE || "openid profile email")
  .split(" ")
  .filter(Boolean);

const asgardeoConfig = {
  signInRedirectURL: import.meta.env.VITE_ASGARDEO_REDIRECT_URL,
  signOutRedirectURL: import.meta.env.VITE_ASGARDEO_BASE_URL, // or use the callback if you prefer
  clientID: import.meta.env.VITE_ASGARDEO_CLIENT_ID,
  baseUrl: import.meta.env.VITE_ASGARDEO_SERVER_ORIGIN,
  scope,
  enablePKCE: true,
};

createRoot(document.getElementById("root")).render(
  // <Provider store={store}>
  //   <RouterProvider router={router} />
  // </Provider>

  //1st First step to use AsgardeoAuthProvider is to wrap the app with the provider component
  <AsgardeoAuthProvider config={asgardeoConfig}>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </AsgardeoAuthProvider>
);
