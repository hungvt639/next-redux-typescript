import userSaga from "./user";

function* mySaga() {
    yield userSaga();
}

export default mySaga;
