import React from "react";
import styled from "styled-components";

import useAllPosts from "../../hooks/useAllPosts";
import PostCard from "../organism/box/PostCard";

const Timeline = () => {
  const { allPosts } = useAllPosts();

  return (
    <TimelineContainer>
      {allPosts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </TimelineContainer>
  );
};

export default Timeline;

const TimelineContainer = styled.div`
  padding: 3% 0;
`;
