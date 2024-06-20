import { useState } from "react";
import postApi from "../api/postApi";
import { useToast } from "@chakra-ui/react";
import useAuthUser from "./useAuthUser";

const usePost = (initPost) => {
  const { authUser } = useAuthUser();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllPosts = async () => {
    try {
      setIsLoading(true);
      const { data: result } = await postApi.getAll();
      setPosts(
        result.posts.sort((post1, post2) => {
          return new Date(post2.createdAt) - new Date(post1.createdAt);
        })
      );
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const getPostsByUserId = async (userId) => {
    try {
      setIsLoading(true);
      const { data: result } = await postApi.getByUserId(userId);
      setPosts(
        result.posts.sort((post1, post2) => {
          return new Date(post2.createdAt) - new Date(post1.createdAt);
        })
      );
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [editorValue, setEditorValue] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState({});
  const toast = useToast();

  const createPost = async () => {
    const newError = validatePostInput(
      title,
      language,
      editorValue,
      description
    );
    if (Object.keys(newError).length > 0) {
      const titleErrMsg = newError.title ?? "";
      const languageErrMsg = newError.language ?? "";
      const editorValueErrMsg = newError.editorValue ?? "";
      const descriptionErrMsg = newError.description ?? "";
      const errorMsg = `${titleErrMsg}\n${languageErrMsg}\n${editorValueErrMsg}\n${descriptionErrMsg}`;
      toast({
        title: "Failed.",
        description: errorMsg,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return setError(newError);
    } else {
      setError({});
    }

    try {
      setIsLoading(true);
      const post = {
        title,
        language,
        code: editorValue,
        description,
        authorId: authUser._id,
      };
      await postApi.create(post);
      toast({
        description: "Your Snippet is posted.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setTitle("");
      setLanguage("");
      setEditorValue("");
      setDescription("");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const validatePostInput = (title, language, editorValue, description) => {
    const newError = {};
    if (!title) {
      newError.title = "Please enter title";
    }
    if (!language) {
      newError.language = "Please enter language";
    }
    if (!editorValue) {
      newError.editorValue = "Please enter snippet";
    }
    if (!description) {
      newError.description = "Please enter description";
    }
    return newError;
  };

  const likePost = async (postId, userId) => {
    try {
      setIsLoading(true);
      const { data: result } = await postApi.like(postId, userId);
      const newPosts = posts.map((post) => {
        if (result.post._id === post._id) {
          return result.post;
        } else {
          return post;
        }
      });
      setPosts(
        newPosts.sort((post1, post2) => {
          return new Date(post2.createdAt) - new Date(post1.createdAt);
        })
      );

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const [content, setContent] = useState("");
  const [comments, setComments] = useState(initPost?.comments);

  const commentPost = async (post) => {
    await getAllPosts();
    const createdAt = Date.now();
    const comment = { userId: authUser._id, content, createdAt };
    try {
      setIsLoading(true);
      const { data: result } = await postApi.comment(post._id, comment);
      setComments(result.post.comments);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const deletePost = async (postId) => {
    await getAllPosts();
    try {
      setIsLoading(true);
      const { data: result } = await postApi.delete(postId);
      console.log(result.post);
      const newPosts = posts.filter((post) => {
        return result.post._id !== post._id;
      });
      setPosts(
        newPosts.sort((post1, post2) => {
          return new Date(post2.createdAt) - new Date(post1.createdAt);
        })
      );
      toast({
        title: "Success.",
        description: "Your post are deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return {
    setPosts,
    getAllPosts,
    getPostsByUserId,
    createPost,
    likePost,
    commentPost,
    setTitle,
    setLanguage,
    setEditorValue,
    setDescription,
    setContent,
    setComments,
    deletePost,
    posts,
    isLoading,
    error,
    title,
    language,
    editorValue,
    description,
    content,
    comments,
  };
};

export default usePost;
