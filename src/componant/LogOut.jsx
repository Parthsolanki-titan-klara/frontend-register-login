import { useDispatch } from "react-redux";
import { clearTokens } from "./slices/authSlice";
import { useNavigate } from "react-router-dom";

const useHandleLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearTokens({ accessToken: null, refreshToken: null }));
    navigate('/');
  };

  return handleLogout;
};

export default useHandleLogout;