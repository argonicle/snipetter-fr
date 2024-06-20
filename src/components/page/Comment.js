import React from "react";
import styled from "styled-components";

import BoxLayout from "../organism/layout/BoxLayout";
import PostBox from "../organism/box/PostBox";
import { useLocation } from "react-router-dom";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import CommentContent from "../molecule/CommentContent";
import usePost from "../../hooks/usePost";

const Comment = () => {
  const {
    state: { post },
  } = useLocation();

  const { commentPost, content, setContent, comments } = usePost(post);

  const comment = () => {
    commentPost(post);
    setContent("");
  };

  return (
    <CommentContainer>
      <PostBox post={post} isComment />
      <CommentBox>
        <Flex gap="2%" mb="4%">
          <Input
            variant="filled"
            placeholder="Write your comment"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button onClick={comment} isDisabled={!content}>
            送信
          </Button>
        </Flex>
        {comments.length > 0 ? (
          <>
            {comments.map((comment) => (
              <CommentContent comment={comment} post={post} />
            ))}
          </>
        ) : (
          <Text fontSize="1.5em" fontWeight="500" textAlign="center">
            No comments
          </Text>
        )}
      </CommentBox>
    </CommentContainer>
  );
};

export default Comment;

const CommentContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  position: absolute;
  top: 133px;
  left: 0;
  width: 100%;
  min-height: 100%;
  z-index: 1;
  padding: 10% 0;
`;

const CommentBox = styled(BoxLayout)`
  min-height: 10%;
`;
