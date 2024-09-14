import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { PrimeReactProvider } from "primereact/api";

import "primereact/resources/primereact.css";
import "primereact/resources/themes/soho-dark/theme.css";
// import "primereact/resources/themes/arya-blue/theme.css";
// import "primereact/resources/themes/arya-green/theme.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrimeReactProvider>
      <App />
    </PrimeReactProvider>
  </StrictMode>
);
