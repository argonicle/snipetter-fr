import React from "react";
import styled from "styled-components";

import BoxLayout from "../layout/BoxLayout";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import usePost from "../../../hooks/usePost";
import Comment from "../../molecule/Comment";

const CommentCard = ({ post }) => {
  const { commentPost, content, setContent } = usePost();

  return (
    <CommentContainer>
      <CommentWrapper>
        <Flex gap="2%" mb="4%">
          <Input
            variant="filled"
            placeholder="Write your comment"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button onClick={() => commentPost(post._id)} isDisabled={!content}>
            送信
          </Button>
        </Flex>
        <Comments>
          {post.comments.length > 0 ? (
            <>
              {post.comments.map((comment) => (
                <Comment comment={comment} key={comment.createdAt} />
              ))}
            </>
          ) : (
            <Text fontSize="1.5em" fontWeight="500" textAlign="center">
              No comments
            </Text>
          )}
        </Comments>
      </CommentWrapper>
    </CommentContainer>
  );
};

export default CommentCard;

const CommentContainer = styled.div``;

const CommentWrapper = styled(BoxLayout)``;

const Comments = styled.div`
  overflow-y: scroll;
  max-height: 300px;
`;
