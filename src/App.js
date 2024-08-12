import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import { LoginPage } from './pages/Login';
import SignUp from "./pages/SignUp";
import Dashboard from "./componant/Dashboard";

export default function App() {
  return (
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<SignUp/>} />
        </Routes>
      </BrowserRouter>
    
    </div>
    </div>
  );
}

