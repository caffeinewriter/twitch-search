import React from 'react';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const Footer: React.SFC = () => {
  return (
    <Box>
      <Typography variant='caption'>
        SearchTwitch is not affiliated with Twitch.tv, and is just a project
        created by a fan, who wanted an alternative search interface. |{' '}
        <a href='https://github.com/caffeinewriter/twitch-search'>Github</a>
      </Typography>
    </Box>
  );
};

export default Footer;
