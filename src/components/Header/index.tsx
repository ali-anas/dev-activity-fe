import { Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom'

const Header = () => {
  return (
  <Box display="flex" px="6" py="2" justifyContent="start" mx="0" width="100%" height="44px" backgroundColor="#fbfbfb" borderBottom="2px solid #f0f0f0" position="absolute" left={0} top={0}>
    <Link to="/"><img src='/dev-dynamics-logo.svg' alt="logo" height="30px" width="150px" /></Link>
  </Box>
  );
}

export default Header;