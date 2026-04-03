// ============================================
// main.jsx - The Entry Point
// ============================================
// This is where React starts. It takes our App component
// and "mounts" (attaches) it to the HTML page.
//
// Think of it like plugging a lamp into a wall socket:
//   - The socket = the <div id="root"> in index.html
//   - The lamp = our <App /> component
// ============================================

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
