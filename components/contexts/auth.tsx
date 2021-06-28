import React, { createContext, useState, useContext, useEffect } from "react";
import cookies from "next-cookies";
import getFactory from "../../request";
import LoadingScreen from "./LoadingScreen";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import * as action from "../../store/actions/user";
import { UserInterface } from "../../class/interface";
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
    // const [user, setUser] = useState(null);
    const user = useSelector((s: RootState) => s.authState.user);
    // const [loading, setLoading] = useState(true);
    const loading = useSelector((s: RootState) => s.authState.loading);
    const dispatch = useDispatch();
    useEffect(() => {
        async function loadUserFromCookies() {
            const token = cookies({ req: { headers: { cookie: "/" } } }).token;
            if (token) {
                if (
                    window.location.pathname !== "/login" &&
                    window.location.pathname !== "/register"
                ) {
                    dispatch(action.getUser());
                }
            } else if (
                window.location.pathname !== "/login" &&
                window.location.pathname !== "/register"
            ) {
                window.location.pathname = "/login";
            }
        }
        loadUserFromCookies();
    }, []);

    const login = async (username: string, password: string) => {
        try {
            console.log("login");
            const API = getFactory("user");
            const res = await API.signIn({
                username: username,
                password: password,
            });
            // setUser(res.user);
            dispatch(action.addUser(res.user));
            document.cookie = `token=${res.token}; path=/`;
            window.location.pathname = "/";
        } catch (e) {
            console.log(e);
        }
    };

    const logout = () => {
        document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
        // setUser(null);
        dispatch(action.deleteUser());
        window.location.pathname = "/login";
    };

    return (
        <AuthContext.Provider
            value={{ isAuthenticated: !!user, user, login, loading, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth: any = () => useContext(AuthContext);

export const ProtectRoute = ({ children }: any) => {
    const { isLoading } = useAuth();
    if (isLoading) return <LoadingScreen />;
    return children;
};
