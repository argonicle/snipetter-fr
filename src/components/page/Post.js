import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Input, Button, Select, Textarea } from "@chakra-ui/react";
import Editor, { loader } from "@monaco-editor/react";

import usePost from "../../hooks/usePost";

const Post = () => {
  const {
    createPost,
    setTitle,
    setLanguage,
    setEditorValue,
    setDescription,
    isLoading,
    error,
    title,
    language,
    editorValue,
    description,
  } = usePost();

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (error.editorValue !== undefined) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [error.editorValue]);

  useEffect(() => {
    loader.config({
      paths: {
        vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.23.0/min/vs",
      },
    });
    loader.init().then((monaco) => {
      monaco.editor.defineTheme("myCustomTheme", {
        base: "vs", // 既存のテーマをベースにする
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#f0f0f0", // 背景色を指定
        },
      });
    });
  }, []);

  return (
    <PostContainer>
      <PostCard>
        <PostInput
          isInvalid={error.title !== undefined}
          isDisabled={isLoading}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          focusBorderColor="gray.400"
          placeholder="Title"
          width="80%"
        />
        <Select
          isInvalid={error.language !== undefined}
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          isDisabled={isLoading}
          focusBorderColor="gray.400"
          placeholder="Language"
          width="80%"
          m="0 auto 5%"
        >
          <option>javascript</option>
          <option>java</option>
          <option>python</option>
          <option>php</option>
          <option>ruby</option>
          <option>html</option>
          <option>css</option>
        </Select>
        <EditorWrapper isError={isError}>
          <Editor
            options={{ readOnly: isLoading }}
            height="200px"
            defaultLanguage="javascript"
            theme="myCustomTheme"
            value={editorValue}
            onChange={(value) => {
              setEditorValue(value);
            }}
          />
        </EditorWrapper>
        <Textarea
          isInvalid={error.description !== undefined}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          isDisabled={isLoading}
          marginTop="5%"
          focusBorderColor="gray.400"
          placeholder="Description"
          width="80%"
        />
      </PostCard>
      <PostButton isLoading={isLoading} color="gray" onClick={createPost}>
        Post
      </PostButton>
    </PostContainer>
  );
};

export default Post;

const PostContainer = styled.div`
  text-align: center;
  padding-top: 5%;
  height: 100vh;
`;

const PostCard = styled.div`
  width: 90%;
  background-color: white;
  box-shadow: 13px 5px 27px -3px #777777;
  border-radius: 10px;
  margin: 0 auto;
  padding: 5% 0;
`;

const PostInput = styled(Input)`
  margin-bottom: 5%;
`;

const EditorWrapper = styled.div`
  border: ${(props) => (props.isError ? "2px solid red" : "none")};
  bottom: 10px;
  width: 80%;
  margin: 0 auto;
`;

const PostButton = styled(Button)`
  margin: 1% 0;
`;
