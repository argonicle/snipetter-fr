import { CircularProgress, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import useUser from "../../hooks/useUser";
import PostBox from "../organism/box/PostBox";
import usePost from "../../hooks/usePost";
import ProfileCard from "../organism/box/ProfileCard";

const Profile = () => {
  const { userId } = useParams();
  const { getUser } = useUser();
  const { getPostsByUserId, likePost, posts, deletePost } = usePost();

  useEffect(() => {
    getUser(userId);
    getPostsByUserId(userId);
  }, []);

  return (
    <ProfileContainer>
      <ProfileWrapper>
        <ProfileCard />

        {!posts ? (
          <CircularProgressWrapper>
            <CircularProgress isIndeterminate color="green.300" />
          </CircularProgressWrapper>
        ) : posts.length === 0 ? (
          <Text textAlign="center" color="white">
            No posts
          </Text>
        ) : (
          <PostCard>
            {posts.map((post) => (
              <PostBox
                key={post._id}
                post={post}
                likePost={likePost}
                deletePost={deletePost}
              />
            ))}
          </PostCard>
        )}
      </ProfileWrapper>
    </ProfileContainer>
  );
};

export default Profile;

const ProfileContainer = styled.div``;
const ProfileWrapper = styled.div`
  padding: 5% 0;
`;

const CircularProgressWrapper = styled.div`
  text-align: center;
`;
const PostCard = styled.div``;
