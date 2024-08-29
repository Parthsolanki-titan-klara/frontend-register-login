import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from "react";

const AdminProtectedRoute = () => {
    const accessToken = useSelector((state) => state.auth.accessToken);
    const navigate = useNavigate();
    
    if(!accessToken){
        return navigate('/');
    }

    try{
        const decodedToken = jwtDecode(accessToken);
        const userRole = decodedToken.role;

        useEffect(() => {
            if (userRole !== 'ADMIN') {
                navigate('/unauthorized');
            }
        }, [userRole]);

        return (
            userRole === 'ADMIN' ? <Outlet/> : <Navigate to="/unauthorized" />
        );
    }catch(error){
        console.error("Invalid token:", error);
        return navigate('/');
    }
}

export default AdminProtectedRoute;