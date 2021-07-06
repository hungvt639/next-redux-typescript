import React, { createContext, useContext, useEffect } from "react";
import cookies from "next-cookies";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import {
    getUser,
    setLogin,
    setLogOut,
} from "../../store/actions/authReduceAction";
import { RootState } from "../../store/appstate";

const AuthContext: React.Context<{}> = createContext({});

export const AuthProvider = ({ children }: any) => {
    const router = useRouter();
    const user = useSelector((s: RootState) => s.authState.user);
    const dispatch = useDispatch();
    const redirect = useSelector((s: RootState) => s.redirectState);

    useEffect(() => {
        async function loadUserFromCookies() {
            if (!user) {
                const token = cookies({
                    req: { headers: { cookie: "/" } },
                }).token;
                if (token) {
                    dispatch(getUser());
                }
            }
        }
        loadUserFromCookies();
    });

    useEffect(() => {
        function redirects() {
            if (redirect.isRedirect) {
                router.push(redirect.redirectTo);
            }
        }
        redirects();
    }, [redirect]);
    const login = async (data: { username: string; password: string }) => {
        dispatch(setLogin(data));
    };

    const logout = () => {
        document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
        // dispatch(action.deleteUser());
        dispatch(setLogOut());
    };

    return (
        <AuthContext.Provider value={{ login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
export const UseAuth: any = () => useContext(AuthContext);

// export const ProtectRoute = ({ children }: any) => {
//     const loading = useSelector((s: RootState) => s.authState.loading);
//     if (loading) return <LoadingScreen />;
//     return children;
// };
