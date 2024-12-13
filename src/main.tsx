import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store"; // Adjust the import path
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App"; // Import your App component
import DashboardPage from "@pages/DashboardPage";
import NotFoundPage from "@pages/NotFoundPage";
import ConversationListingPage from "@pages/ConversationListingPage";
import AgentListing from "@pages/AgentListing";
import MachinePage from "@pages/MachinePage";
import LoginPage from "@pages/LoginPage";
import RegisterPage from "@pages/RegisterPage";
import RecoverPasswordPage from "@pages/RecoverPasswordPage";
import ExtraPage from "@pages/ExtraPage";
import UserProfilePage from "@pages/UserProfilePage";
import { SocketProvider } from "context/SocketContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Use App as the wrapper component for your routes
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },
      {
        path: "/conversations",
        element: <ConversationListingPage />, // Main conversations page
        children: [
          {
            path: "new", // Path for creating a new conversation
            element: <ConversationListingPage />, // Reuse the listing page to show "new" state
          },
          {
            path: "/conversations/:conversationId",
            element: <ConversationListingPage />,
          },
        ],
      },
      {
        path: "/agents",
        element: <AgentListing />,
        children: [
          {
            path: ":agentId",
            element: <MachinePage />,
          },
        ],
      },
      {
        path: "/extra",
        element: <ExtraPage />,
      },
      {
        path: "/user-profile",
        element: <UserProfilePage />,
      },
    ],
    errorElement: <NotFoundPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/recover-password",
    element: <RecoverPasswordPage />,
    errorElement: <NotFoundPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SocketProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </SocketProvider>
  </StrictMode>
);
