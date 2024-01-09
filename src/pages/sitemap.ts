// sitemap.ts
import { firestore } from '@/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';

export const revalidate = 30; //update after every 30 seconds

export default async function generateSitemap(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
        // Your sitemap generation logic here...
        const appCollection = collection(firestore, 'properties');
        const querySnapshot = await getDocs(appCollection);
      
        const documents = querySnapshot.docs.map((doc) => ({
          propertyId: doc.id,
        }));
      
        // Example: Generate a sitemap XML string
        const sitemapXML = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${documents.map(doc => `
                <url>
                    <loc>https://${req.headers.host}/properties/${doc.propertyId}</loc>
                    <lastmod>${new Date().toISOString()}</lastmod>
                    <changefreq>daily</changefreq>
                    <priority>0.7</priority>
                </url>`).join('\n')}
            <!-- Add more URLs as needed -->
        </urlset>`;

        // Set the Content-Type header to 'text/xml'
        res.setHeader('Content-Type', 'text/xml');

        // Send the XML sitemap to the browser
        res.status(200).send(sitemapXML);
    } catch (error) {
        console.error('Error generating sitemap:', error);
        res.status(500).end(); // Respond with a 500 Internal Server Error
    }
}
