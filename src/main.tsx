import App from "~/App.tsx";
import "~/index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { StateContextProvider } from "./providers/StateProvider/StateProvider";
import { ProSidebarProvider } from 'react-pro-sidebar';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <StateContextProvider>
        <ProSidebarProvider>
          <App />
        </ProSidebarProvider>
      </StateContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
