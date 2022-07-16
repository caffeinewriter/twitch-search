import * as React from 'react';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { TwitchSearchResult } from '../types/twitch';

function getStreamThumbnail(user_login: string, width: number = 720, height: number = 405) {
  return `https://static-cdn.jtvnw.net/previews-ttv/live_user_${user_login}-${width}x${height}.jpg`
}

const SearchCard: React.FC<{
  data: TwitchSearchResult;
}> = ({
  data
}) => {
  return (
    <Grid item xs={12} md={6} lg={4} xl={3}>
      <Card>
        <img src={getStreamThumbnail(data.broadcaster_login)} style={{
          width: '100%',
        }} />
        <Typography variant="h6">{data.display_name}</Typography>
        <span>{data.game_name}</span>
      </Card>
    </Grid>
  );
}

export default SearchCard;