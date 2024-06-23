import React, { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  MenuItem,
  Avatar,
} from "@chakra-ui/react";
import { BiLike, BiChat } from "react-icons/bi";
import { DeleteIcon, CloseIcon } from "@chakra-ui/icons";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { format } from "timeago.js";

import useUser from "../../../hooks/useUser";
import useAuthUser from "../../../hooks/useAuthUser";
import HamburgerMenu from "../../molecule/HamburgerMenu";
import LoadingCircle from "../../atom/LoadingCircle";
import usePost from "../../../hooks/usePost";

const PostCard = ({ post, isProfile, isDetail }) => {
  const { authUser } = useAuthUser();
  const { getUser, user, isLoading } = useUser();
  const { likePost, deletePost } = usePost();

  const isLike = post.likes.includes(authUser._id);

  useEffect(() => {
    getUser(post.authorId);
  }, []);

  return (
    <Card maxW="md" m="0 auto 10px">
      <CardHeader>
        <Flex spacing="4" flexWrap="wrap">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            {isLoading || !user ? (
              <LoadingCircle />
            ) : (
              <Link to={`/home/profile/${user._id}`}>
                <SAvatar
                  src={process.env.REACT_APP_BACKEND_ORIGIN + user.profileImage}
                />
              </Link>
            )}

            <Box>
              <Flex alignItems="center" gap="10px">
                <Heading size="sm">{post.title}</Heading>
                <Text>{format(post.createdAt)}</Text>
              </Flex>
              {isLoading || !user ? (
                <Text>Loading...</Text>
              ) : (
                <Text>{user.username}</Text>
              )}
              <Text>language: {post.language}</Text>
            </Box>
          </Flex>
          {authUser._id === post.authorId && (
            <HamburgerMenu>
              <MenuItem
                icon={<DeleteIcon />}
                onClick={() => deletePost(post._id, isProfile)}
              >
                Delete post
              </MenuItem>
            </HamburgerMenu>
          )}
        </Flex>
      </CardHeader>

      <Code>{post.code}</Code>
      <CardBody>
        <Text>{post.description}</Text>
      </CardBody>

      <CardFooter justify="center" flexWrap="wrap" gap="2rem">
        <Button
          variant={isLike ? undefined : "ghost"}
          colorScheme={isLike ? "pink" : "gray"}
          leftIcon={<BiLike />}
          onClick={() => likePost(post._id)}
        >
          {post.likes.length} Likes
        </Button>
        <Link
          to={
            isProfile
              ? isDetail
                ? `/home/profile/${user?._id}`
                : `/home/profile/${user?._id}/${post._id}`
              : isDetail
              ? `/home/timeline`
              : `/home/timeline/${post._id}`
          }
          state={isProfile}
        >
          <Button
            variant="ghost"
            leftIcon={isDetail ? <CloseIcon /> : <BiChat />}
          >
            {isDetail ? (
              <Text>Close</Text>
            ) : (
              <Text> {post.comments?.length} Comments</Text>
            )}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PostCard;

const Code = styled.pre`
  background-color: #f5f5f5;
  width: 90%;
  min-height: 100px;
  max-height: 300px;
  padding: 15px;
  margin: 0 auto;
  overflow-x: scroll;
  overflow-y: scroll;
`;

const SAvatar = styled(Avatar)`
  height: 60px;
  width: 60px;
`;
