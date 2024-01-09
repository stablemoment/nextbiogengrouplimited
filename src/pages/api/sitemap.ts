// pages/api/sitemap.ts
import { NextApiRequest, NextApiResponse } from 'next';
import generateSitemap from '../sitemap'; // Import the sitemap function

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    await generateSitemap(req, res);
}
