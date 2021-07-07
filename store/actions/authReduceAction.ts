import { UserInterface, DataLogin } from "../../class/interface";
import { Action } from "../appstate";
import * as c from "../const";

export const addUser = (user: UserInterface): Action => {
    return {
        type: c.ADD_USER,
        payload: user,
    };
};
export const deleteUser = (): Action => {
    return {
        type: c.DELETE_USER,
    };
};

export const getUser = (): Action => {
    return {
        type: c.USER_FETCH_REQUESTED,
    };
};

export const setUserLoading = (): Action => {
    return {
        type: c.SET_LOADING_USER,
    };
};

export const setOkLoading = (): Action => {
    return {
        type: c.LOADING_USER_OK,
    };
};

export const setLogOut = (): Action => {
    return {
        type: c.SET_LOGOUT,
    };
};

export const setLogin = (data: DataLogin): Action => {
    return {
        type: c.SET_LOGIN,
        payload: data,
    };
};
