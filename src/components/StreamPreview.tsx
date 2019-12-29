import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import { styled } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { Movie, SupervisorAccount, Visibility } from '@material-ui/icons';

import { TwitchStream } from '../services/twitch';

interface PreviewProps {
  stream: TwitchStream;
}

const ResponsiveCardMedia = styled(CardMedia)({
  height: 0,
  paddingBottom: '56.25%',
});

const StreamTitle = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '.9rem',
});

const StreamCard = styled(Card)({
  // minHeight: '100%',
});

const IconNumWrapper = styled(Box)({
  textAlign: 'center',
  flex: '1',
});

const StreamPreview: React.SFC<PreviewProps> = (props) => {
  const { stream } = props;
  return (
    <StreamCard>
      <CardActionArea
        component='a'
        href={stream.channel.url}
        target='_blank'
        rel='noopener'
      >
        <CardHeader
          avatar={
            <Avatar
              alt={stream.channel.display_name}
              src={stream.channel.logo}
            />
          }
          title={
            <StreamTitle variant='caption'>
              {stream.channel.display_name}
            </StreamTitle>
          }
        ></CardHeader>
        <ResponsiveCardMedia
          image={stream.preview.large}
          title={stream.channel.status}
        />
        <CardContent>
          <Typography variant='body2' component='p'>
            {stream.channel.status}
          </Typography>
        </CardContent>
        <CardActions>
          <IconNumWrapper>
            <Visibility />
            <div>{stream.viewers.toLocaleString()}</div>
          </IconNumWrapper>
          <IconNumWrapper>
            <SupervisorAccount />
            <div>{stream.channel.followers.toLocaleString()}</div>
          </IconNumWrapper>
          <IconNumWrapper>
            <Movie />
            <div>{stream.channel.views.toLocaleString()}</div>
          </IconNumWrapper>
        </CardActions>
      </CardActionArea>
    </StreamCard>
  );
};

export default StreamPreview;
