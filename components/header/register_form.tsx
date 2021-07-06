import React, { useState, Fragment, useRef } from "react";
import Input from "../general/Input";
type props = {
    setChange: React.Dispatch<React.SetStateAction<boolean>>;
};
const RegisterForm: React.FC<props> = ({ setChange }: props) => {
    const fullnameRef = useRef<string>("");
    const usernameRef = useRef<string>("");
    const passwordRef = useRef<string>("");
    const repasswordRef = useRef<string>("");

    // const [fullname, setFullname] = useState<string>("");
    // const [username, setUsername] = useState<string>("");
    // const [password, setPassword] = useState<string>("");
    // const [repassword, setRePassword] = useState<string>("");
    const [valiUsername, setValiUsername] = useState<boolean>(false);
    const [valiPassword, setValiPassword] = useState<boolean>(false);
    const [valiRePassword, setValiRePassword] = useState<boolean>(false);
    const [checkPass, setCheckPass] = useState<boolean>(false);
    function onsubmit(e: React.FormEvent) {
        e.preventDefault();

        let fullname = fullnameRef.current;
        let username = usernameRef.current;
        let password = passwordRef.current;
        let repassword = repasswordRef.current;
        let check: boolean = !(password === repassword);
        setValiUsername(!username);
        setValiPassword(!password);
        setValiRePassword(!repassword);
        setCheckPass(check);
        if (username && password && repassword && !check) {
            const data = { fullname, username, password };
            console.log(data);
        }
    }
    return (
        <div className="forms_">
            <h1>Đăng ký</h1>
            <form onSubmit={(e) => onsubmit(e)} className="form_">
                <Input
                    name="fullname"
                    placeholder="Họ tên"
                    refValue={fullnameRef}
                />

                <Input
                    name="username"
                    placeholder="Tài khoản đăng nhập (*)"
                    refValue={usernameRef}
                />
                {valiUsername ? (
                    <p className="form-mess-err">
                        Tài khoản không được để trống!
                    </p>
                ) : (
                    <Fragment />
                )}

                <Input
                    type="password"
                    name="password"
                    placeholder="Mật khẩu (*)"
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

                <Input
                    type="password"
                    name="re-password"
                    placeholder="Nhập lại mật khẩu (*)"
                    autoComplete="on"
                    refValue={repasswordRef}
                />
                {valiRePassword ? (
                    <p className="form-mess-err">Vui lòng nhập lại mật khẩu!</p>
                ) : (
                    <Fragment />
                )}
                {checkPass ? (
                    <p className="form-mess-err">
                        Nhập lại mật khẩu không chính xác!
                    </p>
                ) : (
                    <Fragment />
                )}
                <button type="submit">Đăng ký</button>
                <p className="form-has-user">
                    Đã có tài khoản{" "}
                    <span
                        onClick={() => {
                            setChange(true);
                        }}
                    >
                        Đăng nhập ngay
                    </span>
                </p>
            </form>
        </div>
    );
};
export default RegisterForm;
