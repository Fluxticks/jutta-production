import PageLayout from "../components/layout/Layout";
import { Analytics } from "@vercel/analytics/react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
      <Analytics />
    </>
  );
}

export default MyApp;
