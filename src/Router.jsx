import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ExpensesView from "./components/ExpensesView";
import UserSettings from "./components/UserSettings";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <ExpensesView />,
        },
        {
          path: "settings",
          element: <UserSettings />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
