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

export default function App() {
  return (
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
      <BrowserRouter>
      <ToastContainer autoClose={1000}/>
        <Routes>
          <Route path="/signIn" element={<LoginPage/>} />
          <Route element={<PrivateRoute/>}>
            <Route path="/dashboard" element={<Dashboard/>} />
          </Route>
          <Route path="/signup" element={<SignUp/>} />
        </Routes>
      </BrowserRouter>
    
    </div>
    </div>
  );
}

