import type { NextApiRequest, NextApiResponse } from 'next'
import { searchChannels } from '../../helpers/twitch';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const results = await searchChannels('valheim', true);
  res.status(200).json({ results })
}
