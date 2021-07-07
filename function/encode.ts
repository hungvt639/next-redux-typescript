import CryptoJS from "crypto-js";

/**
 *
 * @param {string} userName
 * @param {string} password
 * @returns
 */
const secret_key = process.env.secret_key as string;
export const encodePassword = (userName: string, password: string) => {
    return CryptoJS.AES.encrypt(
        `${userName}_${password}`,
        secret_key
    ).toString();
};

export const checkDecodePassword = (ciphertext: string) => {
    try {
        // console.log("c", ciphertext);

        const bytes = CryptoJS.AES.decrypt(ciphertext, secret_key);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        console.log(decryptedData);
    } catch (e) {
        console.log(e);
    }
};
