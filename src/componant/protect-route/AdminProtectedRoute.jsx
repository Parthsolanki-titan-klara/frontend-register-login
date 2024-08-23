import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';

const AdminProtectedRoute = () => {
    const accessToken = useSelector((state) => state.auth.accessToken);
    console.log("accessToken : ", accessToken);
    
    if(!accessToken){
        return <Navigate to="/" />
    }

    try{
        const decodedToken = jwtDecode(accessToken);
        const userRole = decodedToken.role;

        if (userRole === 'ADMIN') {
            return <Outlet />;
        } else {
            return <Navigate to="/unauthorized" />;
        }
    }catch(error){
        console.error("Invalid token:", error);
        return <Navigate to="/" />;
    }
}

export default AdminProtectedRoute;