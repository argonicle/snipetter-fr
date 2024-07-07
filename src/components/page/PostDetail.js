import React from "react";
import styled from "styled-components";
import { useLocation, useParams } from "react-router-dom";
import useAllPosts from "../../hooks/useAllPosts";
import PostCard from "../organism/box/PostCard";
import CommentCard from "../organism/box/CommentCard";

const PostDetail = () => {
  const { postId } = useParams();
  const { allPosts } = useAllPosts();
  const post = allPosts.find((post) => postId === post._id);

  const { state: isProfile } = useLocation();

  return (
    <PostDetailContainer>
      <PostDetailCard>
        <PostCard post={post} isDetail isProfile={isProfile} />
        <CommentCard post={post} />
      </PostDetailCard>
    </PostDetailContainer>
  );
};

export default PostDetail;

const PostDetailContainer = styled.div``;
const PostDetailCard = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  padding: 3% 0;
  width: 100%;
  min-height: 100vh;
`;
