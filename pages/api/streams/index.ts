import type { NextApiRequest, NextApiResponse } from 'next';
import { getStreams } from '../../../helpers/twitch';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const results = await getStreams(req.query.user_ids);
  res.status(200).json(results);
}
