import React from 'react';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/core/styles';

import Link, { StyledRouterLink } from './Link';

const Container = styled(Box)({
  margin: '0 20px',
});

const FooterText = styled(Typography)({
  margin: '0'
})

const Footer: React.SFC = () => {
  return (
    <Container>
      <FooterText variant='subtitle2'>
        SearchTwitch is not affiliated with Twitch.tv, and is just a project
        created by a fan, who wanted an alternative search interface. |{' '}
        <Link href='https://github.com/caffeinewriter/twitch-search'>Github</Link> |{' '}
        <StyledRouterLink to='/about'>About</StyledRouterLink>{' '}
      </FooterText>
      <FooterText variant='subtitle2'>
        If you like this site, please consider checking out{' '}
        <Link href='https://twitch.tv/caffeinewriter'>caffeinewriter on Twitch</Link>.
      </FooterText>
    </Container>
  );
};

export default Footer;
