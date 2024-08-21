import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import { LoginPage } from './pages/Login';
import SignUp from "./pages/SignUp";
import Dashboard from "./componant/Dashboard";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "./componant/protect-route/PrivateRoute";
import ForgotPassword from "./componant/ForgotPassword";

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer autoClose={1000} />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reset-password" element={<ForgotPassword />} />
        </Route>
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

