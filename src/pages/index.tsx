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
        </Head>
        <main className={`${styles.main} ${inter.className}`}>
          <h1>This Is A Next Server</h1>
        </main>
      </Layout>
    </>
  )
}
