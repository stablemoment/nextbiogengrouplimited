// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import generateSitemap from '../sitemap'; // Import the sitemap function

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await generateSitemap(req, res); // Await the result
    res.status(200).json(data);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).end(); // Respond with a 500 Internal Server Error
  }
}