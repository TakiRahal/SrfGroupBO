import '../styles/globals.css'
import '../styles/SignIn.scss';

import type { AppProps } from 'next/app'
import {store} from "../src/store/store";
import {Provider} from "react-redux";

import "primereact/resources/themes/md-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.min.css";
import setupAxiosInterceptors from "../lib/axios-interceptor";

setupAxiosInterceptors(() => console.log);

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    )
}

export default MyApp
