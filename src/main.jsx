import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from "./contexts/ThemeContext";
import './index.css';
import Root from './layout/Root';
import CreateProfile from './pages/CreateProfile';
import FindPartners from './pages/FindPartners';
import Home from './pages/Home';
import Login from './pages/Login';
import MyConnections from './pages/MyConnections';
import NotFound404 from './pages/NotFound404';
import PartnerDetails from './pages/PartnerDetails';
import Register from './pages/Register';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/", 
        element: <Home /> 
      },
      {
        path: "/login", 
        element: <Login />, 
      },
      {
        path: "/register", 
        element: <Register/>, 
      },
      {
        path: "/create-profile", 
        element: <CreateProfile/>, 
      },
      {
        path: "/partners", 
        element: <FindPartners/>, 
      },
      {
        path: "/connections", 
        element: <MyConnections/>, 
      },
       {
        path: "/partners/:id",       
        element: (
           <PrivateRoute>
            <PartnerDetails />
          </PrivateRoute>
         
        ),
        },
        { path: "*", 
          element: <NotFound404 />
         }

    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <ThemeProvider>
  <RouterProvider router={router} />
    </ThemeProvider>
    </AuthProvider>
   
  </StrictMode>,
)
