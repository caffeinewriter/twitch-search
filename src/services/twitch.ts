import axios from 'axios';
import qs from 'querystring';
import { RESULTS_PER_PAGE } from '../constants';

const CLIENT_ID = 'kwt26b303n4vzix9ipdwytco8kqfa0q';

export interface TwitchChannel {
  _id: number;
  broadcaster_language: string;
  broadcaster_software: string;
  broadcaster_type: string;
  created_at: Date;
  description: string;
  display_name: string;
  followers: number;
  game: string;
  language: string;
  logo?: string;
  mature: boolean;
  name: string;
  partner: boolean;
  private_video: boolean;
  privacy_options_enabled: boolean;
  profile_banner?: string;
  profile_banner_background_color?: string;
  status: string;
  updated_at: Date;
  url: string;
  video_banner?: string;
  views: number;
}

export interface TwitchStream {
  _id: number;
  average_fps: number;
  channel: TwitchChannel;
  created_at: Date;
  delay: number;
  game: string;
  is_playlist: boolean;
  preview: {
    large: string;
    medium: string;
    small: string;
    template: string;
  };
  video_height: number;
  viewers: number;
}

interface StreamSearchResult {
  _total: number;
  streams: TwitchStream[];
}

interface ChannelSearchResult {
  _total: number;
  channels: TwitchChannel[];
}

const twitchClient = axios.create({
  baseURL: 'https://api.twitch.tv/kraken/',
  timeout: 5000,
  headers: {
    Accept: 'application/vnd.twitchtv.v5+json',
    'Client-ID': CLIENT_ID,
  },
});

export const searchStreams = async (
  query: string,
  offset: number = 0
): Promise<StreamSearchResult> => {
  offset *= RESULTS_PER_PAGE;
  const res = await twitchClient.get(
    `search/streams?${qs.stringify({
      query,
      offset,
      limit: RESULTS_PER_PAGE,
    })}`
  );
  return res.data;
};

export const searchChannels = async (
  query: string,
  offset: number = 0
): Promise<ChannelSearchResult> => {
  offset *= RESULTS_PER_PAGE;
  const res = await twitchClient.get(
    `search/channels?${qs.stringify({
      query,
      offset,
      limit: RESULTS_PER_PAGE,
    })}`
  );
  return res.data;
};

export default twitchClient;
