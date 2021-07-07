import React, { useRef, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { encodePassword, checkDecodePassword } from "../../function/encode";
import repositories from "../../request";
import { RootState } from "../../store/appstate";
import Input from "../general/Input";
const ChangePasswordForm = () => {
    const API = repositories.user;
    const user = useSelector((s: RootState) => s.authState.user);
    const oldPasswordRef = useRef<string>("");
    const passwordRef = useRef<string>("");
    const rePasswordref = useRef<string>("");

    const [firstSubmit, setFirstSubmit] = useState<boolean>(false);
    // const [hasOldPass, setHasOldPass] = useState<boolean>(false);
    // const [hasPass, setHasPass] = useState<boolean>(false);
    // const [hasRePass, setHasRePass] = useState<boolean>(false);
    const [checkRePass, setCheckRePass] = useState<boolean>(false);
    async function change_pass(newPass: string) {
        try {
            const res = await API.changePassword(newPass);
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    }
    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setFirstSubmit(true);
        let oldPassword = oldPasswordRef.current;
        let password = passwordRef.current;
        let rePassword = rePasswordref.current;
        let checkRePass = password === rePassword;
        // setHasOldPass(!oldPassword);
        // setHasPass(!password);
        // setHasRePass(!rePassword);
        setCheckRePass(!checkRePass);

        if (
            oldPassword &&
            password &&
            rePassword &&
            checkRePass &&
            user?.account
        ) {
            const data = { oldPassword, newPass: password };
            data.newPass = encodePassword(user.account, data.newPass);
            checkDecodePassword(data.newPass);
            change_pass(data.newPass);
        }
    }
    return (
        <div className="forms_">
            <h1>Đổi mật khẩu</h1>
            <form onSubmit={(e) => onSubmit(e)} className="form_">
                <label>
                    Mật khẩu cũ (*)
                    <br />
                    <Input
                        refValue={oldPasswordRef}
                        type="password"
                        name="old-password"
                        autoComplete="on"
                        placeholder="Mật khẩu cũ (*)"
                        required={true}
                        firstSubmit={firstSubmit}
                    />
                    {/* {hasOldPass ? (
                        <p className="form-mess-err">
                            Không được để trống trường này!
                        </p>
                    ) : (
                        <Fragment />
                    )} */}
                </label>

                <label>
                    Mật khẩu (*)
                    <br />
                    <Input
                        type="password"
                        name="password"
                        placeholder="Mật khẩu (*)"
                        autoComplete="on"
                        refValue={passwordRef}
                        required={true}
                        firstSubmit={firstSubmit}
                    />
                    {/* {hasPass ? (
                        <p className="form-mess-err">
                            Không được để trống trường này!
                        </p>
                    ) : (
                        <Fragment />
                    )} */}
                </label>
                <label>
                    Nhập lại mật khẩu (*)
                    <br />
                    <Input
                        type="password"
                        name="re-password"
                        placeholder="Nhập lại mật khẩu (*)"
                        autoComplete="on"
                        refValue={rePasswordref}
                        required={true}
                        firstSubmit={firstSubmit}
                    />
                    {/* {hasRePass ? (
                        <p className="form-mess-err">
                            Không được để trống trường này!
                        </p>
                    ) : (
                        <Fragment />
                    )} */}
                    {checkRePass ? (
                        <p className="form-mess-err">
                            Nhập lại mật khẩu không đúng!
                        </p>
                    ) : (
                        <Fragment />
                    )}
                </label>
                <button type="submit">Đổi mật khẩu</button>
            </form>
        </div>
    );
};
export default ChangePasswordForm;
