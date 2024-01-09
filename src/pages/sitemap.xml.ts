// pages/sitemap.xml.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '@/firebaseConfig';

async function fetchDynamicRoutes() {
  const appCollection = collection(firestore, 'properties');
  const querySnapshot = await getDocs(appCollection);

  if (!querySnapshot.empty) {
    return querySnapshot.docs.map((doc) => ({
      propertyId: doc.id,
    }));
  } else {
    return [];
  }
}

function generateSiteMap(data: { propertyId: string }[], req: NextApiRequest) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${data
        .map(({ propertyId }) => {
          return `
            <url>
                <loc>${`https://${req.headers.host}/properties/${propertyId}`}</loc>
            </url>
          `;
        })
        .join('')}
    </urlset>`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Fetch dynamic data for the sitemap
  const dynamicData = await fetchDynamicRoutes();

  // Generate the XML sitemap with the fetched data
  const sitemap = generateSiteMap(dynamicData, req);

  // Set the Content-Type header to 'text/xml'
  res.setHeader('Content-Type', 'text/xml');

  // Send the XML sitemap to the browser
  res.write(sitemap);
  res.end();
}
