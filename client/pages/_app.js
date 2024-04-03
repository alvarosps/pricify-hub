import Head from "next/head";
import "../styles/globals.scss";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Pricify Hub</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
