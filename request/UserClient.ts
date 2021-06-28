import getInstanceAxios from "./request";
// import * as env from "../env";
// const baseDomain = process.env.REACT_APP_DOMAIN
const baseDomain = process.env.base_url as string;
const baseURL = `${baseDomain}/`;

export default function instanceAxios(isToken: boolean) {
    return getInstanceAxios(baseURL, isToken);
}
