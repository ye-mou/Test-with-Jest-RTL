import { Box, Heading } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box p={4} bg="teal.500" color="white">
      <Heading as="h1" size="xl">
        Welcome to my word definitions
      </Heading>
    </Box>
  );
};

export default Header;
