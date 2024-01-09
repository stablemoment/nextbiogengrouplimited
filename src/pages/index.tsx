import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Layout from '@/components/layout'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {  

  return (
    <>
      <Layout>
        <Head>
          <title>Next Server</title>
          <link rel="canonical" href="https://next.biogengroupltd.com" />
        </Head>
        <main className={`${styles.main} ${inter.className}`}>
          <h1>This Is A Next Server</h1>
        </main>
      </Layout>
    </>
  )
}
