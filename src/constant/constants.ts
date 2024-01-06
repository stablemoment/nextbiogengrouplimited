import { firestore } from "../firebaseConfig";
import {
  collection,
  getDocs,
  orderBy,
  query,
  DocumentData,
  QuerySnapshot,
} from "firebase/firestore";

// Constants
export const MY_WEB_URL = `https://www.biogengroupltd.com/`;
export const MY_EMAIL_ADDRESS = `info@biogengroupltd.com`;
export const DEV_EMAIL_ADDRESS = `stablemomentltd@gmail.com`;
export const GOOGLE_MAPS_LINK = `https://www.google.com/maps?q=`;

// Contact Function
export const DEVELOPER_CONTACT = () => {
  const mailtoLink = `mailto:${DEV_EMAIL_ADDRESS}?subject=${encodeURIComponent(
    `Website inquiry`
  )}`;

  window.location.href = mailtoLink;
};

export const APP_TITLE = `Biogen Group Limited - Affordable Houses Abuja, Nigeria`;
export const APP_DESCRIPTION = `Explore Affordable Houses in Abuja, Nigeria with Biogen Group Limited - Your Gateway to Affordable Houses in Abuja, Nigeria. Explore a diverse portfolio of real estate, from budget-friendly homes to luxurious residences. Find your dream home in the heart of Abuja with Biogen Group Ltd. Discover quality living tailored to your needs. Unlock the possibilities of exceptional living in Nigeria's capital city.`;
export const APP_KEYWORDS = `Affordable Houses Abuja Nigeria, Real Estate Abuja Nigeria, Budget-Friendly Homes Abuja Nigeria, Luxurious Residences Abuja Nigeria, Property Investments Abuja Nigeria, Premium Housing Abuja Nigeria, Residential Developments Abuja Nigeria, Commercial Spaces Abuja Nigeria, Abuja Nigeria Real Estate Excellence, Exclusive Listings Abuja Nigeria, luxury real estate Abuja Nigeria, homes for sale Abuja Nigeria, investment properties Abuja Nigeria, commercial real estate Abuja Nigeria, real estate excellence Abuja Nigeria, commercial spaces for sale Abuja Nigeria, Biogen, Biogen Group, Biogen Group Ltd, Biogen Group Limited, Biogen Homes, Biogen Houses, Biogen Nigeria, Biogen Abuja, biogegrouplimited, Favour Ekene Onyej`;

export const PROPERTIES = `properties`;
export const PROPERTY_LISTING = `services`;
export const TEAM_MEMBERS = `teamMembers`;
export const FAQ = `faq`;
export const APPLICATION = `application`;
export const APPLICATION_DB_ID = `UggQXAOB7Jr5RVGAUFqR`;

export const BIOGEN_OFFICE_ADDRESS = "Biogen Group Limited, Meles Zenawi, Asokoro, Abuja 900231, Federal Capital Territory";

export const SEO_ALT_TXT = `Luxurious and affordable real estate in Abuja Nigeria - Biogen Group Ltd Properties`;

export const CONTACT_LIST = ["📍 Block 8 Flat 3 Meles Senawi Street, OAU Quarters Gate 2, Off Maitama Sule Street, Asokoro, Abuja.", "🕻 +234 803 715 2019", "🕻 +234 805 555 4528", "✉️ info@biogengroupltd.com", "✉️ favourekeneonyej@biogengroupltd.com", "✉️ biogengroupltd@gmail.com"];
export const NAVIGATION_LIST = ["Home", "Properties", "Services", "Contact Us"];
export const OUR_LINKS = ["FAQ", "About Us", "Privacy Policy", "Terms And Conditions"];

// Utility Functions
export const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

export const INQUIRE = (
  propertyName: string,
  propertyType: string,
  coordinates: string,
  propertyLink: string
) => {
  const formattedBody = `
    First name: \n\n
    Last name: \n\n
    Email: \n\n
    Property name: ${propertyName}\n\n
    Property type: ${propertyType}\n\n
    Coordinates: ${coordinates}\n\n
    Property link: ${propertyLink}\n\n\n
    Dear Biogen Group Limited,\n\n
    Inquiry message: 
  `;

  const mailtoLink = `mailto:${MY_EMAIL_ADDRESS}?subject=${encodeURIComponent(
    `Property inquiry`
  )}&body=${encodeURIComponent(formattedBody)}`;

  window.location.href = mailtoLink;
};

export const shouldFetchData = (dataList: unknown[]) => dataList.length === 0;

export const debounce = <T extends unknown[]>(
  func: (...args: T) => void,
  delay: number
) => {
  let timeout: NodeJS.Timeout;
  return (...args: T) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

// Data Fetch Functions
type DataFetchFunction = (
  collectionPath: string[],
  setData: (data: DocumentData[]) => void,
  shouldFetch: boolean,
  setLoading: (loading: boolean) => void
) => Promise<void>;

export const fetchData: DataFetchFunction = async (
  collectionPath,
  setData,
  shouldFetch,
  setLoading
) => {
  if (shouldFetch) {
    try {
      setLoading(true);
      const dataCollection = collection(firestore, ...(collectionPath as [string, string]));
      const q = query(dataCollection, orderBy("timestamp", "asc"));
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);

      const data: DocumentData[] = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });

      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error (e.g., set an error state)
    } finally {
      setLoading(false); // Set loading to false regardless of success or error
    }
  }
};

type DataFetchFunctionPlus = (
  collectionPath: string[],
  setData: (data: DocumentData[]) => void,
  shouldFetch: boolean,
  setLoading: (loading: boolean) => void
) => Promise<DocumentData[]>;

export const fetchDataWithNoOrder: DataFetchFunctionPlus = async (
  collectionPath,
  setData,
  shouldFetch,
  setLoading
): Promise<DocumentData[]> => {
  let data: DocumentData[] = [];

  if (shouldFetch) {
    try {
      setLoading(true);
      const dataCollection = collection(firestore, ...(collectionPath as [string, string]));
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(dataCollection);

      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });

      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error (e.g., set an error state)
    } finally {
      setLoading(false); // Set loading to false regardless of success or error
    }
  }

  return data;
};
