import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import './App.css';
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Layout from "./Layout";
import Home from "./Home";
import Preference from "./Components/Preference";
import ProtectedRoute from "./middleware/ProtectedRoute";
import { AuthProvider } from './context/AuthContext';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true, 
          element: <Navigate to="/news" replace /> 
        },
        {
          path: "/:type",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "/preference",
          element: (
            <ProtectedRoute>
              <Preference />
            </ProtectedRoute>
          ),
        },
        
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
