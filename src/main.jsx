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

createRoot(document.getElementById("root")).render(
  // <Provider store={store}>
  //   <RouterProvider router={router} />
  // </Provider>

  //1st First step to use AsgardeoAuthProvider is to wrap the app with the provider component
  <AsgardeoAuthProvider
    config={{
      signInRedirectURL: "http://localhost:5173/auth/callback",
      signOutRedirectURL: "http://localhost:5173",
      clientID: "8eqotwYJ8B9h9wCOOp9s5HfK0tQa",
      baseUrl: "https://api.asgardeo.io/t/rosnifarook",
      scope: ["openid", "profile"],
    }}
  >
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </AsgardeoAuthProvider>
);
