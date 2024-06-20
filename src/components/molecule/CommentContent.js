import { Avatar, CircularProgress, Flex, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import styled from "styled-components";
import { format } from "timeago.js";

import useUser from "../../hooks/useUser";
import { Link } from "react-router-dom";

const CommentContent = ({ comment }) => {
  const { getUser, user, isLoading } = useUser();
  useEffect(() => {
    getUser(comment.userId);
  }, []);

  return (
    <CommentContentContainer>
      <Flex alignItems="center" justifyContent="space-between" flexWrap="wrap">
        <Flex alignItems="center" gap="10px" wordBreak="break-word">
          {isLoading || !user ? (
            <CircularProgress isIndeterminate color="green.300" />
          ) : (
            <Link to={`/home/profile/${user._id}`}>
              <Avatar
                src={process.env.REACT_APP_BACKEND_ORIGIN + user.profileImage}
              ></Avatar>
            </Link>
          )}

          <Text fontSize="1.3em">{comment.content}</Text>
        </Flex>
        <Text fontSize="1.1em">{format(comment.createdAt)}</Text>
      </Flex>
    </CommentContentContainer>
  );
};

export default CommentContent;

const CommentContentContainer = styled.div`
  margin-bottom: 3%;
`;
