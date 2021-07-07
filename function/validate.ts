export function fValidateEmail(email: string) {
    if (!email) return true;
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
export function fValidatePhone(phone: string) {
    if (!phone) return true;
    const re = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    return re.test(phone);
}

export function fCheckRePassword(password: string, repassword: string) {
    if (!password || !repassword) return true;
    return password === repassword;
}
