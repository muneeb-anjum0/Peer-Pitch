import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Trending from "./pages/Trending";
import New from "./pages/New";
import PitchDetail from "./pages/PitchDetail";
import PostPitch from "./pages/Post";
import "./styles/index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "trending", element: <Trending /> },
      { path: "new", element: <New /> },
      { path: "pitch/:id", element: <PitchDetail /> },
      { path: "post", element: <PostPitch /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
