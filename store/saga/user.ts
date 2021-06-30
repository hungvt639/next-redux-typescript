import {
    all,
    call,
    put,
    takeEvery,
    takeLatest,
    take,
    delay,
} from "redux-saga/effects";
import getFactory from "../../request";
import * as a from "../actions/authReduceAction";
import * as c from "../const";
import type { UserInterface } from "../../class/interface";
// import { Action } from "../appstate";
const API = getFactory("user");
type res = {
    user: UserInterface;
};
function* fetchUser() {
    try {
        const user: res = yield call(API.getProfile);
        yield put(a.addUser(user.user));
        yield put(a.setOkLoading());
    } catch (e) {
        yield put(a.deleteUser());
    }
}

function* logOut() {
    // yield put(a.setUserLoading());
    // yield (window.location.pathname = "/login");
    // yield delay(1000);
    yield put(a.deleteUser());
    // yield put(a.setOkLoading());
}

function* userSaga() {
    yield all([
        takeEvery(c.USER_FETCH_REQUESTED, fetchUser),
        takeLatest(c.SET_LOGOUT, logOut),
    ]);
}

export default userSaga;
