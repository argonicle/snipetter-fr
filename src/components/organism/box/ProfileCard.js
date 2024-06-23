import React, { useEffect, useState } from "react";
import { Avatar, Button, Flex, Text } from "@chakra-ui/react";
import { ImFilePicture } from "react-icons/im";
import { StarIcon, EditIcon } from "@chakra-ui/icons";
import styled from "styled-components";

import useUser from "../../../hooks/useUser";
import useAuthUser from "../../../hooks/useAuthUser";
import { Link, useParams } from "react-router-dom";
import LoadingCircle from "../../atom/LoadingCircle";

const ProfileCard = ({ isEdit }) => {
  const { authUser } = useAuthUser();
  const { userId } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);
  const { getUser, user, editProfile, follow } = useUser();

  useEffect(() => {
    fetchUser();
  }, [authUser]);

  useEffect(() => {
    if (user) {
      const isFollowing = user.followers.includes(authUser._id);
      setIsFollowing(isFollowing);
    }
  }, [user]);

  const fetchUser = async () => {
    await getUser(userId ?? authUser._id);
  };

  return (
    <ProfileCardContainer>
      {authUser._id === userId && (
        <Link to="/home" state="edit">
          <SEditIcon />
        </Link>
      )}
      <Flex alignItems="center" m="0 auto" pl={isEdit && "3"}>
        {!user ? (
          <LoadingCircle />
        ) : isEdit ? (
          <SLabel htmlFor="file">
            <EditAvatar
              h="100px"
              w="100px"
              src={process.env.REACT_APP_BACKEND_ORIGIN + user.profileImage}
            >
              <SImFilePicture />
              <input
                id="file"
                type="file"
                accept=".png, .jpeg, .jpg"
                style={{ display: "none" }}
                onChange={(e) => editProfile(e)}
              />
            </EditAvatar>
          </SLabel>
        ) : (
          <Flex flexDirection="column" mr="10%" alignItems="center">
            <Avatar
              h="80px"
              w="80px"
              src={process.env.REACT_APP_BACKEND_ORIGIN + user.profileImage}
            />
            <Flex mt="5%" gap="0 10px" flexWrap="wrap" justifyContent="center">
              <Text
                fontSize="0.8em"
                m="0"
                textDecoration="underline"
                _hover={{ cursor: "pointer", opacity: "0.5" }}
              >
                {user.followings.length} Followings
              </Text>
              <Text
                fontSize="0.8em"
                m="0"
                textDecoration="underline"
                _hover={{ cursor: "pointer", opacity: "0.5" }}
              >
                {user.followers.length} Followers
              </Text>
            </Flex>
            {authUser._id !== userId && (
              <Button
                onClick={() => follow(userId)}
                leftIcon={<StarIcon />}
                colorScheme={isFollowing ? "pink" : "gray"}
                h="20px"
                fontSize="10px"
                mt="5%"
              >
                Follow
              </Button>
            )}
          </Flex>
        )}
        <Info>
          <InfoItem>
            username : <InfoContent>{user?.username}</InfoContent>
          </InfoItem>
          <InfoItem>
            bio : <InfoContent>{user?.info.bio}</InfoContent>
          </InfoItem>
          <InfoItem>
            languages : <InfoContent>{user?.info.languages}</InfoContent>
          </InfoItem>
          <InfoItem>
            comment : <InfoContent>{user?.info.comment}</InfoContent>
          </InfoItem>
        </Info>
      </Flex>
    </ProfileCardContainer>
  );
};

export default ProfileCard;

const ProfileCardContainer = styled.div`
  width: 90%;
  max-width: 500px;
  background-color: white;
  box-shadow: 13px 5px 27px -3px #777777;
  border-radius: 10px;
  margin: 0 auto 5%;
  padding: 5% 5%;
  position: relative;
`;
const SEditIcon = styled(EditIcon)`
  position: absolute;
  right: 8%;
  font-size: 1.4em;
`;
const Info = styled.ul``;
const InfoItem = styled.li`
  font-size: 15px;
`;
const InfoContent = styled.span`
  font-size: 0.8em;
`;
const SLabel = styled.label`
  margin-right: 10%;
  border-radius: 50%;
`;
const EditAvatar = styled(Avatar)`
  &::before {
    content: "";
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    border-radius: 50%;
    height: 100%;
    width: 100%;
    cursor: pointer;
  }
`;
const SImFilePicture = styled(ImFilePicture)`
  position: absolute;
  z-index: 2;
  font-size: 1.5em;
  &:hover {
    cursor: pointer;
  }
`;
