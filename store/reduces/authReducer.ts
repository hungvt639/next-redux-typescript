import * as c from "../const";
// type users = any;
const initialState: AuthState = {
    user: null,
    loading: true,
};

import { Reducer } from "redux";
import { Action, AuthState } from "../appstate";
const authReducer: Reducer<AuthState, Action> = (
    state: AuthState = initialState,
    action: Action
): AuthState => {
    switch (action.type) {
        case c.ADD_USER:
            return {
                ...state,
                user: action.payload,
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
        case c.SET_LOADING_USER:
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
};
export default authReducer;
