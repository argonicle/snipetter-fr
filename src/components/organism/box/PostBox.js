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
} from "@chakra-ui/react";
import { BiLike, BiChat } from "react-icons/bi";
import { DeleteIcon, CloseIcon } from "@chakra-ui/icons";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { format } from "timeago.js";

import Avatar from "../../atom/Avatar";
import useUser from "../../../hooks/useUser";
import { CircularProgress } from "@chakra-ui/react";
import useAuthUser from "../../../hooks/useAuthUser";
import HamburgerMenu from "../../molecule/HamburgerMenu";

const PostBox = ({ post, likePost, isComment, deletePost }) => {
  const { authUser } = useAuthUser();
  const { getUser, user, isLoading } = useUser();

  const isLike = post.likes.includes(authUser._id);

  useEffect(() => {
    getUser(post.authorId);
  }, []);

  return (
    <Card maxW="md" sx={{ margin: "0 auto 10px" }}>
      <CardHeader>
        <Flex spacing="4" flexWrap="wrap">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            {!user || isLoading ? (
              <CircularProgress isIndeterminate color="green.300" />
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
              {!user || isLoading ? <p>Loading...</p> : <p>{user.username}</p>}
              <Text>language: {post.language}</Text>
            </Box>
          </Flex>
          {authUser._id === post.authorId && (
            <HamburgerMenu>
              <MenuItem
                icon={<DeleteIcon />}
                onClick={() => deletePost(post._id)}
                command="⌘T"
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
      {isComment ? (
        <Link to="/home/timeline" style={{ width: "20%", margin: "0 auto 3%" }}>
          <Button
            variant={isLike ? undefined : "ghost"}
            leftIcon={<CloseIcon />}
          >
            Close
          </Button>
        </Link>
      ) : (
        <CardFooter justify="center" flexWrap="wrap" gap="2rem">
          <Button
            variant={isLike ? undefined : "ghost"}
            colorScheme={isLike ? "pink" : "gray"}
            leftIcon={<BiLike />}
            onClick={() => likePost(post._id, authUser._id)}
          >
            {post.likes.length} Likes
          </Button>
          <Link to={`/home/timeline/${post._id}`} state={{ post }}>
            <Button variant="ghost" leftIcon={<BiChat />}>
              {post.comments?.length} Comments
            </Button>
          </Link>
        </CardFooter>
      )}
    </Card>
  );
};

export default PostBox;

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
