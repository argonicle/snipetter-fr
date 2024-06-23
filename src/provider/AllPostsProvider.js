import React, { createContext, useEffect, useState } from "react";

import postApi from "../api/postApi";
import LoadingCircle from "../components/atom/LoadingCircle";

export const AllPostsContext = createContext();

const AllPostsProvider = ({ children }) => {
  const [allPosts, setAllPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const fetchAllPosts = async () => {
    try {
      setIsLoading(true);
      const { data: result } = await postApi.getAll();
      setAllPosts(
        result.posts.sort((post1, post2) => {
          return new Date(post2.createdAt) - new Date(post1.createdAt);
        })
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingCircle />;
  } else if (!allPosts) {
    return <p>データの取得に失敗しました</p>;
  } else {
    return (
      <AllPostsContext.Provider value={{ allPosts, setAllPosts }}>
        {children}
      </AllPostsContext.Provider>
    );
  }
};

export default AllPostsProvider;
