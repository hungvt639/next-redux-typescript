import {
    all,
    call,
    put,
    takeEvery,
    takeLatest,
    take,
    delay,
    fork,
} from "redux-saga/effects";
import repositories from "../../request";
import { addUser, setOkLoading, deleteUser } from "../actions/authReduceAction";
import { SET_LOGIN, USER_FETCH_REQUESTED, SET_LOGOUT } from "../const";
import { ResGetProfile } from "../../request/interface";
import { AxiosResponse } from "axios";
import Notification from "../../components/general/Notification";
import { setRedirect } from "../actions/redirectStateAction";
import { setNotShowModal } from "../actions/showModalAction";
import { UserInterface, DataLogin } from "../../class/interface";

const API = repositories.user;

function* fetchUser() {
    try {
        const user: AxiosResponse<UserInterface> = yield call(API.getProfile);
        yield put(addUser(user.data));
        yield put(setOkLoading());
    } catch (e) {
        yield put(deleteUser());
    }
}

function* logOut() {
    // yield put(a.setUserLoading());
    // yield (window.location.pathname = "/login");
    // yield delay(1000);
    yield put(deleteUser());
    // yield put(a.setOkLoading());
}

function* login(data: DataLogin) {
    const res: AxiosResponse<UserInterface> = yield call(API.signIn, data);
    // yield put(addUser(res.data.user));
    // document.cookie = `token=${res.data.token}; path=/`;
    switch (res.data.loginCode) {
        case -1:
            Notification("LOGIN FAILED ");
            break;
        case 0:
            yield put(addUser(res.data));
            document.cookie = `token=${res.data.token}; path=/`;
            Notification("LOGIN SUCCESS ");
            yield put(setRedirect("/profile"));
            yield put(setNotShowModal());
            break;
        case 1:
            Notification("LOGIN ACCOUNT IS USED");
            break;
        case 2:
            Notification("LOGIN ACCOUNT NOT EXIST");
            break;
        case 3:
            Notification("LOGIN WRONG PASSWORD");
            break;
        case 4:
            Notification("LOGIN WRONG PROVIDER");
            break;
        case 4:
            Notification("LOGIN ACCOUNT NOT ACTIVATED");
            break;
        case 6:
            Notification("LOGIN MOBILE IS USED");
            break;
        case 7:
            Notification("LOGIN USER NOT GRANTED PERMISSION");
            break;
        case 8:
            Notification("LOGIN TOKEN INVALID");
            break;
        default:
            Notification("Đã có lỗi sảy ra, bạn vui lòng thử lại");
    }
}

function* waitLogin() {
    while (true) {
        try {
            const { payload } = yield take(SET_LOGIN);
            yield call(login, payload);
        } catch (err123) {
            Notification("Đã có lỗi sảy ra, bạn vui lòng thử lại sau");
        }
    }
}

function* userSaga() {
    yield all([
        takeEvery(USER_FETCH_REQUESTED, fetchUser),
        takeLatest(SET_LOGOUT, logOut),
        fork(waitLogin),
    ]);
}

export default userSaga;
