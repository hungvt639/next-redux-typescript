import jwt from "jsonwebtoken";
// import * as env from "../../env";
import connectDB from "../../middlewares/mongodb";
import User from "../../models/user";
import { NextApiResponse } from "next";
import { NextApiRequests } from "../../class/next";
import { UserInterface } from "../../class/interface";
const bcrypt = require("bcrypt");

async function login(req: NextApiRequests, res: NextApiResponse) {
    const { method } = req;
    switch (method) {
        case "POST": {
            try {
                const { username, password }: UserInterface = req.body;
                const user: UserInterface = await User.findOne({
                    username: username,
                });
                if (!user) {
                    res.status(400).json({
                        message: "Sai tên tài khoản hoặc mật khẩu!",
                    });
                    return;
                }

                const match = await bcrypt.compare(password, user.password);
                if (!match) {
                    res.status(400).json({
                        message: "Sai tên tài khoản hoặc mật khẩu!",
                    });
                    return;
                }

                const token = jwt.sign(
                    {
                        _id: user._id,
                        username: user.username,
                        fullname: user.fullname,
                    },
                    process.env.secret as string
                );
                user.password = "";
                res.status(200).json({
                    message: "ok",
                    token: token,
                    user: user,
                });
            } catch (e) {
                res.status(400).json({
                    message: e.message,
                });
            }
            break;
        }
        default:
            res.status(400).json({ message: "Method không được định nghĩa!" });
            break;
    }
    return;
}
export default connectDB(login);
