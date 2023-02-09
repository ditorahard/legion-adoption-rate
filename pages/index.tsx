import Head from "next/head";
import HomePage from "@/components/pages/Home";
import { useIsLoggedIn } from "@/auth";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const isLoggedIn = useIsLoggedIn();
  const { replace } = useRouter();
  useEffect(() => {
    if (isLoggedIn === false) {
      replace("/login");
    }
  }, [isLoggedIn]);
  return isLoggedIn && (
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
  );
}
