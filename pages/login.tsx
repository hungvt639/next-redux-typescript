import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "../components/contexts/auth";
const Login = () => {
    const { login } = useAuth();
    const router = useRouter();
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    async function submit(e: React.SyntheticEvent) {
        e.preventDefault();
        if (username && password) {
            login(username, password);
        }
    }
    return (
        <div className="forms">
            <form
                className="form"
                onSubmit={(e: React.SyntheticEvent) => submit(e)}
            >
                <input
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Tài khoản"
                />
                <input
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mật khẩu"
                    type="password"
                />
                <button type="submit">Đăng nhập</button>
                <p>
                    Bạn chưa có tài khoản? Đăng ký tại{" "}
                    <Link href="/register">đây</Link>
                </p>
            </form>
        </div>
    );
};
export default Login;
