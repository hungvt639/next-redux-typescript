import React, {
    createContext,
    ReactElement,
    useContext,
    useEffect,
} from "react";
import cookies from "next-cookies";
import { useRouter } from "next/router";

import getFactory from "../../request";
import LoadingScreen from "./LoadingScreen";
import { useSelector, useDispatch } from "react-redux";
import * as action from "../../store/actions/authReduceAction";
// import { UserInterface } from "../../class/interface";
import { RootState } from "../../store/appstate";
// interface UserAuth {
//     isAuthenticated: boolean;
//     user: UserInterface;
//     login: any;
//     loading: boolean;
//     logout: any;
// }
const AuthContext: React.Context<{}> = createContext({});

export const AuthProvider = ({ children }: any) => {
    const router = useRouter();
    // const [user, setUser] = useState(null);
    const user = useSelector((s: RootState) => s.authState.user);
    // const [loading, setLoading] = useState(true);
    const loading = useSelector((s: RootState) => s.authState.loading);
    const dispatch = useDispatch();
    useEffect(() => {
        async function loadUserFromCookies() {
            if (!user) {
                const token = cookies({
                    req: { headers: { cookie: "/" } },
                }).token;
                if (token) {
                    if (
                        window.location.pathname !== "/login" &&
                        window.location.pathname !== "/register"
                    ) {
                        dispatch(action.getUser());
                    } else {
                        dispatch(action.setOkLoading());
                    }
                } else if (
                    window.location.pathname !== "/login" &&
                    window.location.pathname !== "/register"
                ) {
                    // window.location.pathname = "/login";
                    router.push("/login");
                    dispatch(action.setOkLoading());
                } else {
                    dispatch(action.setOkLoading());
                }
            }
        }
        loadUserFromCookies();
    }, []);

    const login = async (username: string, password: string) => {
        try {
            const API = getFactory("user");
            const res = await API.signIn({
                username: username,
                password: password,
            });
            // setUser(res.user);
            dispatch(action.addUser(res.user));
            document.cookie = `token=${res.token}; path=/`;
            router.push("/");
        } catch (e) {
            console.log(e);
        }
    };

    const logout = () => {
        router.push("/login");
        document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
        // setUser(null);
        dispatch(action.setLogOut());
        // dispatch(action.deleteUser());
    };

    return (
        <AuthContext.Provider value={{ login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth: any = () => useContext(AuthContext);

export const ProtectRoute = ({ children }: any) => {
    const loading = useSelector((s: RootState) => s.authState.loading);
    // const ss = useSelector((s: RootState) => s.authState);
    // console.log("___", ss);
    // let initApp = true;
    // useEffect(() => {
    //     if (!ss.user) {
    //     }
    // }, [ss.loading, ss.user]);
    if (loading) return <LoadingScreen />;
    return children;
};
