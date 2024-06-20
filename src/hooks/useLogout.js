import { useNavigate } from "react-router-dom";
import useAuthUser from "./useAuthUser";

const useLogout = () => {
  const navigate = useNavigate();
  const { setAuthUser } = useAuthUser();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setAuthUser(null);
    navigate("/");
  };

  return { handleLogout };
};

export default useLogout;
