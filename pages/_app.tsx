import "@/styles/fonts.scss";
import "@/styles/global.scss";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ErrorProvider } from "@/hooks/useError";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ErrorProvider>
        <Component {...pageProps} />
      </ErrorProvider>
    </SessionProvider>
  );
}
