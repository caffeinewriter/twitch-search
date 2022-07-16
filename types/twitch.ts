import type { PaginationCursor } from './api';

export interface TwitchOauthResponse {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  scope?: string[];
  token_type: string;
}

export interface TwitchSearchArgs {
  query: string;
  live: boolean;
  pagination?: PaginationCursor;
}

export interface TwitchSearchResponse {
  results: TwitchSearchResults;
}

export interface TwitchSearchResults {
  data: TwitchSearchResult[];
  pagination: string;
}

export interface TwitchSearchResult {
  broadcaster_language: string;
  broadcaster_login: string;
  display_name?: string;
  game_id?: string;
  game_name?: string;
  id: string;
  is_live: boolean;
  tag_ids: string[];
  thumbnail_url?: string;
  title: string;
  started_at: string;
}
