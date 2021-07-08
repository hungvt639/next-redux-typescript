export interface UserInterface {
    username?: string;
    createdAt?: string;
    updatedAt?: string;
    account: string;
    address?: string;
    avatar?: string;
    birth?: number;
    childIds?: any[];
    classesMngRole?: null;
    email?: string;
    facebookId?: string;
    gender?: number;
    loginCode?: number;
    name?: string;
    orders?: any[];
    password?: string;
    phoneNumber?: string;
    province?: number;
    registerDate?: number;
    status?: number;
    timeOnline?: number;
    token?: string;
    userActives?: any[];
    userClassManagerType?: number;
    userCourse?: any[];
    userRoles?: any[];
    userType?: number;
    _id?: string;
}

export interface DataRegister {
    account?: string;
    email?: string;
    password?: string;
    phoneNumber?: string;
    registerDate?: number;
}
export interface DataLogin {
    username: string;
    password: string;
}
export interface ValueImageFile {
    image: File | null;
    img: string | ArrayBuffer | null;
}
