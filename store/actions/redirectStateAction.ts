import { Action } from "../appstate";
import { REDIRECT_TO } from "../const";

export const setRedirect = (to: string): Action => {
    return {
        type: REDIRECT_TO,
        payload: to,
    };
};
