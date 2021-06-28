import { UserInterface } from "../class/interface";
import store from "./stores";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export interface AppState {
    authState: AuthState;
}

export interface AuthState {
    user: UserInterface | null;
    loading: boolean;
}
