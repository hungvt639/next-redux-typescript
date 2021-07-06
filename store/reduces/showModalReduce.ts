import { SET_SHOW_MODAL, SET_NOT_SHOW_MODAL } from "../const";

import { Reducer } from "redux";
import { Action, ShowModal } from "../appstate";

const initialState: ShowModal = {
    show: false,
};
const showModalReduce: Reducer<ShowModal, Action> = (
    state: ShowModal = initialState,
    action: Action
): ShowModal => {
    switch (action.type) {
        case SET_SHOW_MODAL:
            return {
                ...state,
                show: true,
            };
        case SET_NOT_SHOW_MODAL:
            return {
                ...state,
                show: false,
            };
        default:
            return state;
    }
};
export default showModalReduce;
