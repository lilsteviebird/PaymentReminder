import React from 'react';
import Home from './components/Subs/Home';
import Login from './components/Authentication/Login';
import Signup from './components/Authentication/Signup';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {path: '/', element: <Login />},
  {path: '/home', element: <Home />},
  {path: '/signup', element: <Signup/>}
]);

function App() {
  return (
    <RouterProvider router = {router} />
  );
}

export default App;
