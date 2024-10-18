import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/Store";

// styles
import "./styles/GlobalStyle.css";

// ==== Composant ==== //
import RootLayout from "./layout/RootLayout";
import Error404 from "./components/Error";
// =================== //

// === Pages === //
import Accueil from "./pages/Accueil";
import SignIn from "./pages/SignIn";
import UserIndex from "./pages/UserIndex";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Accueil />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/user" element={<UserIndex />} />
      <Route path="*" element={<Error404 />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

/* <Route
        path="/logement/:id"
        loader={logementLoader}
        errorElement={<Error />}
        element={<Logement />}
      />
      <Route path="*" element={<Error />} /> */
