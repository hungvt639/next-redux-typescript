import connectDB from "../../middlewares/mongodb";
// let UserModel = require("../../models/user");
import User from "../../models/user";
import { NextApiRequests } from "../../class/next";
import { NextApiResponse } from "next";
import { UserInterface } from "../../class/interface";
const bcrypt = require("bcrypt");

async function register(req: NextApiRequests, res: NextApiResponse) {
    const { method } = req;
    switch (method) {
        case "POST": {
            try {
                const value = req.body;
                const salt = bcrypt.genSaltSync(10);
                value.password = bcrypt.hashSync(value.password, salt);
                const user: UserInterface = await User.create(value);
                res.status(200).json({ data: { user: user, message: "ok" } });
            } catch (e) {
                res.status(200).json({ data: { message: "error" } });
            }
            break;
        }
        default:
            res.status(200).json({ data: { message: "error" } });
            break;
    }
    return;
}
export default connectDB(register);
