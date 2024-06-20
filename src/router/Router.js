import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Top from "../components/page/Top";
import LoginBox from "../components/organism/box/LoginBox";
import SignupBox from "../components/organism/box/SignupBox";
import Timeline from "../components/page/Timeline";
import Setup from "../components/page/Setup";
import Home from "../components/page/Home";
import Post from "../components/page/Post";
import Profile from "../components/page/Profile";
import Comment from "../components/page/Comment";

const Router = () => {
  return (
    <BrowserRouter basename={process.env.REACT_APP_REPO_PATH || "/"}>
      <Routes>
        <Route path="/" element={<Top />}>
          <Route index element={<LoginBox />} />
          <Route path="signup" element={<SignupBox />} />
        </Route>
        <Route path="/home" element={<Home />}>
          <Route index element={<Setup />} />
          <Route path="timeline" element={<Timeline />}>
            <Route path=":postId" element={<Comment />} />
          </Route>
          <Route path="post" element={<Post />} />
          <Route path="profile/:userId" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
