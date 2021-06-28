import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
// import { useStore } from "../store/store";
import store from "../store/stores";
import "../public/css/index.css";
import { AuthProvider, ProtectRoute } from "../components/contexts/auth";
function MyApp({ Component, pageProps }: AppProps) {
    // const store: any = useStore(pageProps.initialReduxState);

    return (
        <Provider store={store}>
            <AuthProvider>
                <ProtectRoute>
                    <Component {...pageProps} />
                </ProtectRoute>
            </AuthProvider>
        </Provider>
    );
}
export default MyApp;
