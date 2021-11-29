import Redis from 'ioredis';

import { TwitchOauthResponse } from '../types/twitch';

const twitchOauthUrl = `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`;
const twitchApiBase = 'https://api.twitch.tv/helix';
const redis = new Redis(process.env.REDIS_URL);

export async function getTwitchToken(): Promise<string> {
  const token = await redis.get('twitch_token');
  if (!token) {
    const data: TwitchOauthResponse = await fetch(twitchOauthUrl, {
      method: 'POST',
    }).then((res) => res.json());
    console.log('DATA', data);
    await redis.set(
      'twitch_token',
      data.access_token,
      'EX',
      data.expires_in - 60
    );
    return data.access_token;
  }
  return token;
}

export async function searchChannels(
  query: string,
  live: boolean
): Promise<any> {
  const token = await getTwitchToken();
  const reqHeaders = new Headers();
  reqHeaders.set('Authorization', `Bearer ${token}`);
  reqHeaders.set('Client-Id', process.env.TWITCH_CLIENT_ID ?? '');
  const data = await fetch(
    `${twitchApiBase}/search/channels?query=${query}&live_only=${live}`,
    {
      headers: reqHeaders,
    }
  ).then((res) => res.json());
  return data;
}
