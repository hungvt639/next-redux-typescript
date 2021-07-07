import React, { useState, Fragment, useRef } from "react";
import Link from "next/link";
import Input from "../general/Input";
import { UseAuth } from "../contexts/auth";
import { encodePassword } from "../../function/encode";

type props = {
    setChange: React.Dispatch<React.SetStateAction<boolean>>;
    // dispatchLogin: React.Dispatch<any>;
};

const LoginForm: React.FC<props> = ({ setChange }: props) => {
    const { login } = UseAuth();
    const usernameRef = useRef<string>("");
    const passwordRef = useRef<string>("");
    const [valiUsername, setValiUsername] = useState<boolean>(false);
    const [valiPassword, setValiPassword] = useState<boolean>(false);
    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        let username = usernameRef.current;
        let password = passwordRef.current;
        setValiUsername(!username);
        setValiPassword(!password);
        if (username && password) {
            const data = { account: username, password: password };
            data.password = encodePassword(data.account, data.password);
            login(data);
        }
    }

    return (
        <div className="forms_">
            <h1>Đăng nhập</h1>
            <form onSubmit={(e) => onSubmit(e)} className="form_">
                <label>
                    Tài khoản đăng nhập (*)
                    <br />
                    <Input
                        refValue={usernameRef}
                        type="text"
                        name="username"
                        placeholder="Tài khoản đăng nhập"
                    />
                    {valiUsername ? (
                        <p className="form-mess-err">
                            Tài khoản không được để trống!
                        </p>
                    ) : (
                        <Fragment />
                    )}
                </label>

                <label>
                    Mật khẩu (*)
                    <br />
                    <Input
                        type="password"
                        name="password"
                        placeholder="Mật khẩu"
                        autoComplete="on"
                        refValue={passwordRef}
                    />
                    {valiPassword ? (
                        <p className="form-mess-err">
                            Mật khẩu không được để trống!
                        </p>
                    ) : (
                        <Fragment />
                    )}
                </label>
                <div className="forgot-password">
                    <Link href="#">Quên mật khẩu</Link>
                </div>
                <button type="submit">Đăng nhập</button>
                <p className="form-has-user">
                    Không có tài khoản{" "}
                    <span
                        onClick={() => {
                            setChange(false);
                        }}
                    >
                        Đăng ký ngay
                    </span>
                </p>
            </form>
        </div>
    );
};
export default LoginForm;
