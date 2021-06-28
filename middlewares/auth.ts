import jwt from "jsonwebtoken";
import User from "../models/user";
import { NextApiRequest, NextApiResponse } from "next";
import { NextApiRequests } from "../class/next";
const checkToken =
    (hander: any) => (req: NextApiRequests, res: NextApiResponse) => {
        try {
            const token = req.headers.authorization as string;
            jwt.verify(
                token,
                process.env.secret as string,
                async (err: any, payload: any) => {
                    if (payload) {
                        // const user = await User.findOne({ username: payload.username });
                        // if (user) {
                        //     req.user = user;
                        //     return hander(req, res);
                        // } else {
                        //     res.status(401).json({
                        //         message: "Token không đúng với tài khoản nào",
                        //     });
                        // }
                        req.user = payload;
                        return hander(req, res);
                    } else {
                        res.status(401).json({ message: err.message });
                    }
                }
            );
        } catch (e) {
            res.status(401).json({ message: e.message });
        }
    };

export default checkToken;
