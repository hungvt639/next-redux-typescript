import { all } from "redux-saga/effects";
import userSaga from "./authSaga";

function* mySaga() {
    yield all([userSaga()]);
}

export default mySaga;
