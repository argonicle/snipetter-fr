import { useContext } from "react";
import { AuthUserContext } from "../provider/AuthUserProvider";

const useAuthUser = () => {
  return useContext(AuthUserContext);
};

export default useAuthUser;
