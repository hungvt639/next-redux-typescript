import { UserInterface } from "../class/interface";
import store from "./stores";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export interface AppState {
    authState: AuthState;
    redirectState: RedirectState;
    showModal: ShowModal;
}

export interface AuthState {
    user: UserInterface | null;
    loading: boolean;
}

export interface RedirectState {
    isRedirect: boolean;
    redirectTo: string;
}

export interface ShowModal {
    show: boolean;
}

export interface Action {
    type: string;
    payload?: any;
}
