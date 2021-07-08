import jwt, { VerifyOptions } from "jsonwebtoken";
import User from "../models/user";
import { NextApiRequest, NextApiResponse } from "next";
import { NextApiRequests } from "../class/next";
import { UserInterface } from "../class/interface";
const checkToken =
    (hander: any) => (req: NextApiRequests, res: NextApiResponse) => {
        try {
            const token = req.headers.authorization as string;
            const payload: UserInterface = jwt.verify(
                token,
                process.env.secret as string
            ) as UserInterface;
            req.user = payload;
            return hander(req, res);
            // jwt.verify(
            //     token,
            //     process.env.secret as string,
            //     (err: any, payload: UserInterface | undefined) => {
            //         if (payload) {
            //             req.user = payload;
            //             return hander(req, res);
            //         } else {
            //             res.status(401).json({ message: err.message });
            //         }
            //     }
            // );
        } catch (e) {
            console.log(e);

            res.status(401).json({ message: e.message });
        }
    };

export default checkToken;
