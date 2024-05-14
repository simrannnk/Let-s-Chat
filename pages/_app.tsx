import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import ProtectedRoute from "../src/common/protectedRoute";
import Layout from "layout/layout";

function MyApp({ Component, pageProps, router }: AppProps) {
  if (process.env.NODE_ENV === "production") {
    console.log = () => {};
    console.error = () => {};
    console.warn = () => {};
    console.info = () => {};
    console.debug = () => {};
    console.assert = () => {};
  }

  return (
    <RecoilRoot>
      <ProtectedRoute router={router}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ProtectedRoute>
    </RecoilRoot>
  );
}

export default MyApp;
