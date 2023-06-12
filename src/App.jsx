import{
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

//layouts
import Main, { mainLoader } from "./layouts/Main";

//Routes
import Dashboard, { dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";
import { Children } from "react";

//actions
import { logoutAction } from "./actions/logout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Dashboard/>,
        loader: dashboardLoader,
        errorElement: <Error />
      },
      {
        path: "logout",
        action: logoutAction
      }
    ]
  },
  
]);

function App() {
  return <div className="App">
    <RouterProvider router={router} /> 
  </div>;
}

export default App;
