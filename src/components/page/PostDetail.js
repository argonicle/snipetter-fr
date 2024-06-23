import React from "react";
import Timeline from "./Timeline";
import styled from "styled-components";
import { useLocation, useParams } from "react-router-dom";
import useAllPosts from "../../hooks/useAllPosts";
import PostCard from "../organism/box/PostCard";
import CommentCard from "../organism/box/CommentCard";
import Profile from "./Profile";

const PostDetail = () => {
  const { postId } = useParams();
  const { allPosts } = useAllPosts();
  const post = allPosts.find((post) => postId === post._id);

  const { state: isProfile } = useLocation();

  return (
    <PostDetailContainer>
      {isProfile ? <Profile /> : <Timeline />}
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
  position: fixed;
  overflow-y: scroll;
  padding-top: 3%;
  margin-top: 133px;
  z-index: 1;
  top: 0;
  width: 100%;
  height: 100%;
`;
