import type { AppProps } from "next/app";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-background h-full sm:min-h-screen">
      <Component {...pageProps} />
    </div>
  );
}
