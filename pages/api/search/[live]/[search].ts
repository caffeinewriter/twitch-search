import type { NextApiRequest, NextApiResponse } from 'next';
import { searchChannels } from '../../../../helpers/twitch';
import { PaginationCursor } from '../../../../types/api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let live: boolean;
  if (req.query.live === 'live') {
    live = true;
  } else if (req.query.live === 'all') {
    live = false;
  } else {
    return res.status(400).json({});
  }
  let search;
  if (typeof req.query.search !== 'string') {
    search = req.query.search.join(' ');
  } else {
    search = req.query.search;
  }
  let pagination: PaginationCursor | undefined;
  if (req.query.after) {
    const after =
      typeof req.query.after === 'string'
        ? req.query.after
        : req.query.after.join('');
    pagination = {
      after,
    };
  }
  if (req.query.before) {
    const before =
      typeof req.query.before === 'string'
        ? req.query.before
        : req.query.before.join('');
    pagination = {
      before,
    };
  }
  const results = await searchChannels(search, live, pagination);
  res.status(200).json(results);
}
