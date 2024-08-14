import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
    const accessToken = useSelector((state) => state.auth.accessToken);
    console.log("accessToken : ", accessToken);
    
    return (
        accessToken ? <Outlet/> : <Navigate to="/signIn" />
    );
}

export default PrivateRoute;