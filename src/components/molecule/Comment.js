import { Avatar, Flex, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import styled from "styled-components";
import { format } from "timeago.js";
import { Link } from "react-router-dom";

import useUser from "../../hooks/useUser";
import LoadingCircle from "../atom/LoadingCircle";

const Comment = ({ comment }) => {
  const { getUser, user, isLoading } = useUser();
  useEffect(() => {
    getUser(comment.userId);
  }, []);

  return (
    <CommentContentContainer>
      <Flex alignItems="center" justifyContent="space-between" flexWrap="wrap">
        <Flex alignItems="center" gap="10px" wordBreak="break-word">
          {isLoading || !user ? (
            <LoadingCircle />
          ) : (
            <Link to={`/home/profile/${user._id}`}>
              <Avatar
                src={process.env.REACT_APP_BACKEND_ORIGIN + user.profileImage}
              ></Avatar>
              <Text>{user.username}</Text>
            </Link>
          )}

          <Text fontSize="1.3em">{comment.content}</Text>
        </Flex>
        <Text fontSize="1.1em">{format(comment.createdAt)}</Text>
      </Flex>
    </CommentContentContainer>
  );
};

export default Comment;

const CommentContentContainer = styled.div`
  margin-bottom: 3%;
`;
