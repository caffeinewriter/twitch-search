import React from 'react';

import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';



const Footer: React.SFC = () => {
  return (
    <Box>
      <Typography variant='caption'>
        SearchTwitch is not affiliated with Twitch.tv, and is just a project
        created by a fan, who wanted an alternative search interface. |{' '}
        <Link href='https://github.com/caffeinewriter/twitch-search'>Github</Link> |{' '}
      </Typography>
      <Typography variant='caption'>
        If you like this site, please consider checking out{' '}
        <Link href='https://twitch.tv/caffeinewriter'>caffeinewriter on Twitch</Link>.
      </Typography>
    </Box>
  );
};

export default Footer;
