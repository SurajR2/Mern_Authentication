import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import { useTheme } from "./context/ThemeContext";
import ThemeToggleButton from "./components/ThemeToggleButton";
import TopBar from "./components/TopBar";

const router = createBrowserRouter([
  {
    path: "/",
    exact: true,
    element: <Home />,
  },
]);
const App = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="grid grid-rows-[auto_1fr] h-screen w-screen  bg-background dark:bg-background font-kaisei">
      <TopBar />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
