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

import {
  Movie,
  SupervisorAccount
} from '@material-ui/icons';

import { TwitchChannel } from '../services/twitch';
import { track } from '../services/insights';

interface PreviewProps {
  channel: TwitchChannel;
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

const StreamPreview: React.FC<PreviewProps> = (props) => {
  const { channel } = props;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [timeoutId, setTimeoutId] = useState<number | undefined>();
  const [open, setOpen] = useState<boolean>(false);

  const useSmallChannelLogo = (logoUrl: string | undefined): string | undefined => {
    if (logoUrl && logoUrl.endsWith('300x300.png')) {
      return logoUrl.replace(/300x300\.png$/, '50x50.png');
    }
    return logoUrl;
  }

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    if (typeof timeoutId !== 'undefined')
      clearTimeout(timeoutId);
    setTimeoutId(undefined);
  };
  useEffect(() => {
    const delay = !open ? 1000 : 0;
    if (typeof timeoutId !== 'undefined')
      clearTimeout(timeoutId);
    setTimeoutId(setTimeout(() => {
      const isOpen = Boolean(anchorEl);
      setOpen(Boolean(anchorEl));
      if (isOpen) {
        track({
          id: 'stream-preview',
          parameters: {
            channel: channel.name,
            game: channel.game,
          },
        });
      }
    }, delay) as number);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anchorEl]);

  return (
    <StreamCard>
      <CardActionArea
        component='a'
        aria-label={`${channel.display_name}'s channel`}
        href={channel.url}
        target='_blank'
        rel='noopener'
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <CardHeader
          avatar={
            <Avatar
              alt={channel.display_name}
              src={useSmallChannelLogo(channel.logo)}
            />
          }
          title={
            <StreamTitle variant='caption'>
              {channel.display_name}
            </StreamTitle>
          }
        />
        <ResponsiveCardMedia
          image={channel.video_banner}
          title={channel.status}
        />
        <CardContent>
          <GameName variant='body2' display='block'>
            {channel.game}
          </GameName>
          <Typography variant='body2' display='block'>
            {channel.status}
          </Typography>
        </CardContent>
        <CardActions>
          <IconNumWrapper>
            <SupervisorAccount />
            <div>{channel.followers.toLocaleString()}</div>
          </IconNumWrapper>
          <IconNumWrapper>
            <Movie />
            <div>{channel.views.toLocaleString()}</div>
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
            url={channel.url}
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
