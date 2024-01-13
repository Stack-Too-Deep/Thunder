import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { MetaMaskProvider } from "@metamask/sdk-react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* TODO: Change the debug value in production */}
    <MetaMaskProvider
      debug={true}
      sdkOptions={{
        dappMetadata: {
          name: "Thunder",
          url: window.location.host,
        },
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MetaMaskProvider>
  </React.StrictMode>
);
