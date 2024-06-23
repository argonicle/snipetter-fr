import { useContext } from "react";
import { AllPostsContext } from "../provider/AllPostsProvider";

const useAllPosts = () => {
  return useContext(AllPostsContext);
};

export default useAllPosts;
