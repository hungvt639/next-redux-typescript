import React from "react";
// import { useRouter } from "next/router";
import Header from "../components/header/header";
import { useSelector } from "react-redux";
import { useAuth } from "../components/contexts/auth";
import { RootState } from "../store/appstate";

const profile: React.FC = () => {
    const { logout } = useAuth();
    // const loading = useSelector((s: RootState) => s.authState.loading);
    const user = useSelector((s: RootState) => s.authState.user);
    // const router = useRouter();
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
                            <strong>Họ-tên:</strong> {user.fullname}
                        </p>
                    </div>
                )}

                <button onClick={logout}>Đăng xuất</button>
            </div>
        </div>
    );
};

export default profile;
