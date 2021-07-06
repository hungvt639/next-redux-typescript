import Head from "next/head";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/appstate";
import Header from "../components/header/header";
const Home: React.FC = () => {
    const user = useSelector((s: RootState) => s.authState.user);

    return (
        <div>
            <Head>
                <title>Hello</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
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
                <Link href="/profile">Profile</Link>
            </div>
        </div>
    );
};
export default Home;
