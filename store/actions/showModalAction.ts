import { Action } from "../appstate";
import { SET_SHOW_MODAL, SET_NOT_SHOW_MODAL } from "../const";

export const setShowModal = (): Action => {
    return {
        type: SET_SHOW_MODAL,
    };
};
export const setNotShowModal = (): Action => {
    return {
        type: SET_NOT_SHOW_MODAL,
    };
};
