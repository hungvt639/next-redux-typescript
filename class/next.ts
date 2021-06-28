import { NextApiRequest } from "next";
import { UserInterface } from "./interface";
export interface NextApiRequests extends NextApiRequest {
    user?: UserInterface;
}
