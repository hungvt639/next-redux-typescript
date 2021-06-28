import Head from "next/head";
import Link from "next/link";
import { RootStateOrAny, useSelector } from "react-redux";
import { useAuth } from "../components/contexts/auth";
export default function Home() {
    const { loading } = useAuth();

    const user = useSelector((s: RootStateOrAny) => s.authState.user);
    console.log(user);

    return (
        <div>
            <Head>
                <title>Hello</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {/* <Header /> */}
            {!loading && user ? (
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
                    {/* <button onClick={logOut}>Đăng xuất</button> */}
                </div>
            ) : (
                <div>Loading...!</div>
            )}
        </div>
    );
}
