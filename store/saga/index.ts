import { all } from "redux-saga/effects";
import userSaga from "./user";

function* mySaga() {
    yield all([userSaga()]);
}

export default mySaga;
