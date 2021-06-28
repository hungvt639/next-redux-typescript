import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import getFactory from "../../request";
import * as a from "../actions/user";
import * as c from "../const";
import type { UserInterface } from "../../class/interface";
// worker Saga: will be fired on USER_FETCH_REQUESTED actions
const API = getFactory("user");
type res = {
    user: UserInterface;
};
function* fetchUser(action: any) {
    try {
        const user: res = yield call(API.getProfile);
        yield put(a.addUser(user.user));
        yield put(a.setOkLoading());
    } catch (e) {
        yield put(a.deleteUser());
    }
}

function* userSaga() {
    yield takeEvery(c.USER_FETCH_REQUESTED, fetchUser);
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
// function* mySaga() {
//     yield takeLatest(c.USER_FETCH_REQUESTED, fetchUser);
// }

export default userSaga;
