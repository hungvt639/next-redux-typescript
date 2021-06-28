import { combineReducers } from "redux";
import authReducer from "./user";
import { AppState } from "../appstate";
import { Reducer, ReducersMapObject } from "redux";
// type r = {
//     user: any;
// };
const map: ReducersMapObject<AppState, any> = {
    authState: authReducer,
};
const reducer = combineReducers(map);
export default reducer;
