import "@/styles/global.scss";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ErrorProvider } from "@/hooks/useError";
import store from "@/store/store";
import { Provider } from "react-redux";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <SessionProvider session={pageProps.session}>
        <ErrorProvider>
          <Component {...pageProps} />
        </ErrorProvider>
      </SessionProvider>
    </Provider>
  );
};

export default App;
