import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createClient, Provider } from "urql";

const client = createClient({ url: "http:localhost:4000/graphql" });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
