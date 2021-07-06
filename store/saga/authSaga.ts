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
import { ResLogin } from "../../request/interface";
import { DataLogin } from "../../request/interface";
import { AxiosResponse } from "axios";
import Notification from "../../components/general/Notification";
import { setRedirect } from "../actions/redirectStateAction";
import { setNotShowModal } from "../actions/showModalAction";

const API = repositories.user;

function* fetchUser() {
    try {
        const user: ResLogin = yield call(API.getProfile);
        yield put(addUser(user.user));
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
    const res: AxiosResponse<ResLogin> = yield call(API.signIn, data);
    yield put(addUser(res.data.user));
    document.cookie = `token=${res.data.token}; path=/`;
    if (res.data.message === "ok") {
        Notification("Đăng nhập thành công");
        yield put(setRedirect("/profile"));
        yield put(setNotShowModal());
    } else Notification(res.data.message);
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
