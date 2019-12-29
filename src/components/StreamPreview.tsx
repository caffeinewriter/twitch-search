import React, { useEffect, useState } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/core/styles';

import ReactPlayer from 'react-player';

import { Movie, SupervisorAccount, Visibility } from '@material-ui/icons';

import { TwitchStream } from '../services/twitch';

interface PreviewProps {
  stream: TwitchStream;
}

const ResponsiveCardMedia = styled(CardMedia)({
  height: 0,
  paddingBottom: '56.25%',
});

const GameName = styled(Typography)({
  fontWeight: 'bold',
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

const TwitchPopover = styled(Popover)({
  pointerEvents: 'none',
});

const StreamWrapper = styled(Box)({
  width: '450px',
  height: '250px',
  overflow: 'hidden',
});

const StreamPreview: React.SFC<PreviewProps> = (props) => {
  const { stream } = props;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [timeoutId, setTimeoutId] = useState<number | undefined>();
  const [open, setOpen] = useState<boolean>(false);

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    clearTimeout(timeoutId);
    setTimeoutId(undefined);
  };
  useEffect(() => {
    const delay = !open ? 1000 : 0;
    clearTimeout(timeoutId);
    setTimeoutId(setTimeout(() => setOpen(Boolean(anchorEl)), delay));
  }, [anchorEl]);

  return (
    <StreamCard>
      <CardActionArea
        component='a'
        href={stream.channel.url}
        target='_blank'
        rel='noopener'
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
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
          <GameName variant='body2' component='p'>
            {stream.channel.game}
          </GameName>
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
      <TwitchPopover
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <StreamWrapper>
          <ReactPlayer
            url={stream.channel.url}
            playing
            controls={false}
            volume={0}
            width='100%'
            height='100%'
          />
        </StreamWrapper>
      </TwitchPopover>
    </StreamCard>
  );
};

export default StreamPreview;
