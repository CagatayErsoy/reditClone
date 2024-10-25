import React from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./layouts/root-layout";
import LandingLayout from "./layouts/landing-layout";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import LandingPage from "./pages/Landing";
import { AppProvider } from "./context/AppContext";
import "./index.css";
import CommunityPage from "./pages/Community";
import PostPage from "./pages/Post";
// For signed-in users

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <LandingLayout />,
        children: [
          { path: "/", element: <LandingPage /> }, // Landing page for non-authenticated users
        ],
      },
      { path: "/sign-in/*", element: <SignInPage /> }, // Sign In page
      { path: "/sign-up/*", element: <SignUpPage /> },
      { path: "/community/:id", element: <CommunityPage /> },
      { path: "/post/:id", element: <PostPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>
);
