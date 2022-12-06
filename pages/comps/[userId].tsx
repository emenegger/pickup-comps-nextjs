import { useRouter } from "next/router";
import { Box, Heading } from "@chakra-ui/react";

const userId = () => {
  const router = useRouter();

  const id = router.query.userId;

  return (
    <Box>
      <Heading size="xl">User ID: {id}</Heading>
    </Box>
  );
};

export default userId;
