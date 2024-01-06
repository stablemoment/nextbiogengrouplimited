import { getDocs, collection } from 'firebase/firestore';
import { firestore } from '@/firebaseConfig';
import Head from 'next/head';
import Layout from '@/components/layout';

interface AboutProps {
  data: {
    aboutUs?: string;
  };
}

const About: React.FC<AboutProps> = ({ data }) => {

  const title = 'About Our Company';
  const aboutUsTxt = data.aboutUs || '';

  return (
    <>
      <Layout>
        <Head>
          <title>About Us</title>
        </Head>
          
        <div>
          <h1>{title}</h1>
          <p>{aboutUsTxt}</p>
        </div>
      </Layout>
    </>
  );
};

export async function getServerSideProps() {
  try {
    const appCollection = collection(firestore, 'application');
    const querySnapshot = await getDocs(appCollection);

    if (!querySnapshot.empty) {
      const data = querySnapshot.docs[0].data();

      return {
        props: {
          data,
        },
      };
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  // If there's an error or no data, return an empty object
  return {
    props: {
      data: {},
    },
  };
}

export default About;
