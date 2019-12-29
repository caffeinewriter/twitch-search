import React from 'react';

import Box from '@material-ui/core/Box';
import { styled } from '@material-ui/core/styles';

const Logo = styled(Box)({
  height: '64px',
  width: '100%',
  fontFamily: '"Titan One", sans-serif',
});

const Header: React.SFC = () => {
  return (
    <Box>
      <Logo>SearchTwitch</Logo>
    </Box>
  );
};

export default Header;
