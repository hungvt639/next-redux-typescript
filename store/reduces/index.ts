import { combineReducers } from "redux";
import authReducer from "./authReducer";
import { Action, AppState } from "../appstate";
import { ReducersMapObject } from "redux";
// type r = {
//     user: any;
// };
const map: ReducersMapObject<AppState, Action> = {
    authState: authReducer,
};
const reducer = combineReducers(map);
export default reducer;
