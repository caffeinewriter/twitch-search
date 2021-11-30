import Redis from 'ioredis';
import logger from './logger';

import { TwitchOauthResponse, TwitchSearchResults } from '../types/twitch';
import { PaginationCursor } from '../types/api';

// Constants
const TWITCH_OAUTH_URL = `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`;
const TWITCH_API_BASE = 'https://api.twitch.tv/helix';

const redis = new Redis(process.env.REDIS_URL);

export async function getAuthHeaders(): Promise<Headers> {
  const token = await getTwitchToken();
  const reqHeaders = new Headers();
  reqHeaders.set('Authorization', `Bearer ${token}`);
  reqHeaders.set('Client-Id', process.env.TWITCH_CLIENT_ID ?? '');
  return reqHeaders;
}

export async function makeTwitchApiRequest<T>(
  url: string,
  isRetry: boolean = false
): Promise<T> {
  logger.debug('Attempting to request Twitch URL:', url);
  const headers = await getAuthHeaders();
  const res = await fetch(url, {
    headers,
  });
  if (res.status === 401 && !isRetry) {
    logger.debug('Twitch token is invalid. Deleting potentially stale token.');
    await redis.del('twitch_token');
    return makeTwitchApiRequest(url, true);
  }
  return await res.json();
}

export async function getTwitchToken(): Promise<string> {
  const token = await redis.get('twitch_token');
  if (!token) {
    logger.debug('Attempting to fetch fresh Twitch token');
    const data: TwitchOauthResponse = await fetch(TWITCH_OAUTH_URL, {
      method: 'POST',
    }).then((res) => res.json());
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
  live: boolean,
  pagination?: PaginationCursor
): Promise<TwitchSearchResults> {
  let searchLogMessage = `Searching for ${query} among ${
    live ? 'live' : 'all'
  } channels`;
  let url = `${TWITCH_API_BASE}/search/channels?query=${query}&live_only=${live}`;
  if (pagination && 'after' in pagination) {
    url += `&after=${pagination.after}`;
    searchLogMessage += ` after cursor ${pagination.after}`;
  } else if (pagination && 'before' in pagination) {
    url += `&before=${pagination.before}`;
    searchLogMessage += ` before cursor ${pagination.before}`;
  }
  logger.debug(searchLogMessage);
  return makeTwitchApiRequest<TwitchSearchResults>(url);
}
