import { REDIRECT_TO } from "../const";

import { Reducer } from "redux";
import { Action, RedirectState } from "../appstate";

const initialState: RedirectState = {
    isRedirect: false,
    redirectTo: "/",
};
const redirectState: Reducer<RedirectState, Action> = (
    state: RedirectState = initialState,
    action: Action
): RedirectState => {
    switch (action.type) {
        case REDIRECT_TO:
            return {
                ...state,
                redirectTo: action.payload,
                isRedirect: true,
            };

        default:
            return state;
    }
};
export default redirectState;
