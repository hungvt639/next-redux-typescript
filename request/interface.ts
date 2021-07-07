import { AxiosResponse } from "axios";
import { UserInterface, DataRegister, DataLogin } from "../class/interface";

// export interface ResLogin {
//     account: string;
//     address: string;
//     avatar: string;
//     birth: number;
//     childIds: any[];
//     classesMngRole: null;
//     email: string;
//     facebookId: string;
//     gender: number;
//     loginCode: number;
//     name: string;
//     orders: any[];
//     password: string;
//     phoneNumber: string;
//     province: number;
//     registerDate: number;
//     status: number;
//     timeOnline: number;
//     token: string;
//     userActives: any[];
//     userClassManagerType: number;
//     userCourse: any[];
//     userRoles: any[];
//     userType: number;
//     _id: string;
// }
export interface ResGetProfile {
    user: UserInterface;
    message: string;
}

// export interface ResRegister {
//     user: UserInterface;
//     message: string;
// }

export interface UserRepository {
    signUp: (data: DataRegister) => Promise<AxiosResponse<UserInterface>>;
    signIn: (data: DataLogin) => Promise<AxiosResponse<UserInterface>>;
    getProfile: () => Promise<AxiosResponse<UserInterface>>;
    changePassword: (data: string) => Promise<AxiosResponse<any>>;
}
export interface Repositories {
    user: UserRepository;
}
