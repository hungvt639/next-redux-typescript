import Client from "../UserClient";
import { UserRepository } from "../interface";
import { DataLogin } from "../../class/interface";
import { DataRegister } from "../../class/interface";
import cookies from "next-cookies";

const token = cookies({ req: { headers: { cookie: "/" } } }).token;

const resource = "api";

const signUp = (data: DataRegister) => {
    return Client(false).post(`${resource}/register`, data);
};

const signIn = (data: DataLogin) => {
    return Client(false).post(`${resource}/login`, data);
};

const changePassword = (data: string) => {
    return Client(true).post(`${resource}/change-pass`, {
        token: token,
        newPass: data,
    });
};

const getProfile = () => {
    return Client(true).post(`${resource}/get-user-from-token`, {
        token: token,
    });
};
// const Logout = () => {
//     return Client(true).get(`${resource}/logout/`);
// }
// const EditProfile = (data) => {
//     return Client(true).put(`${resource}/profile/`, data);
// }

// const ChangeAvatar = (data) => {
//     return Client(true).put(`${resource}/change-avatar/`, data)
// }
const userRepository: UserRepository = {
    signIn: signIn,
    signUp: signUp,
    getProfile: getProfile,
    changePassword: changePassword,
};
export default userRepository;
