import type { TwitchSearchArgs, TwitchSearchResults } from '../types/twitch';

export const searchChannels = async ({ query, live, pagination }: TwitchSearchArgs): Promise<TwitchSearchResults> => {
  let apiUrl = `${process.env.NEXT_PUBLIC_API_BASE}/api/search/${live ? 'live' : 'all'}/${query}`;
  if (pagination && 'after' in pagination) {
    apiUrl += `&after=${pagination.after}`;
  } else if (pagination && pagination.before) {
    apiUrl += `&before=${pagination.before}`;
  }
  return await fetch(apiUrl).then(res => res.json());
}