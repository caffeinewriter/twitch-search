import React from 'react';

import Box from '@material-ui/core/Box';
import Link from '../components/Link';
import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/core';

const Container = styled(Box)({
  margin: '50px',
  maxWidth: '960px',
  minHeight: '100%',
});

const Header = styled(Typography)({
  fontFamily: '"Titan One", sans-serif',
  fontSize: '50px',
});

const About: React.FC = () => {
  return (
    <Container>
      <Header>About</Header>
      <Typography variant="subtitle1">
        SearchTwitch is a project that was created by{' '}
        <Link href='https://brandonanzaldi.com'>
          Brandon Anzaldi
        </Link>{' '}
        , aka{' '}
        <Link href='https://twitch.tv/caffeinewriter'>
          caffeinewriter
        </Link>{' '}
        who simply wanted an alternative search interface for Twitch. If you're {' '}
        interested in contributing to making this site better, you can check the{' '}
        <Link href='https://github.com/caffeinewriter/twitch-search'>
          Github Repsoitory
        </Link>{' '}
        for more information on how to contribute to this site! Thanks for checking{' '}
        this page out!
      </Typography>
    </Container>
  )
}

export default About;