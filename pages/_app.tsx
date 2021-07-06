import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
// import { useStore } from "../store/store";
import store from "../store/stores";
import "../public/css/index.css";
import "../public/css/header.css";
import "../public/css/modal.css";

import { AuthProvider } from "../components/contexts/auth";
function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <AuthProvider>
                <Component {...pageProps} />
            </AuthProvider>
        </Provider>
    );
}
export default MyApp;
