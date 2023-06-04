import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Discord: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) router.push("https://discord.gg/cousins");
  }, [router.isReady]);
  return (
    <>
      <Head>
        <title>Discord - Pit Boost</title>
        <meta http-equiv="refresh" content="0;url=https://discord.gg/cousins" />
      </Head>
      <p>
        Automatically redirecting to the server invite.. If you did not get
        redirected. Please click <a href="https://discord.gg/cousins">here</a>.
      </p>
    </>
  );
};

export default Discord;
