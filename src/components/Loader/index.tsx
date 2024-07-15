import { Spinner, Box } from '@chakra-ui/react';

const Loader = () => (
  <Box display="flex" width="100%" height="100vh" justifyContent="center" alignItems="center">
    <Spinner
      thickness='4px'
      speed='0.65s'
      emptyColor='gray.200'
      color='blue.500'
      size='xl'
    />
  </Box>
)

export default Loader;