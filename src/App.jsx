import React from "react";
import { Toaster } from "react-hot-toast";

import { RouterProvider } from "react-router-dom";
import { routes } from "./Router.jsx";

const App = () => {

  return (
    <>
    
      <RouterProvider router={routes} />
      <Toaster
        position="top-center"
        gutter={12}
        toastOptions={{ success: { duration: 3000 }, error: { duration: 5000 } }}
      />
    </>
  );
};

export default App;
