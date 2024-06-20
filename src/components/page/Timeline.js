import React, { useEffect } from "react";
import styled from "styled-components";
import { CircularProgress } from "@chakra-ui/react";

import PostBox from "../organism/box/PostBox";
import usePost from "../../hooks/usePost";
import { Outlet } from "react-router-dom";

const Timeline = () => {
  const { getAllPosts, likePost, posts, deletePost } = usePost();

  useEffect(() => {
    getAllPosts();
  }, [posts]);

  if (!posts) {
    return (
      <LoadingContainer>
        <CircularProgress isIndeterminate color="green.300" />
      </LoadingContainer>
    );
  } else {
    return (
      <TimelineContainer>
        <Outlet />
        {posts.map((post) => (
          <PostBox
            key={post._id}
            post={post}
            likePost={likePost}
            deletePost={deletePost}
          />
        ))}
      </TimelineContainer>
    );
  }
};

export default Timeline;

const TimelineContainer = styled.div`
  padding-top: 3%;
`;

const LoadingContainer = styled(TimelineContainer)`
  text-align: center;
`;
