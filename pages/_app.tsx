import type { AppProps } from "next/app";
import "../styles/globals.css";
import "katex/dist/katex.min.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <main className="p-3">
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default MyApp;
