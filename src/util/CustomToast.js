import { Box } from "@chakra-ui/react";

const CustomToast = ({ title, description, status }) => {
  return (
    <Box
      color="white"
      p={3}
      bg={status === "success" ? "green.500" : "red.500"}
      borderRadius="md"
    >
      <Box fontWeight="bold">{title}</Box>
      <Box>{description}</Box>
    </Box>
  );
};

export default CustomToast;
