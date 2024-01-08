import Layout from "@/components/layout";
import { PROPERTIES, SEO_ALT_TXT } from "@/constant/constants";
import { firestore } from "@/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import Head from "next/head";
import Image from "next/image";

interface PropertyDetailProp {
    data: {
        propertyId?: string;
        coverPicture?: string;
        propertyName?: string;
        propertyType?: string;
        description?: string;
        bedroom?: string;
        bathroom?: string;
        discount?: string;
        features?: string[];
        price?: string;
        promo?: boolean;
        size?: string;
        subImages?: string[];
        location?: {
            address: string;
            city: string;
            coordinates: string;
            state: string;
        };
    }
}

const PropertyDetail: React.FC<PropertyDetailProp> = ({ data }) => {

    // Check if data is defined and has the expected structure
    if (!data || !data.propertyId) {
        // Handle the case where data is undefined or missing propertyId
        return <div>Error: Property data is missing or invalid.</div>;
    }

    const {
        propertyId,
        propertyName,
        propertyType,
        description,
        bedroom,
        bathroom,
        discount,
        promo,
        price,
        coverPicture,
        subImages,
        features,
        size,
    } = data;
    
    const {
        address,
        city,
        coordinates,
        state
    }: { address: string; city: string; coordinates: string; state: string } = data.location || {
        address: '',
        city: '',
        coordinates: '',
        state: ''
    };
    
    const canonicalUrl = `https://next.biogengroupltd.com/${propertyId ?? ''}`;

    return (
        <Layout>
          <Head>
            <title>{`${propertyName} - ${propertyType}`}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonicalUrl} />
            <meta
              property="og:title"
              content={`${propertyName} - ${propertyType}`}
            />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={coverPicture} />
            </Head>
            
            <Image
                src={coverPicture || ''}
                alt={`${propertyName} ${propertyType} ${SEO_ALT_TXT}`}
                width={100}
                height={100}
            />
            <div style={{ display: "flex", gap: "10px" }}>
            <Image
                src={subImages && subImages[0] ? subImages[0] : ''}
                alt={`${propertyName} ${propertyType} ${SEO_ALT_TXT}`}
                width={100}
                height={100}
            />
            <Image
                src={subImages && subImages[1] ? subImages[1] : ''}
                alt={`${propertyName} ${propertyType} ${SEO_ALT_TXT}`}
                width={100}
                height={100}
            />
            <Image
                src={subImages && subImages[2] ? subImages[2] : ''}
                alt={`${propertyName} ${propertyType} ${SEO_ALT_TXT}`}
                width={100}
                height={100}
            />
                
            </div>
            <h1>{propertyName}</h1>
            <p>{propertyType}</p>
            <p>{description}</p>
            <p>{bedroom}</p>
            <p>{bathroom}</p>
            <p>{size}</p>
            <p>{discount}</p>
            {promo ? <p>This is a promo</p> : <p>This is Not a promo</p>}
            <p>{price}</p>
            <p>{features}</p>

            <p>{address}</p>
            <p>{city}</p>
            <p>{coordinates}</p>
            <p>{state}</p>
        </Layout>
    );
}

export default PropertyDetail;

export async function getServerSideProps({ params }: { params: { propertyId: string } }) {
    try {
        const propertyId = params.propertyId;

        // Fetch data based on propertyId using the fetchData function
        const data = await fetchData(propertyId);

        if (data) {
            return {
                props: {
                    data: {
                        ...data,
                        timestamp: data.timestamp.toDate().toISOString(), // Converted to a JSON-serializable format
                    },
                },
            };
        } else {
            // Handle the case where data is null
            return {
                notFound: true,
            };
        }
    } catch (error) {
        console.error("Error fetching property data:", error);
        // Handle error (e.g., display an error message to the user)
        return {
            notFound: true,
        };
    }
}


const fetchData = async (propertyId: string) => {
    try {
        // Assuming firestore and PROPERTIES are defined
        const propertiesCollection = collection(firestore, PROPERTIES);
        const querySnapshot = await getDocs(
            query(propertiesCollection, where("propertyId", "==", propertyId))
        );

        const properties = querySnapshot.docs.map((doc) => doc.data());
        return properties[0]; // Assuming there's only one property with the given propertyId
    } catch (error) {
        console.error("Error fetching property data:", error);
        // Handle error (e.g., display an error message to the user)
        return null; // Return null or handle error accordingly
    }
};