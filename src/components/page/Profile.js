import { Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import useUser from "../../hooks/useUser";
import ProfileCard from "../organism/box/ProfileCard";
import LoadingCircle from "../atom/LoadingCircle";
import useAllPosts from "../../hooks/useAllPosts";
import PostCard from "../organism/box/PostCard";

const Profile = () => {
  const { allPosts } = useAllPosts();
  const { userId } = useParams();
  const { getUser } = useUser();
  const posts = allPosts.filter((post) => post.authorId === userId);

  useEffect(() => {
    getUser(userId);
  }, []);

  return (
    <ProfileContainer>
      <ProfileCard />

      {!posts ? (
        <CircularProgressWrapper>
          <LoadingCircle />
        </CircularProgressWrapper>
      ) : posts.length === 0 ? (
        <Text textAlign="center" color="white">
          No posts
        </Text>
      ) : (
        <PostCards>
          {posts.map((post) => (
            <PostCard key={post._id} post={post} isProfile />
          ))}
        </PostCards>
      )}
    </ProfileContainer>
  );
};

export default Profile;

const ProfileContainer = styled.div`
  padding: 5% 0;
`;

const CircularProgressWrapper = styled.div`
  text-align: center;
`;

const PostCards = styled.div`
  overflow-y: scroll;
  height: 100vh;
`;
