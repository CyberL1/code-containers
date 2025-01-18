import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Containers, {
  Loader as ContainersLoader,
} from "./pages/containers/index.tsx";
import ContainerPage, {
  Loader as ContainerDataLoader,
} from "./pages/containers/[name]/index.tsx";
import TerminalPage from "./pages/containers/[name]/terminal.tsx";
import ReinstallPage from "./pages/containers/[name]/reinstall.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <App error />,
    children: [
      {
        path: "/",
        element: <Containers />,
        loader: ContainersLoader,
      },
      {
        path: "/containers/:name",
        element: <ContainerPage />,
        loader: ContainerDataLoader,
      },
      {
        path: "/containers/:name/terminal",
        element: <TerminalPage />,
        loader: ContainerDataLoader,
      },
      {
        path: "/containers/:name/reinstall",
        element: <ReinstallPage />,
        loader: ContainerDataLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
