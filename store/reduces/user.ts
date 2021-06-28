import * as c from "../const";
// type users = any;
const initialState: AuthState = {
    user: null,
    loading: true,
};

import { Reducer } from "redux";
import { AuthState } from "../appstate";
const authReducer: Reducer<AuthState, any> = (
    state: AuthState = initialState,
    action: any
): AuthState => {
    switch (action.type) {
        case c.ADD_USER:
            return {
                ...state,
                user: action.user,
            };
        case c.DELETE_USER:
            return {
                ...state,
                user: null,
            };
        case c.LOADING_USER_OK:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};
export default authReducer;
