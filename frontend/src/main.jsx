// package imports
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
//main imports
import App from "./App.jsx";
import store from "./Store.js";
// screens imports
import HomeScreens from "./screens/HomeScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import DiaryScreen from "./screens/DiaryScreen.jsx";
import SchedulerScreen from "./screens/SchedulerScreen.jsx";
import FilesScreen from "./screens/FilesScreen.jsx";
import UpdateProfileScreen from "./screens/UpdateProfileScreen.jsx";
// component imports
import PrivateRoute from "./components/PrivateRoute.jsx";
import PasswordReset from "./components/PasswordReset.jsx";
// scss import
import "./styles/main.scss";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<LoginScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/password-reset" element={<PasswordReset />} />

      {/* Private Routes */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/home" element={<HomeScreens />} />
        <Route path="/diary" element={<DiaryScreen />} />
        <Route path="/schedule" element={<SchedulerScreen />} />
        <Route path="/files" element={<FilesScreen />} />
        <Route path="/profile-update" element={<UpdateProfileScreen />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router}></RouterProvider>
    </React.StrictMode>
  </Provider>
);
