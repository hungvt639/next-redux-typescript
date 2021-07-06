import { combineReducers } from "redux";
import { Action, AppState } from "../appstate";
import { ReducersMapObject } from "redux";
import authReducer from "./authReducer";
import redirectState from "./redirectStateReduce";
import showModalReduce from "./showModalReduce";
const map: ReducersMapObject<AppState, Action> = {
    authState: authReducer,
    redirectState: redirectState,
    showModal: showModalReduce,
};
const reducer = combineReducers(map);
export default reducer;
