import React, { Fragment, useState } from "react";
// import { useRouter } from "next/router";
import Header from "../components/header/header";
import { useSelector } from "react-redux";
import { UseAuth } from "../components/contexts/auth";
import { RootState } from "../store/appstate";
import { paserDateToString } from "../function/convert";
import Modal from "../components/general/modal";
import ChangePasswordForm from "../components/profile/change_password_form";
import EditUserForm from "../components/profile/edit_user_form";
import { UserInterface } from "../class/interface";

const profile: React.FC = () => {
    const { logout } = UseAuth();
    // const loading = useSelector((s: RootState) => s.authState.loading);
    const user = useSelector((s: RootState) => s.authState.user);
    // const router = useRouter();
    const [showEdit, setShowEdit] = useState<boolean>(false);
    const setShowEditClose = () => setShowEdit(false);
    const [showChangePass, setShowChangePass] = useState<boolean>(false);
    const setShowChangePassClose = () => setShowChangePass(false);
    return (
        <div>
            <Header />
            <div>
                <h1>Thông tin cá nhân</h1>
                {!user ? (
                    <p>Không có dữ liệu</p>
                ) : (
                    <div>
                        <p>
                            <strong>Họ-tên:</strong> {user.name}
                        </p>
                        <p>
                            <strong>Email:</strong> {user.email}
                        </p>
                        <p>
                            <strong>Tài khoản:</strong> {user.account}
                        </p>
                        <p>
                            <strong>Địa chỉ:</strong> {user.address}
                        </p>
                        <p>
                            <strong>Số điện thoại:</strong> {user.phoneNumber}
                        </p>
                        <p>
                            <strong>Ngày sinh:</strong>{" "}
                            {user.birth ? paserDateToString(user.birth) : ""}
                        </p>
                        <button onClick={() => setShowChangePass(true)}>
                            Change Password
                        </button>
                        <button onClick={() => setShowEdit(true)}>
                            Edit Profile
                        </button>
                        <button onClick={logout}>Đăng xuất</button>
                    </div>
                )}
            </div>
            <Modal show={showChangePass} setShowFalse={setShowChangePassClose}>
                <ChangePasswordForm />
            </Modal>
            <Modal show={showEdit} setShowFalse={setShowEditClose}>
                {showEdit ? (
                    <EditUserForm value={user ? user : null} />
                ) : (
                    <Fragment />
                )}
            </Modal>
        </div>
    );
};

export default profile;
