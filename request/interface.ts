import { AxiosResponse } from "axios";
import { UserInterface } from "../class/interface";

export interface DataLogin {
    username: string;
    password: string;
}
export interface ResLogin {
    user: UserInterface;
    token: string;
    message: string;
}
export interface UserRepository {
    signUp: (data: any) => Promise<AxiosResponse<any>>;
    signIn: (data: DataLogin) => Promise<AxiosResponse<ResLogin>>;
    getProfile: () => Promise<AxiosResponse<any>>;
}
export interface Repositories {
    user: UserRepository;
}
