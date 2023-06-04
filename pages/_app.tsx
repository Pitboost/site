import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Pit Boost</title>
        <meta property="og:title" content="Pit Boosting" />
        <meta
          property="og:description"
          content="Professional Minecraft Botting Service"
        />
        <meta
          property="og:image"
          content={process.env.NEXT_PUBLIC_URL + "/pants_bundle.png"}
        />
        <meta property="og:link" content="https://pit.boats/" />
        <meta property="theme-color" content="#89610F" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
