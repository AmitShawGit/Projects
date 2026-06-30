import React from "react";
import { createBrowserRouter, createHashRouter } from "react-router-dom";
import { AuthLoader } from "./auth/AuthLoader.jsx";
// UI's 
let Applayout = React.lazy(() => import("./ui/AppLayout.jsx"));

// Components 
let Error = React.lazy(() => import("./components/Error.jsx"));

// pages 

let Dashboard = React.lazy(() => import("./pages/Dashboard.jsx"));
let AddProduct = React.lazy(() => import("./pages/products/AddProduct.jsx"));
let ViewProduct = React.lazy(() => import("./pages/products/ViewProduct.jsx"));
let Geolocation = React.lazy(() => import("./pages/geoLocation/Geolocation.jsx"));
let Mapped = React.lazy(() => import("./pages/geoLocation/Map.jsx"));

// AI App 
let CreatePost = React.lazy(() => import('./pages/ai_PostGenerator/CreatePost.jsx'))

//Dynamic Form
let DynamicForm = React.lazy(()=>import('./pages/dynamicForm/DynamicFormg.jsx'))

export const routes = createHashRouter([
  {
    element: <Applayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/project/",
        element: <Dashboard />,
      },
      {
        path: "/project/dashboard",
        element: <Dashboard />,
        // loader: AuthLoader 
      },
      {
        path: "/project/add-product",
        element: <AddProduct />,
      },
      {
        path: "/project/view-product",
        element: <ViewProduct />,
      },
      {
        path: "/project/geolocation",
        element: <Geolocation />,
      },
      {
        path: "/project/map",
        element: <Mapped />,
      },
      {
        path: "/project/create-post",
        element: <CreatePost />,
      },
      {
        path: "/project/dynamic-form",
        element: <DynamicForm />,
      },
    ],
  },
]);
