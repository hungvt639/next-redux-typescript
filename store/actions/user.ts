import * as c from "../const";
export const addUser = (user: any) => {
    return {
        type: c.ADD_USER,
        user: user,
    };
};
export const deleteUser = () => {
    return {
        type: c.DELETE_USER,
    };
};

export const getUser = () => {
    return {
        type: c.USER_FETCH_REQUESTED,
    };
};

export const setOkLoading = () => {
    return {
        type: c.LOADING_USER_OK,
    };
};
