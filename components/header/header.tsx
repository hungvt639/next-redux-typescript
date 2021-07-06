import React, { useEffect, useState, useReducer, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/appstate";
import Modal from "../general/modal";
import LoginForm from "./login_form";
import RegisterForm from "./register_form";
import { UseAuth } from "../contexts/auth";
import {
    setShowModal,
    setNotShowModal,
} from "../../store/actions/showModalAction";
// type Logins = {
//     username?: string;
//     password?: string;
// };
// interface Action {
//     type: string;
//     value?: Logins;
// }
// const valuesLogin: any = { username: "", password: "" };

// const reducer = (state: any, action: any) => {
//     switch (action.type) {
//         case "SET_LOGIN_VALUE":
//             return {
//                 username: action.value.username,
//                 password: action.value.password,
//             };
//         case "SET_USERNAME":
//             return { ...state, username: action.value.username };
//         case "SET_PASSWORD":
//             return { ...state, password: action.value.password };
//         case "DELETE":
//             return { username: "", password: "" };
//         default:
//             return state;
//     }
// };

const Header: React.FC = () => {
    // const [show, setShow] = useState<boolean>(false);
    const [change, setChange] = useState<boolean>(true);
    const user = useSelector((s: RootState) => s.authState.user);
    const { logout } = UseAuth();
    const dispatch = useDispatch();
    const show = useSelector((s: RootState) => s.showModal.show);
    const setShowTrue = () => {
        dispatch(setShowModal());
    };
    const setShowFalse = () => {
        dispatch(setNotShowModal());
    };
    // const [stateLogin, dispatchLogin] = useReducer(reducer, valuesLogin);
    // console.log("stateLogin", stateLogin);
    // const callBack = useCallback(() => {
    //     console.log("callback", stateLogin);
    // }, [stateLogin]);
    return (
        <div className="header">
            <div className="d-flex-row max-width margin-auto height-100 ">
                <div className="width-100 flex-center">
                    <p className="header-title"> Đây là header</p>
                </div>
                {user ? (
                    <div className="d-flex-row">
                        <div className="flex-center header-button">
                            <button onClick={logout}>Đăng xuất</button>
                        </div>
                    </div>
                ) : (
                    <div className="d-flex-row">
                        <div className="flex-center header-button">
                            <button
                                onClick={() => {
                                    // setShow(true);
                                    setShowTrue();
                                    setChange(true);
                                }}
                            >
                                Đăng nhập
                            </button>
                        </div>
                        <div className="flex-center header-button">
                            <button
                                onClick={() => {
                                    // setShow(true);
                                    setShowTrue();
                                    setChange(false);
                                }}
                            >
                                Đăng ký
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <Modal show={show} setShowFalse={setShowFalse}>
                {change ? (
                    <LoginForm
                        setChange={setChange}
                        // dispatchLogin={dispatchLogin}
                    />
                ) : (
                    <RegisterForm setChange={setChange} />
                )}
            </Modal>
        </div>
    );
};
// Header.getInitialProps = async (ctx) => {
//     console.log("ctx: ", ctx);
//     return { u: "abc" };
// };
// export async function getServerSideProps(context) {
//     console.log("context", context);
//     return {
//         props: { u: "uuuuu" }, // will be passed to the page component as props
//     };
// }
export default Header;
