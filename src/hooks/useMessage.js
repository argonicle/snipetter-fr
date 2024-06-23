import { useToast } from "@chakra-ui/react";

const useMessage = () => {
  const toast = useToast();

  const showMessage = (title, description, status) => {
    toast({
      title,
      description,
      status,
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  return { showMessage };
};

export default useMessage;
