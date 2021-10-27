import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { UserProvider, SongsProvider } from "./context";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <SongsProvider>
        <App />
      </SongsProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
