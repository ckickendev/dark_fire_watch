import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Home } from "./components/Home";
import { Authentication } from './components/AuthComponent/Authentication';
import { NotFoundPage } from './components/ErrorPage/NotFoundPage';
import { AccessForbidden } from './components/ErrorPage/AccessForbidden';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" exact errorElement={<NotFoundPage />} >
      <Route path="auth" element={<Authentication />} />
      <Route path="" element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route path="notfound" element={<NotFoundPage />}  />
      <Route path="forbidden" element={<AccessForbidden />}  />
    </Route>
  )
);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
