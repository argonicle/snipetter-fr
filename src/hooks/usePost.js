import { useState } from "react";

import postApi from "../api/postApi";
import useAuthUser from "./useAuthUser";
import useAllPosts from "./useAllPosts";
import useMessage from "./useMessage";
import { useNavigate } from "react-router-dom";

const usePost = () => {
  const { allPosts, setAllPosts } = useAllPosts();
  const { authUser } = useAuthUser();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { showMessage } = useMessage();

  const getPostsByUserId = async (userId) => {
    try {
      setIsLoading(true);
      const { data: result } = await postApi.getByUserId(userId);
      setPosts(
        result.posts.sort((post1, post2) => {
          return new Date(post2.createdAt) - new Date(post1.createdAt);
        })
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [editorValue, setEditorValue] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState({});

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
      showMessage("Failed.", errorMsg, "error");
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
      const { data: result } = await postApi.create(post);
      showMessage("Success.", "Your Snippet is posted.", "success");
      setTitle("");
      setLanguage("");
      setEditorValue("");
      setDescription("");
      const newPosts = [...allPosts, result.post];
      setAllPosts(
        newPosts.sort((post1, post2) => {
          return new Date(post2.createdAt) - new Date(post1.createdAt);
        })
      );
    } catch (error) {
      console.log(error);
    } finally {
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

  const likePost = async (postId) => {
    try {
      setIsLoading(true);
      const { data: result } = await postApi.like(postId, authUser._id);
      const newPosts = allPosts.map((post) => {
        if (result.post._id === post._id) {
          return result.post;
        } else {
          return post;
        }
      });
      const sortedNewPosts = newPosts.sort((post1, post2) => {
        return new Date(post2.createdAt) - new Date(post1.createdAt);
      });
      setAllPosts(sortedNewPosts);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const [content, setContent] = useState("");

  const commentPost = async (postId) => {
    const createdAt = Date.now();
    const comment = { userId: authUser._id, content, createdAt };
    try {
      setIsLoading(true);
      const { data: result } = await postApi.comment(postId, comment);
      const newPosts = allPosts.map((post) => {
        if (result.post._id === post._id) {
          return result.post;
        } else {
          return post;
        }
      });
      const sortedNewPosts = newPosts.sort((post1, post2) => {
        return new Date(post2.createdAt) - new Date(post1.createdAt);
      });
      setAllPosts(sortedNewPosts);
      setContent("");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const navigate = useNavigate();

  const deletePost = async (postId, isProfile) => {
    try {
      setIsLoading(true);
      const { data: result } = await postApi.delete(postId);
      const newPosts = allPosts.filter((post) => {
        return result.post._id !== post._id;
      });
      const sortedNewPosts = newPosts.sort((post1, post2) => {
        return new Date(post2.createdAt) - new Date(post1.createdAt);
      });
      setAllPosts(sortedNewPosts);
      showMessage("Success.", "Your post are deleted", "success");
      console.log(isProfile);
      if (isProfile) {
        navigate(`/home/profile/${authUser._id}`);
      } else {
        navigate("/home/timeline");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    setPosts,
    getPostsByUserId,
    createPost,
    likePost,
    commentPost,
    setTitle,
    setLanguage,
    setEditorValue,
    setDescription,
    setContent,
    deletePost,
    posts,
    isLoading,
    error,
    title,
    language,
    editorValue,
    description,
    content,
  };
};

export default usePost;
