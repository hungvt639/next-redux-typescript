import { AxiosResponse } from "axios";
import React, { useState, Fragment, useRef } from "react";
import { DataRegister } from "../../class/interface";
import repositories from "../../request/index";
// import { ResRegister } from "../../request/interface";
import { encodePassword } from "../../function/encode";
import Input from "../general/Input";
import Notification from "../general/Notification";
import {
    fValidateEmail,
    fValidatePhone,
    fCheckRePassword,
} from "../../function/validate";

type props = {
    setChange: React.Dispatch<React.SetStateAction<boolean>>;
};
const RegisterForm: React.FC<props> = ({ setChange }: props) => {
    const [firshSubmit, setFirstSubmit] = useState(false);

    const emailRef = useRef<string>("");
    const usernameRef = useRef<string>("");
    const phoneRef = useRef<string>("");
    const passwordRef = useRef<string>("");
    const repasswordRef = useRef<string>("");

    const [valiEmail, setValiEmail] = useState<boolean>(false);
    // const [valiUsername, setValiUsername] = useState<boolean>(false);
    const [valiPhone, setValiPhone] = useState<boolean>(false);
    // const [valiPassword, setValiPassword] = useState<boolean>(false);
    // const [valiRePassword, setValiRePassword] = useState<boolean>(false);
    const [checkPass, setCheckPass] = useState<boolean>(false);

    async function register(data: DataRegister) {
        const API = repositories.user;
        try {
            const res: any = await API.signUp(data);
            // console.log("res", res);

            // if (res.data.message === "ok") {
            Notification("Đăng ký tài khoản thành công");
            //     setChange(true);
            //     console.log(res.data.user);
            // } else {
            //     Notification(res.data.message);
            // }
        } catch (e) {
            Notification("Đã có lỗi sảy ra, bạn vui lòng thử lại sau");
        }
    }

    function onsubmit(e: React.FormEvent) {
        e.preventDefault();
        setFirstSubmit(true);

        let email = emailRef.current;
        let account = usernameRef.current;
        let phoneNumber = phoneRef.current;
        let password = passwordRef.current;
        let repassword = repasswordRef.current;

        let check: boolean = fCheckRePassword(password, repassword);
        let validateEmail = fValidateEmail(email);
        let validatePhone = fValidatePhone(phoneNumber);

        // emailRef.current.required = !email;
        // usernameRef.current.required = !account;
        // phoneRef.current.required = !phoneNumber;
        // passwordRef.current.required = !password;
        // repasswordRef.current.required = !repassword;

        setValiEmail(!validateEmail);
        setValiPhone(!validatePhone);
        setCheckPass(!check);
        // console.log({ email, account, phoneNumber, password });

        if (
            email &&
            validateEmail &&
            account &&
            phoneNumber &&
            validatePhone &&
            password &&
            repassword &&
            check
        ) {
            const registerDate = Date.now();
            const data = {
                email,
                account,
                phoneNumber,
                password,
                registerDate,
            };
            data.password = encodePassword(data.account, data.password);
            register(data);
        }
    }
    return (
        <div className="forms_">
            <h1>Đăng ký</h1>
            <form onSubmit={(e) => onsubmit(e)} className="form_">
                <Input
                    name="email"
                    placeholder="Email (*)"
                    refValue={emailRef}
                    required={true}
                    firstSubmit={firshSubmit}
                />
                {valiEmail ? (
                    <p className="form-mess-err">Nhập sai định dạng email</p>
                ) : (
                    <Fragment />
                )}
                <Input
                    name="username"
                    placeholder="Tài khoản đăng nhập (*)"
                    refValue={usernameRef}
                    required={true}
                    firstSubmit={firshSubmit}
                />
                {/* {valiUsername ? (
                    <p className="form-mess-err">
                        Tài khoản không được để trống!
                    </p>
                ) : (
                    <Fragment />
                )} */}
                <Input
                    name="phoneNumber"
                    placeholder="Số điện thoại (*)"
                    refValue={phoneRef}
                    required={true}
                    type="number"
                    firstSubmit={firshSubmit}
                />
                {valiPhone ? (
                    <p className="form-mess-err">Số điện thoại không hợp lệ</p>
                ) : (
                    <Fragment />
                )}

                <Input
                    type="password"
                    name="password"
                    placeholder="Mật khẩu (*)"
                    autoComplete="on"
                    refValue={passwordRef}
                    required={true}
                    firstSubmit={firshSubmit}
                />
                {/* {valiPassword ? (
                    <p className="form-mess-err">
                        Mật khẩu không được để trống!
                    </p>
                ) : (
                    <Fragment />
                )} */}

                <Input
                    type="password"
                    name="re-password"
                    placeholder="Nhập lại mật khẩu (*)"
                    autoComplete="on"
                    refValue={repasswordRef}
                    required={true}
                    firstSubmit={firshSubmit}
                />
                {/* {valiRePassword ? (
                    <p className="form-mess-err">Vui lòng nhập lại mật khẩu!</p>
                ) : (
                    <Fragment />
                )} */}
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
