import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    return (
        localStorage.getItem('accessToken') ? <Outlet /> : <Navigate to="/signIn" />
    );
}

export default PrivateRoute;