import Head from 'next/head'
import HomePage from '@/components/pages/Home'

export default function Home() {
  return (
    <>
      <Head>
        <title>Legion Adaption Rate</title>
        <meta name="description" content="Legion Adaption Rate" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <HomePage />
      </main>
    </>
  )
}
