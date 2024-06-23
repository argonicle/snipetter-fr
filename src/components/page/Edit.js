import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";

import ProfileCard from "../organism/box/ProfileCard";
import BoxLayout from "../organism/layout/BoxLayout";
import useUser from "../../hooks/useUser";
import useAuthUser from "../../hooks/useAuthUser";

const Edit = () => {
  const { authUser } = useAuthUser();
  const {
    editProfile,
    setUsername,
    setBio,
    setLanguages,
    setComment,
    username,
    bio,
    languages,
    comment,
  } = useUser();

  const { state: edit } = useLocation();

  return (
    <>
      <SetupContainer>
        <SetupWrapper>
          {edit ? (
            <Text fontSize="1.5rem" textAlign="center" mb="5%" color="white">
              Edit your profile
            </Text>
          ) : (
            <Text fontSize="1.5rem" textAlign="center" mb="5%" color="white">
              Let's start with creating your profile !
            </Text>
          )}
          <ProfileCard isEdit />
          <ProfileEditBox>
            <FormControl w="80%" m="0 auto 5%" display="block">
              <FormLabel m="0">username</FormLabel>
              <ProfileEditInput
                m="0"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                focusBorderColor="gray.400"
                placeholder="Write your name"
              />
            </FormControl>
            <FormControl w="80%" m="0 auto 5%" display="block">
              <FormLabel m="0">bio</FormLabel>
              <ProfileEditInput
                m="0"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                focusBorderColor="gray.400"
                placeholder="Write your bio"
              />
            </FormControl>
            <FormControl w="80%" m="0 auto 5%" display="block">
              <FormLabel m="0">languages</FormLabel>
              <ProfileEditInput
                m="0"
                value={languages}
                onChange={(e) => setLanguages(e.target.value)}
                focusBorderColor="gray.400"
                placeholder="Write your languages"
              />
            </FormControl>
            <FormControl w="80%" m="0 auto 5%" display="block">
              <FormLabel m="0">comment</FormLabel>
              <ProfileEditInput
                m="0"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                focusBorderColor="gray.400"
                placeholder="Write your comment"
              />
            </FormControl>
          </ProfileEditBox>
          <Flex alignItems="center" justifyContent="center" mt="5%" gap="10%">
            <Button onClick={editProfile}>Edit</Button>
            <Link
              to={edit ? `/home/profile/${authUser._id}` : "/home/timeline"}
            >
              {edit ? <Button>Back</Button> : <Button>Start</Button>}
            </Link>
          </Flex>
        </SetupWrapper>
      </SetupContainer>
    </>
  );
};

export default Edit;

const SetupContainer = styled.div``;

const SetupWrapper = styled.div`
  padding: 5% 0;
`;

const ProfileEditBox = styled(BoxLayout)`
  text-align: center;
`;
const ProfileEditInput = styled(Input)`
  margin: 2% 0;
`;
